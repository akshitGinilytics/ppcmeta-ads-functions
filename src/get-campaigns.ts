import { convertTZ, createCustomerInstance } from "./helper.js";
import { Constraint, Customer, ReportOptions } from "google-ads-api";
import { User } from "@akshitginilytics/ppcmeta-models";
import { CampaignDataModel } from "@GeneralTypes";
import { Timestamp } from "firebase-admin/firestore";

async function getCampaignList(customerInstance: Customer, customerId: string, campaignIds: string[]) {
  const constraints: Constraint[] = [
    {
      key: "campaign.status",
      op: "IN",
      val: ["ENABLED", "PAUSED"],
    },
  ];
  if (campaignIds.length) {
    constraints.push({
      key: "campaign.id",
      op: "IN",
      val: campaignIds,
    });
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
      "campaign_budget.resource_name",
    ],
    metrics: [
      "metrics.cost_micros",
      "metrics.clicks",
      "metrics.impressions",
      "metrics.all_conversions",
      "metrics.average_cpc",
    ],
    constraints: constraints,
    date_constant: "THIS_MONTH",
  };

  console.log(`Fetching campaign list for customer ${customerId}`);
  try {
    const response = await customerInstance.report(options);
    console.log(`Successfully fetched ${response.length} campaigns for customer ${customerId}`);
    return response;
  } catch (error) {
    console.error(`Error in getCampaignList for customer ${customerId}:`, {
      errorMessage: typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error),
      errorCode: typeof error === "object" && error !== null && "code" in error ? (error as any).code : undefined,
      errorDetails: typeof error === "object" && error !== null && "response" in error && (error as any).response?.data ? (error as any).response.data : "No response data",
      stack: typeof error === "object" && error !== null && "stack" in error ? (error as any).stack : undefined,
    });
    throw error;
  }
}

async function getCampaignsCostAverage(customerInstance: Customer, customerId: string, customerTimezone: string, campaignIds: string[], xDays = 3) {
  const constraints: Constraint[] = [
    {
      key: "campaign.status",
      op: "IN",
      val: ["ENABLED", "PAUSED"],
    },
  ];
  const threeDaysAgo = convertTZ(new Date(Date.now() - 3 * 24 * 3600 * 1000), customerTimezone);
  constraints.push(
    {
      key: "segments.date",
      op: ">",
      val: threeDaysAgo.toISOString().split("T")[0],
    },
    {
      key: "segments.date",
      op: "<=",
      val: new Date().toISOString().split("T")[0],
    }
  );
  if (campaignIds.length) {
    constraints.push({
      key: "campaign.id",
      op: "IN",
      val: campaignIds,
    });
  }

  const options: ReportOptions = {
    entity: "campaign",
    attributes: ["campaign.id"],
    metrics: ["metrics.cost_micros"],
    constraints: constraints,
  };

  console.log(`Fetching cost average for customer ${customerId} over ${xDays} days`);
  try {
    const response = await customerInstance.report(options);
    console.log(`Successfully fetched cost data for customer ${customerId}`);
    const result: Record<string, number> = {};
    for (const campaign of response) {
      const campaignId = campaign.campaign?.id ?? "";
      const cost = campaign.metrics?.cost_micros ?? 0;
      result[campaignId] = cost / xDays;
    }
    return result;
  } catch (error) {
    console.error(`Error in getCampaignsCostAverage for customer ${customerId}:`, {
      errorMessage: typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error),
      errorCode: typeof error === "object" && error !== null && "code" in error ? (error as any).code : undefined,
      errorDetails: typeof error === "object" && error !== null && "response" in error && (error as any).response?.data ? (error as any).response.data : "No response data",
      stack: typeof error === "object" && error !== null && "stack" in error ? (error as any).stack : undefined,
    });
    throw error;
  }
}

