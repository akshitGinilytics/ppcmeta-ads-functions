import { User } from "@aminsol/ppcmeta-models";
import { CampaignDataModel } from "@GeneralTypes";
export default function (user: User, customerId: string, customerTimezone: string, campaignIds?: string[]): Promise<CampaignDataModel[]>;
