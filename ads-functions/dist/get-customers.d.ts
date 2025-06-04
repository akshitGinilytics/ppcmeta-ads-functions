import { CustomerDataModel } from "@GeneralTypes";
import { User } from "@aminsol/ppcmeta-models";
export default function (user: User): Promise<CustomerDataModel[]>;