function convertStatusEnumToText(status: string | number): CampaignDataModel["status"] {
  const statusValue = typeof status === "string" ? parseInt(status) : status;
  const enumToText = ["UNSPECIFIED", "UNKNOWN", "ENABLED", "PAUSED", "REMOVED"];
  return <never>enumToText[statusValue] ?? "UNSPECIFIED";
}

function divideBy1M(value: number | null | undefined) {
  const result = (value ?? 0) / 1000000;
  return Math.round(result * 100) / 100;
}

export default async function (
  user: User,
  customerId: string,
  customerTimezone: string,
  campaignIds: string[] = []
): Promise<CampaignDataModel[]> {
  console.log(`Starting getCampaigns for customer ${customerId}, user ${user.userId}`);
  await user.getUser();
  const customer = await user.getCustomerById(customerId);
  if (!customer) {
    console.error(`Customer ${customerId} not found for user ${user.userId}`);
    throw new Error("Customer not found");
  }

  // Log credentials and customer details
  console.log(`Credentials for user ${user.userId}, customer ${customerId}:`, {
    refreshToken: user.refreshToken ? "PresentshareToken": "Missing",
    customerId: customer.customerId,
    loginCustomerId: customer.loginCustomerId || "Not provided",
  });

  if (!user.refreshToken) {
    console.error(`No refresh token for user ${user.userId}, customer ${customerId}`);
    throw new Error("User does not have refreshToken");
  }

  // Validate customerId and loginCustomerId format
  if (!customer.customerId.match(/^\d+$/)) {
    console.error(`Invalid customerId format: ${customer.customerId}`);
    throw new Error("Invalid customerId format");
  }
  if (customer.loginCustomerId && !customer.loginCustomerId.match(/^\d+$/)) {
    console.error(`Invalid loginCustomerId format: ${customer.loginCustomerId}`);
    throw new Error("Invalid loginCustomerId format");
  }

  // Create customer instance and log OAuth setup
  const customerInstance = createCustomerInstance(customer.customerId, user.refreshToken, customer.loginCustomerId);
  console.log(`Created customer instance for customer ${customer.customerId}, loginCustomerId: ${customer.loginCustomerId || "None"}`);

  // Intercept OAuth token refresh
  (customerInstance as any).client.oauth2Client.on("tokens", (tokens: any) => {
    console.log(`OAuth token refresh for customer ${customerId}:`, {
      accessToken: tokens.access_token ? "Present" : "Missing",
      refreshToken: tokens.refresh_token ? "Present" : "Missing",
      scope: tokens.scope || "Unknown",
      expiry: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : "Unknown",
    });
  });

  try {
    const campaigns = await getCampaignList(customerInstance, customerId, campaignIds);
    const averageCosts = await getCampaignsCostAverage(customerInstance, customerId, customerTimezone, campaignIds);
    const result: CampaignDataModel[] = [];

    for (let i = 0; i < campaigns.length; i++) {
      const { campaign, metrics, campaign_budget } = campaigns[i];
      if (!campaign || !metrics || !campaign_budget) {
        console.warn(`Skipped campaign ${campaign?.id || "unknown"} for customer ${customerId}: missing data`);
        continue;
      }
      result.push({
        campaignBudget: {
          resourceName: campaign_budget.resource_name ?? "",
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
        name: campaign.name ?? "",
        ownerId: user.userId,
        resourceName: campaign.resource_name ?? "",
        status: convertStatusEnumToText(campaign.status ?? 0),
        teamId: "",
      });
    }
    console.log(`Processed ${result.length} campaigns for customer ${customerId}`);
    return result;
  } catch (error) {
    console.error(`Error in getCampaigns for customer ${customerId}:`, {
      errorMessage: typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error),
      errorCode: typeof error === "object" && error !== null && "code" in error ? (error as any).code : undefined,
      errorDetails: typeof error === "object" && error !== null && "response" in error && (error as any).response?.data ? (error as any).response.data : "No response data",
      stack: typeof error === "object" && error !== null && "stack" in error ? (error as any).stack : undefined,
    });
    throw error;
  }
}