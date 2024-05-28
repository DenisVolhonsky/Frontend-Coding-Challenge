import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Address = {
  __typename?: 'Address';
  addition?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  street?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  addition?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  houseNumber?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  street?: InputMaybe<Scalars['String']>;
};

export type Empty = {
  __typename?: 'Empty';
  _?: Maybe<Scalars['String']>;
};

export type HumanName = {
  __typename?: 'HumanName';
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  middleNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type HumanNameInput = {
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleNames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Medication = {
  __typename?: 'Medication';
  brand?: Maybe<Scalars['String']>;
  labeler?: Maybe<Scalars['String']>;
  packageCode?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['ID']>;
  productCode?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPatient?: Maybe<Patient>;
  deletePatient?: Maybe<Scalars['String']>;
  updatePatient?: Maybe<Patient>;
};


export type MutationDeletePatientArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePatientArgs = {
  patient?: InputMaybe<PatientInput>;
};

export type Patient = {
  __typename?: 'Patient';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<HumanName>;
  sex?: Maybe<Sex>;
};

export type PatientInput = {
  address?: InputMaybe<AddressInput>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<HumanNameInput>;
  sex?: InputMaybe<Sex>;
};

export type Query = {
  __typename?: 'Query';
  getPatient?: Maybe<Patient>;
  listPatientMedications?: Maybe<Array<Maybe<Medication>>>;
  listPatients?: Maybe<Array<Maybe<Patient>>>;
};


export type QueryGetPatientArgs = {
  id: Scalars['String'];
};


export type QueryListPatientMedicationsArgs = {
  patientId: Scalars['String'];
};

export enum Sex {
  Diverse = 'Diverse',
  Female = 'Female',
  Male = 'Male'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Empty: ResolverTypeWrapper<Empty>;
  HumanName: ResolverTypeWrapper<HumanName>;
  HumanNameInput: HumanNameInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Medication: ResolverTypeWrapper<Medication>;
  Mutation: ResolverTypeWrapper<{}>;
  Patient: ResolverTypeWrapper<Patient>;
  PatientInput: PatientInput;
  Query: ResolverTypeWrapper<{}>;
  Sex: Sex;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Empty: Empty;
  HumanName: HumanName;
  HumanNameInput: HumanNameInput;
  ID: Scalars['ID'];
  Medication: Medication;
  Mutation: {};
  Patient: Patient;
  PatientInput: PatientInput;
  Query: {};
  String: Scalars['String'];
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  addition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  houseNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EmptyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Empty'] = ResolversParentTypes['Empty']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HumanNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['HumanName'] = ResolversParentTypes['HumanName']> = ResolversObject<{
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleNames?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MedicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Medication'] = ResolversParentTypes['Medication']> = ResolversObject<{
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  labeler?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packageCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  patientId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  productCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPatient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType>;
  deletePatient?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeletePatientArgs>>;
  updatePatient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, Partial<MutationUpdatePatientArgs>>;
}>;

export type PatientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Patient'] = ResolversParentTypes['Patient']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['HumanName']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['Sex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getPatient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, RequireFields<QueryGetPatientArgs, 'id'>>;
  listPatientMedications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Medication']>>>, ParentType, ContextType, RequireFields<QueryListPatientMedicationsArgs, 'patientId'>>;
  listPatients?: Resolver<Maybe<Array<Maybe<ResolversTypes['Patient']>>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Empty?: EmptyResolvers<ContextType>;
  HumanName?: HumanNameResolvers<ContextType>;
  Medication?: MedicationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Patient?: PatientResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

