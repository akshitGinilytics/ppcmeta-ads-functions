import {Timestamp} from "firebase-admin/firestore"
import {CampaignBudget, Invite, Metrics, Roles, Teammate} from "./graphql-types.js"
import {BaseContext} from "@apollo/server"
import {Request, Response} from "@google-cloud/functions-framework"
import TeamDataLoaders from "../models/src/TeamDataLoaders"
import UserDataLoaders from "../models/src/UserDataLoaders"
export {Roles, Invite} from "./graphql-types.js"

export enum databaseActions {
  SELECT = "select",
  INSERT = "insert",
  UPDATE = "update",
  DELETE = "delete"
}



export type Role = Roles.Owner | Roles.Manager | Roles.Specialist | Roles.Viewer

export interface InviteDataModel extends Invite {
  invitedBy: Teammate
  role: Role
  created: Timestamp
  updated: Timestamp
}

export type RoleDefinition = Record<string, Record<databaseActions, true | false>>

export type Context = BaseContext & {
  readonly auth?: ContextUserInfo
  setTeam: (teamId: string, teamName: string) => void
  setPermission: (permission: Role) => void
  teamDataLoaders: TeamDataLoaders
  userDataLoaders: UserDataLoaders
}

export interface ContextUserInfo {
  userId: string
  userName: string
  email: string
  teamId: string
  teamName: string
  permission: Role
}

export type Middleware = (req: Request, res: Response, next: () => void) => void

export interface ContextInput {
  req: Request
  res: Response
}

export interface UserInterface {
  userId: string,
  email: string,
  displayName: string,
  defaultTeam: string,
  created: Timestamp,
  refreshToken?: string
  refreshTokenAddedAt?: Timestamp
  customers?: CustomerDataModel[]
  teamsMembership: Record<string, {
    id: string,
    name: string,
    permission: Role
  }>,
}

export type UpdateUserInterface = Partial<Omit<UserInterface, 'userId'>>

export type TeamDataModel = {
  teamId: string
  name: string,
  ownerId: string,
  members: Record<string, TeamMemberInterface>,
  campaignsByCustomer: CampaignsByCustomer
  campaignsCount: number
  created: Timestamp
}

export interface TeamMemberInterface {
  id: string
  email: string
  permission: Role
  displayName: string
}

export type CustomerDataModel = {
  level: number
  name: string
  loginCustomerId: string
  isManager: boolean
  managerIds: string[]
  managerCount: number
  ownerId: string
  teamId: string
  currency: string[3]
  timeZone: string
  customerId: string
  resourceName: string
  lastUpdated: Timestamp | undefined
}

export type CampaignDataModel = {
  campaignId: string
  customerId: string
  teamId: string
  ownerId: string
  firstImportedAt: Timestamp
  lastUpdated: Timestamp
  campaignBudget: CampaignBudget
  metrics: Metrics
  name: string
  resourceName: string
  status: "ENABLED" | "PAUSED" | "REMOVED" | "UNKNOWN" | "UNSPECIFIED"
}


export type RemoveCampaignInput = {
  campaignsIds: string[]
  customerId: string
}

export type CampaignsByCustomer = Record<string, string[]>

export type SendEmailInput = {
  to: string
  data: Record<string, string>
  templateId: string
}
