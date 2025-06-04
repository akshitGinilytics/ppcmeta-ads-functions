import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddCampaignInput = {
  campaignId: Scalars['String']['input'];
  customerId: Scalars['ID']['input'];
};

export type BackgroundJob = {
  __typename?: 'BackgroundJob';
  id: Scalars['ID']['output'];
  jobName: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Campaign = {
  __typename?: 'Campaign';
  campaignBudget?: Maybe<CampaignBudget>;
  campaignId: Scalars['ID']['output'];
  campaignSettings?: Maybe<CampaignSettings>;
  metrics?: Maybe<Metrics>;
  name: Scalars['String']['output'];
  resourceName: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type CampaignBudget = {
  __typename?: 'CampaignBudget';
  amount_micros: Scalars['Float']['output'];
  budgetId: Scalars['ID']['output'];
  resourceName: Scalars['String']['output'];
};

export type CampaignSettings = {
  __typename?: 'CampaignSettings';
  campaignId: Scalars['ID']['output'];
  customerId: Scalars['String']['output'];
  isAdded: Scalars['Boolean']['output'];
  thisMonthBudget?: Maybe<Scalars['Float']['output']>;
};

export type Customer = {
  __typename?: 'Customer';
  campaigns?: Maybe<Array<Campaign>>;
  currency: Scalars['String']['output'];
  customerId: Scalars['ID']['output'];
  customerSettings?: Maybe<CustomerSettings>;
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  timeZone: Scalars['String']['output'];
};

export type CustomerSettings = {
  __typename?: 'CustomerSettings';
  customerId: Scalars['ID']['output'];
  isAdded: Scalars['Boolean']['output'];
};

export type GoogleAdsCustomer = {
  __typename?: 'GoogleAdsCustomer';
  campaigns?: Maybe<Array<Campaign>>;
  currency: Scalars['String']['output'];
  customerId: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  resourceName: Scalars['String']['output'];
  timeZone: Scalars['String']['output'];
};

export type Invite = {
  __typename?: 'Invite';
  created: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  inviteId: Scalars['ID']['output'];
  invitedBy: Teammate;
  role: Roles;
  status: Scalars['String']['output'];
  teamId: Scalars['String']['output'];
  teamName: Scalars['String']['output'];
  updated: Scalars['Int']['output'];
};

export type InviteInput = {
  email: Scalars['String']['input'];
  role: Roles;
};

export type Me = {
  __typename?: 'Me';
  created: Scalars['Int']['output'];
  customers?: Maybe<Array<GoogleAdsCustomer>>;
  defaultTeam: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  hasGoogleAdsAccount: Scalars['Boolean']['output'];
  teamsMembership?: Maybe<Array<TeamsMembership>>;
  userId: Scalars['ID']['output'];
};

export type Metrics = {
  __typename?: 'Metrics';
  allConversions: Scalars['Float']['output'];
  averageCPC: Scalars['Float']['output'];
  clicks: Scalars['Int']['output'];
  costMicros: Scalars['Float']['output'];
  impressions: Scalars['Int']['output'];
  xDaysAverageCost: Scalars['Float']['output'];
};

export type MonthlyBudgetInput = {
  campaignId: Scalars['String']['input'];
  thisMonthBudget: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite?: Maybe<Invite>;
  addCampaigns: Array<Campaign>;
  addCustomers: Array<Customer>;
  declineInvite?: Maybe<Invite>;
  getInvite?: Maybe<Invite>;
  removeCampaigns?: Maybe<Scalars['String']['output']>;
  removeCustomers?: Maybe<Scalars['String']['output']>;
  renameTeam: Scalars['String']['output'];
  sendInvite?: Maybe<Invite>;
  setMonthlyBudget: Scalars['Boolean']['output'];
  setTeam: Scalars['String']['output'];
};


export type MutationAcceptInviteArgs = {
  inviteId: Scalars['String']['input'];
};


export type MutationAddCampaignsArgs = {
  addCampaignInput: Array<AddCampaignInput>;
};


export type MutationAddCustomersArgs = {
  customerIds: Array<Scalars['String']['input']>;
};


export type MutationDeclineInviteArgs = {
  inviteId: Scalars['String']['input'];
};


export type MutationGetInviteArgs = {
  inviteId: Scalars['String']['input'];
};


export type MutationRemoveCampaignsArgs = {
  removeCampaignInput: Array<RemoveCampaignInput>;
};


export type MutationRemoveCustomersArgs = {
  customersIds: Array<Scalars['String']['input']>;
};


export type MutationRenameTeamArgs = {
  name: Scalars['String']['input'];
};


export type MutationSendInviteArgs = {
  inviteInput: InviteInput;
};


export type MutationSetMonthlyBudgetArgs = {
  thisMonthBudgets: Array<MonthlyBudgetInput>;
};


export type MutationSetTeamArgs = {
  teamId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  backgroundJobs?: Maybe<Array<Maybe<BackgroundJob>>>;
  googleAdsCustomers: Array<GoogleAdsCustomer>;
  invite?: Maybe<Invite>;
  invites?: Maybe<Array<Invite>>;
  me?: Maybe<Me>;
  team?: Maybe<Team>;
};


export type QueryBackgroundJobsArgs = {
  jobIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGoogleAdsCustomersArgs = {
  customerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryInviteArgs = {
  inviteId: Scalars['String']['input'];
};

export type RemoveCampaignInput = {
  campaignsIds: Array<Scalars['String']['input']>;
  customerId: Scalars['ID']['input'];
};

export enum Roles {
  Manager = 'manager',
  Owner = 'owner',
  Specialist = 'specialist',
  Viewer = 'viewer'
}

export type Team = {
  __typename?: 'Team';
  created: Scalars['Int']['output'];
  customers?: Maybe<Array<Customer>>;
  members: Array<TeamMember>;
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  teamId: Scalars['ID']['output'];
};


export type TeamCustomersArgs = {
  customerIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  permission: Roles;
};

export type Teammate = {
  __typename?: 'Teammate';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type TeamsMembership = {
  __typename?: 'TeamsMembership';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  permission: Roles;
};

export type User = {
  __typename?: 'User';
  created: Scalars['Int']['output'];
  defaultTeam: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  teamsMembership?: Maybe<Array<TeamsMembership>>;
  userId: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCampaignInput: AddCampaignInput;
  BackgroundJob: ResolverTypeWrapper<BackgroundJob>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Campaign: ResolverTypeWrapper<Campaign>;
  CampaignBudget: ResolverTypeWrapper<CampaignBudget>;
  CampaignSettings: ResolverTypeWrapper<CampaignSettings>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerSettings: ResolverTypeWrapper<CustomerSettings>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GoogleAdsCustomer: ResolverTypeWrapper<GoogleAdsCustomer>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invite: ResolverTypeWrapper<Invite>;
  InviteInput: InviteInput;
  Me: ResolverTypeWrapper<Me>;
  Metrics: ResolverTypeWrapper<Metrics>;
  MonthlyBudgetInput: MonthlyBudgetInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveCampaignInput: RemoveCampaignInput;
  Roles: Roles;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Team: ResolverTypeWrapper<Team>;
  TeamMember: ResolverTypeWrapper<TeamMember>;
  Teammate: ResolverTypeWrapper<Teammate>;
  TeamsMembership: ResolverTypeWrapper<TeamsMembership>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCampaignInput: AddCampaignInput;
  BackgroundJob: BackgroundJob;
  Boolean: Scalars['Boolean']['output'];
  Campaign: Campaign;
  CampaignBudget: CampaignBudget;
  CampaignSettings: CampaignSettings;
  Customer: Customer;
  CustomerSettings: CustomerSettings;
  Float: Scalars['Float']['output'];
  GoogleAdsCustomer: GoogleAdsCustomer;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Invite: Invite;
  InviteInput: InviteInput;
  Me: Me;
  Metrics: Metrics;
  MonthlyBudgetInput: MonthlyBudgetInput;
  Mutation: {};
  Query: {};
  RemoveCampaignInput: RemoveCampaignInput;
  String: Scalars['String']['output'];
  Team: Team;
  TeamMember: TeamMember;
  Teammate: Teammate;
  TeamsMembership: TeamsMembership;
  User: User;
};

export type BackgroundJobResolvers<ContextType = any, ParentType extends ResolversParentTypes['BackgroundJob'] = ResolversParentTypes['BackgroundJob']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignResolvers<ContextType = any, ParentType extends ResolversParentTypes['Campaign'] = ResolversParentTypes['Campaign']> = {
  campaignBudget?: Resolver<Maybe<ResolversTypes['CampaignBudget']>, ParentType, ContextType>;
  campaignId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  campaignSettings?: Resolver<Maybe<ResolversTypes['CampaignSettings']>, ParentType, ContextType>;
  metrics?: Resolver<Maybe<ResolversTypes['Metrics']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resourceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignBudgetResolvers<ContextType = any, ParentType extends ResolversParentTypes['CampaignBudget'] = ResolversParentTypes['CampaignBudget']> = {
  amount_micros?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  budgetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  resourceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CampaignSettings'] = ResolversParentTypes['CampaignSettings']> = {
  campaignId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  thisMonthBudget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  campaigns?: Resolver<Maybe<Array<ResolversTypes['Campaign']>>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  customerSettings?: Resolver<Maybe<ResolversTypes['CustomerSettings']>, ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeZone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerSettings'] = ResolversParentTypes['CustomerSettings']> = {
  customerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoogleAdsCustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['GoogleAdsCustomer'] = ResolversParentTypes['GoogleAdsCustomer']> = {
  campaigns?: Resolver<Maybe<Array<ResolversTypes['Campaign']>>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resourceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeZone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invite'] = ResolversParentTypes['Invite']> = {
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inviteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitedBy?: Resolver<ResolversTypes['Teammate'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Roles'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<ResolversTypes['GoogleAdsCustomer']>>, ParentType, ContextType>;
  defaultTeam?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasGoogleAdsAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  teamsMembership?: Resolver<Maybe<Array<ResolversTypes['TeamsMembership']>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metrics'] = ResolversParentTypes['Metrics']> = {
  allConversions?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  averageCPC?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  clicks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  costMicros?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  impressions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  xDaysAverageCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptInvite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<MutationAcceptInviteArgs, 'inviteId'>>;
  addCampaigns?: Resolver<Array<ResolversTypes['Campaign']>, ParentType, ContextType, RequireFields<MutationAddCampaignsArgs, 'addCampaignInput'>>;
  addCustomers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<MutationAddCustomersArgs, 'customerIds'>>;
  declineInvite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<MutationDeclineInviteArgs, 'inviteId'>>;
  getInvite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<MutationGetInviteArgs, 'inviteId'>>;
  removeCampaigns?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveCampaignsArgs, 'removeCampaignInput'>>;
  removeCustomers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveCustomersArgs, 'customersIds'>>;
  renameTeam?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRenameTeamArgs, 'name'>>;
  sendInvite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<MutationSendInviteArgs, 'inviteInput'>>;
  setMonthlyBudget?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetMonthlyBudgetArgs, 'thisMonthBudgets'>>;
  setTeam?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSetTeamArgs, 'teamId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  backgroundJobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['BackgroundJob']>>>, ParentType, ContextType, Partial<QueryBackgroundJobsArgs>>;
  googleAdsCustomers?: Resolver<Array<ResolversTypes['GoogleAdsCustomer']>, ParentType, ContextType, Partial<QueryGoogleAdsCustomersArgs>>;
  invite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<QueryInviteArgs, 'inviteId'>>;
  invites?: Resolver<Maybe<Array<ResolversTypes['Invite']>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType, Partial<TeamCustomersArgs>>;
  members?: Resolver<Array<ResolversTypes['TeamMember']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamMember'] = ResolversParentTypes['TeamMember']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Roles'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeammateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Teammate'] = ResolversParentTypes['Teammate']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamsMembershipResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamsMembership'] = ResolversParentTypes['TeamsMembership']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Roles'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  defaultTeam?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamsMembership?: Resolver<Maybe<Array<ResolversTypes['TeamsMembership']>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BackgroundJob?: BackgroundJobResolvers<ContextType>;
  Campaign?: CampaignResolvers<ContextType>;
  CampaignBudget?: CampaignBudgetResolvers<ContextType>;
  CampaignSettings?: CampaignSettingsResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerSettings?: CustomerSettingsResolvers<ContextType>;
  GoogleAdsCustomer?: GoogleAdsCustomerResolvers<ContextType>;
  Invite?: InviteResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Metrics?: MetricsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamMember?: TeamMemberResolvers<ContextType>;
  Teammate?: TeammateResolvers<ContextType>;
  TeamsMembership?: TeamsMembershipResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

