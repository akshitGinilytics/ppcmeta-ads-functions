import {convertTZ, createCustomerInstance} from "./helper.js"
import {Constraint, Customer, ReportOptions} from "google-ads-api";
import {User} from "@aminsol/ppcmeta-models"
import {CampaignDataModel} from "@GeneralTypes";
import {Timestamp} from "firebase-admin/firestore";


async function getCampaignList(customerInstance: Customer, campaignIds: string[]) {
  const constraints: Constraint[] = [
    {
      key: "campaign.status",
      op: "IN",
      val: ['ENABLED', 'PAUSED']
    }]
  if (campaignIds.length) {
    constraints.push({
      key: "campaign.id",
      op: "IN",
      val: campaignIds
    })
  }

  const options: ReportOptions = {
    entity: "campaign",
    attributes: [
      "campaign.id",
      "campaign.name",
      "campaign.resource_name",
      "campaign.bidding_strategy_type",
      "campaign_budget.id",
      "campaign_budget.amount_micros",
      "campaign.status",
      "campaign_budget.amount_micros",
      "campaign_budget.resource_name"
    ],
    metrics: [
      "metrics.cost_micros",
      "metrics.clicks",
      "metrics.impressions",
      "metrics.all_conversions",
      "metrics.average_cpc",
    ],
    constraints: constraints,
    date_constant: "THIS_MONTH"
  }

  return await customerInstance.report(options)
}

async function getCampaignsCostAverage(customerInstance: Customer, customerTimezone: string, campaignIds: string[], xDays = 3) {
  const constraints: Constraint[] = [
    {
      key: "campaign.status",
      op: "IN",
      val: ['ENABLED', 'PAUSED']
    }
  ]
  const threeDaysAgo = convertTZ(new Date(Date.now() - (3 * 24 * 3600 * 1000)), customerTimezone)
  constraints.push({
    key: "segments.date",
    op: ">",
    val: threeDaysAgo.toISOString().split('T')[0]
  })
  constraints.push({
    key: "segments.date",
    op: "<=",
    val: new Date().toISOString().split('T')[0]
  })
  if (campaignIds.length) {
    constraints.push({
      key: "campaign.id",
      op: "IN",
      val: campaignIds
    })
  }

  const options: ReportOptions = {
    entity: "campaign",
    attributes: [
      "campaign.id",
    ],
    metrics: [
      "metrics.cost_micros",
    ],
    constraints: constraints,
  }
  const response = await customerInstance.report(options)
  const result: Record<string, number> = {}
  for (const campaign of response) {
    const campaignId = campaign.campaign?.id ?? ""
    const cost = campaign.metrics?.cost_micros ?? 0
    result[campaignId] = cost / xDays
  }
  return result
}

function convertStatusEnumToText(status: string | number): CampaignDataModel["status"] {
  const statusValue = typeof status === "string" ? parseInt(status) : status
  // order of enum is important
  const enumToText = [
    "UNSPECIFIED",
    "UNKNOWN",
    "ENABLED",
    "PAUSED",
    "REMOVED"
  ]
  return <never>enumToText[statusValue] ?? "UNSPECIFIED"
}

export default async function (user: User, customerId: string, customerTimezone: string, campaignIds: string[] = []): Promise<CampaignDataModel[]> {
  await user.getUser()
  const customer = await user.getCustomerById(customerId)
  if (!customer) {
    throw new Error("Customer not found")
  }
  if (!user.refreshToken) {
    throw new Error('User does not have refreshToken')
  }

  const customerInstance = createCustomerInstance(customer.customerId, user.refreshToken, customer.loginCustomerId)
  const campaigns = await getCampaignList(customerInstance, campaignIds)
  const averageCosts = await getCampaignsCostAverage(customerInstance, customerTimezone, campaignIds)
  const result: CampaignDataModel[] = []
  for (let i = 0; i < campaigns.length; i++) {
    const {campaign, metrics, campaign_budget} = campaigns[i]
    if (!campaign || !metrics || !campaign_budget) {
      console.warn("Skipped a campaign because campaign, campaign_budget or metrics were not available.")
      continue
    }
    result.push({
      campaignBudget: {
        resourceName: campaign_budget.resource_name ?? '',
        budgetId: String(campaign_budget.id),
        amount_micros: divideBy1M(campaign_budget.amount_micros),
      },
      campaignId: String(campaign.id),
      customerId: customerId,
      firstImportedAt: Timestamp.now(),
      lastUpdated: Timestamp.now(),
      metrics: {
        allConversions: metrics.all_conversions ?? 0,
        averageCPC: divideBy1M(metrics.average_cpc),
        clicks: metrics.clicks ?? 0,
        costMicros: divideBy1M(metrics.cost_micros),
        impressions: metrics.impressions ?? 0,
        xDaysAverageCost: campaign.id ? divideBy1M(averageCosts[campaign.id]) : 0,
      },
      name: campaign.name ?? '',
      ownerId: user.userId,
      resourceName: campaign.resource_name ?? '',
      status: convertStatusEnumToText(campaign.status ?? 0),
      teamId: "",
    })
  }
  return result
}


function divideBy1M(value: number | null | undefined) {
  const result = (value ?? 0) / 1000000
  return Math.round(result * 100) / 100
}