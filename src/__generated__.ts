import { DataError } from './utils/fetcher';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from './utils/fetcher';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type Ammo = {
  __typename?: 'Ammo';
  id: Scalars['ID'];
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  combinedAmmo: Array<Ammo>;
};

export type AmmoRequest = {
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  combinedAmmoIds: Array<Scalars['ID']>;
};

export type Audit = {
  __typename?: 'Audit';
  id: Scalars['ID'];
  performedBy: Scalars['String'];
  performedAt: Scalars['String'];
  action: Scalars['String'];
  resource: Scalars['String'];
  resourceName: Scalars['String'];
  parentResourceName?: Maybe<Scalars['String']>;
  auditFields?: Maybe<Array<AuditField>>;
};

export type AuditField = {
  __typename?: 'AuditField';
  fieldName: Scalars['String'];
  oldValue?: Maybe<Scalars['String']>;
  newValue?: Maybe<Scalars['String']>;
  childFields?: Maybe<Array<AuditField>>;
};

export type CacheControlScope =
  | 'PUBLIC'
  | 'PRIVATE';

export type ChangePasswordRequest = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type HackingDevice = {
  __typename?: 'HackingDevice';
  id: Scalars['ID'];
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  programs: Array<HackingProgram>;
  validationErrors?: Maybe<Array<ValidationError>>;
};

export type HackingDeviceRequest = {
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  programIds: Array<Scalars['ID']>;
};

export type HackingProgram = {
  __typename?: 'HackingProgram';
  id: Scalars['ID'];
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  attackMod?: Maybe<Scalars['String']>;
  opponentMod?: Maybe<Scalars['String']>;
  damage?: Maybe<Scalars['String']>;
  burst?: Maybe<Scalars['String']>;
  target: Array<HackingProgramTarget>;
  skillType: Array<HackingProgramSkillType>;
  special?: Maybe<Scalars['String']>;
};

export type HackingProgramRequest = {
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  attackMod?: Maybe<Scalars['String']>;
  opponentMod?: Maybe<Scalars['String']>;
  damage?: Maybe<Scalars['String']>;
  burst?: Maybe<Scalars['String']>;
  target: Array<HackingProgramTarget>;
  skillType: Array<HackingProgramSkillType>;
  special?: Maybe<Scalars['String']>;
};

export type HackingProgramSkillType =
  | 'ENTIRE_ORDER'
  | 'SHORT_SKILL'
  | 'ARO';

export type HackingProgramTarget =
  | 'REM'
  | 'TAG'
  | 'HI'
  | 'HACKER';

export type LoginRequest = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['Int']>;
  login: User;
  logout?: Maybe<Scalars['Boolean']>;
  createUser?: Maybe<Scalars['Boolean']>;
  adminCreateUser: User;
  resetPasswordRequest?: Maybe<Scalars['Boolean']>;
  resetPassword: User;
  changePassword?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
  removeUser?: Maybe<Scalars['ID']>;
  remove?: Maybe<Scalars['ID']>;
  disableUser?: Maybe<Scalars['ID']>;
  enableUser?: Maybe<Scalars['ID']>;
  forceLogoutUser?: Maybe<Scalars['ID']>;
  createRule: Rule;
  updateRule: Rule;
  createHackingDevice: HackingDevice;
  updateHackingDevice: HackingDevice;
  createHackingProgram: HackingProgram;
  updateHackingProgram: HackingProgram;
  createAmmo: Ammo;
  updateAmmo: Ammo;
  createWeaponMode: WeaponMode;
  updateWeaponMode: WeaponMode;
  removeWeaponMode?: Maybe<Scalars['ID']>;
  createWeapon: Weapon;
  updateWeapon: Weapon;
};


export type MutationLoginArgs = {
  request: LoginRequest;
};


export type MutationCreateUserArgs = {
  request: UserRequest;
};


export type MutationAdminCreateUserArgs = {
  request: UserAdminRequest;
};


export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetId: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  request: ChangePasswordRequest;
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ID'];
  request: UserAdminRequest;
  logUserOut?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveUserArgs = {
  userId: Scalars['ID'];
};


export type MutationDisableUserArgs = {
  userId: Scalars['ID'];
};


export type MutationEnableUserArgs = {
  userId: Scalars['ID'];
};


export type MutationForceLogoutUserArgs = {
  userId: Scalars['ID'];
};


export type MutationCreateRuleArgs = {
  request: RuleRequest;
};


export type MutationUpdateRuleArgs = {
  ruleId: Scalars['ID'];
  request: RuleRequest;
};


export type MutationCreateHackingDeviceArgs = {
  request: HackingDeviceRequest;
};


export type MutationUpdateHackingDeviceArgs = {
  hackingDeviceId: Scalars['ID'];
  request: HackingDeviceRequest;
};


export type MutationCreateHackingProgramArgs = {
  request: HackingProgramRequest;
};


export type MutationUpdateHackingProgramArgs = {
  hackingProgramId: Scalars['ID'];
  request: HackingProgramRequest;
};


export type MutationCreateAmmoArgs = {
  request: AmmoRequest;
};


export type MutationUpdateAmmoArgs = {
  ammoId: Scalars['ID'];
  request: AmmoRequest;
};


export type MutationCreateWeaponModeArgs = {
  weaponId: Scalars['ID'];
  request: WeaponModeRequest;
};


export type MutationUpdateWeaponModeArgs = {
  weaponId: Scalars['ID'];
  weaponModeId: Scalars['ID'];
  request: WeaponModeRequest;
};


export type MutationRemoveWeaponModeArgs = {
  weaponId: Scalars['ID'];
  weaponModeId: Scalars['ID'];
};


export type MutationCreateWeaponArgs = {
  request: WeaponRequest;
};


export type MutationUpdateWeaponArgs = {
  weaponId: Scalars['ID'];
  request: WeaponRequest;
};

export type PagedAmmo = {
  __typename?: 'PagedAmmo';
  content: Array<Ammo>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type PagedAudit = {
  __typename?: 'PagedAudit';
  content: Array<Audit>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type PagedHackingDevices = {
  __typename?: 'PagedHackingDevices';
  content: Array<HackingDevice>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type PagedHackingPrograms = {
  __typename?: 'PagedHackingPrograms';
  content: Array<HackingProgram>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type PagedRules = {
  __typename?: 'PagedRules';
  content: Array<Rule>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type PagedUsers = {
  __typename?: 'PagedUsers';
  content: Array<User>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type PagedWeapons = {
  __typename?: 'PagedWeapons';
  content: Array<Weapon>;
  limit?: Maybe<Scalars['Int']>;
  count: Scalars['Int'];
  page: Scalars['Int'];
  last: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['Int']>;
  auditList: PagedAudit;
  user?: Maybe<User>;
  userById: User;
  userList: PagedUsers;
  ruleById: Rule;
  rulesList: PagedRules;
  hackingDeviceById: HackingDevice;
  hackingDevicesList: PagedHackingDevices;
  hackingProgramById: HackingProgram;
  hackingProgramsList: PagedHackingPrograms;
  ammoById: Ammo;
  ammoList: PagedAmmo;
  weaponById: Weapon;
  weaponsList: PagedWeapons;
};


export type QueryAuditListArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  userId: Scalars['ID'];
};


export type QueryUserListArgs = {
  search?: Maybe<UserSearch>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryRuleByIdArgs = {
  ruleId: Scalars['ID'];
};


export type QueryRulesListArgs = {
  search?: Maybe<Search>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryHackingDeviceByIdArgs = {
  hackingDeviceId: Scalars['ID'];
};


export type QueryHackingDevicesListArgs = {
  search?: Maybe<Search>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryHackingProgramByIdArgs = {
  hackingProgramId: Scalars['ID'];
};


export type QueryHackingProgramsListArgs = {
  search?: Maybe<Search>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAmmoByIdArgs = {
  ammoId: Scalars['ID'];
};


export type QueryAmmoListArgs = {
  search?: Maybe<Search>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryWeaponByIdArgs = {
  weaponId: Scalars['ID'];
};


export type QueryWeaponsListArgs = {
  search?: Maybe<Search>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Rule = {
  __typename?: 'Rule';
  id: Scalars['ID'];
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  type?: Maybe<RuleType>;
};

export type RuleRequest = {
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  type?: Maybe<RuleType>;
};

export type RuleType =
  | 'TRANSMUTATION_AUTO'
  | 'TRANSMUTATION_WOUNDS'
  | 'MOTORCYCLE'
  | 'SUPPRESSIVE_FIRE'
  | 'DOCTOR'
  | 'ENGINEER'
  | 'FIRETEAM_CORE'
  | 'FIRETEAM_DUO'
  | 'HIDDEN_DEPLOYMENT';

export type Search = {
  name: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  roles: Array<UserRole>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UserAdminRequest = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  roles: Array<UserRole>;
};

export type UserRequest = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserRole =
  | 'USER'
  | 'USER_ADMIN'
  | 'CONTENT_MANAGER'
  | 'CONTENT_PUBLISHER';

export type UserSearch = {
  searchTerm?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  active?: Maybe<Scalars['Boolean']>;
};

export type ValidationError = {
  __typename?: 'ValidationError';
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Weapon = {
  __typename?: 'Weapon';
  id: Scalars['ID'];
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  modes: Array<WeaponMode>;
};

export type WeaponMode = {
  __typename?: 'WeaponMode';
  id: Scalars['ID'];
  name: Scalars['String'];
  range: WeaponRange;
  damage?: Maybe<Scalars['String']>;
  burst?: Maybe<Scalars['String']>;
  savingAttribute?: Maybe<Scalars['String']>;
  ammo: Array<Ammo>;
  traits: Array<Rule>;
};

export type WeaponModeRequest = {
  name: Scalars['String'];
  range: WeaponRangeRequest;
  damage?: Maybe<Scalars['String']>;
  burst?: Maybe<Scalars['String']>;
  savingAttribute?: Maybe<Scalars['String']>;
  ammoIds: Array<Scalars['ID']>;
  traitIds: Array<Scalars['ID']>;
};

export type WeaponRange = {
  __typename?: 'WeaponRange';
  _8?: Maybe<WeaponRangeModifier>;
  _16?: Maybe<WeaponRangeModifier>;
  _24?: Maybe<WeaponRangeModifier>;
  _32?: Maybe<WeaponRangeModifier>;
  _40?: Maybe<WeaponRangeModifier>;
  _48?: Maybe<WeaponRangeModifier>;
  _96?: Maybe<WeaponRangeModifier>;
};

export type WeaponRangeModifier =
  | 'MINUS_SIX'
  | 'MINUS_THREE'
  | 'ZERO'
  | 'PLUS_THREE'
  | 'PLUS_SIX';

export type WeaponRangeRequest = {
  _8?: Maybe<WeaponRangeModifier>;
  _16?: Maybe<WeaponRangeModifier>;
  _24?: Maybe<WeaponRangeModifier>;
  _32?: Maybe<WeaponRangeModifier>;
  _40?: Maybe<WeaponRangeModifier>;
  _48?: Maybe<WeaponRangeModifier>;
  _96?: Maybe<WeaponRangeModifier>;
};

export type WeaponRequest = {
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};

export type AuditListQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type AuditListQuery = (
  { __typename?: 'Query' }
  & { auditList: (
    { __typename?: 'PagedAudit' }
    & Pick<PagedAudit, 'count' | 'page' | 'last'>
    & { content: Array<(
      { __typename?: 'Audit' }
      & Pick<Audit, 'id' | 'performedBy' | 'performedAt' | 'action' | 'resource' | 'resourceName' | 'parentResourceName'>
      & { auditFields?: Maybe<Array<(
        { __typename?: 'AuditField' }
        & Pick<AuditField, 'fieldName' | 'oldValue' | 'newValue'>
      )>> }
    )> }
  ) }
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'roles'>
);

export type LoginMutationVariables = Exact<{
  request: LoginRequest;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & UserInfoFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type ResetPasswordRequestMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPasswordRequest'>
);

export type ResetPasswordMutationVariables = Exact<{
  resetId: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'User' }
    & UserInfoFragment
  ) }
);

export type UserListQueryVariables = Exact<{
  search?: Maybe<UserSearch>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type UserListQuery = (
  { __typename?: 'Query' }
  & { userList: (
    { __typename?: 'PagedUsers' }
    & Pick<PagedUsers, 'page' | 'last' | 'count'>
    & { content: Array<(
      { __typename?: 'User' }
      & Pick<User, 'active'>
      & UserInfoFragment
    )> }
  ) }
);

export type AdminCreateUserMutationVariables = Exact<{
  request: UserAdminRequest;
}>;


export type AdminCreateUserMutation = (
  { __typename?: 'Mutation' }
  & { adminCreateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  request: UserAdminRequest;
  logUserOut?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type RemoveUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type RemoveUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUser'>
);

export type EnableUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type EnableUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'enableUser'>
);

export type DisableUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type DisableUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'disableUser'>
);

export type ForceLogoutUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ForceLogoutUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forceLogoutUser'>
);

export type ChangePasswordMutationVariables = Exact<{
  request: ChangePasswordRequest;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export const UserInfoFragmentDoc = `
    fragment UserInfo on User {
  id
  username
  email
  roles
}
    `;
export const AuditListDocument = `
    query auditList($page: Int, $limit: Int) {
  auditList(page: $page, limit: $limit) {
    content {
      id
      performedBy
      performedAt
      action
      resource
      resourceName
      parentResourceName
      auditFields {
        fieldName
        oldValue
        newValue
      }
    }
    count
    page
    last
  }
}
    `;
export const useAuditListQuery = <
      TData = AuditListQuery,
      TError = DataError
    >(
      variables?: AuditListQueryVariables, 
      options?: UseQueryOptions<AuditListQuery, TError, TData>
    ) => 
    useQuery<AuditListQuery, TError, TData>(
      ['auditList', variables],
      fetcher<AuditListQuery, AuditListQueryVariables>(AuditListDocument, variables),
      options
    );
useAuditListQuery.getKey = (variables?: AuditListQueryVariables) => ['auditList', variables];

export const LoginDocument = `
    mutation login($request: LoginRequest!) {
  login(request: $request) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useLoginMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => 
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const LogoutDocument = `
    mutation logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>) => 
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables)(),
      options
    );
export const UserDocument = `
    query user {
  user {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useUserQuery = <
      TData = UserQuery,
      TError = DataError
    >(
      variables?: UserQueryVariables, 
      options?: UseQueryOptions<UserQuery, TError, TData>
    ) => 
    useQuery<UserQuery, TError, TData>(
      ['user', variables],
      fetcher<UserQuery, UserQueryVariables>(UserDocument, variables),
      options
    );
useUserQuery.getKey = (variables?: UserQueryVariables) => ['user', variables];

export const ResetPasswordRequestDocument = `
    mutation resetPasswordRequest($email: String!) {
  resetPasswordRequest(email: $email)
}
    `;
export const useResetPasswordRequestMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordRequestMutation, TError, ResetPasswordRequestMutationVariables, TContext>) => 
    useMutation<ResetPasswordRequestMutation, TError, ResetPasswordRequestMutationVariables, TContext>(
      (variables?: ResetPasswordRequestMutationVariables) => fetcher<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>(ResetPasswordRequestDocument, variables)(),
      options
    );
export const ResetPasswordDocument = `
    mutation resetPassword($resetId: String!, $password: String!) {
  resetPassword(resetId: $resetId, password: $password) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useResetPasswordMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) => 
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
      options
    );
export const UserListDocument = `
    query userList($search: UserSearch, $page: Int, $limit: Int) {
  userList(search: $search, page: $page, limit: $limit) {
    content {
      ...UserInfo
      active
    }
    page
    last
    count
  }
}
    ${UserInfoFragmentDoc}`;
export const useUserListQuery = <
      TData = UserListQuery,
      TError = DataError
    >(
      variables?: UserListQueryVariables, 
      options?: UseQueryOptions<UserListQuery, TError, TData>
    ) => 
    useQuery<UserListQuery, TError, TData>(
      ['userList', variables],
      fetcher<UserListQuery, UserListQueryVariables>(UserListDocument, variables),
      options
    );
useUserListQuery.getKey = (variables?: UserListQueryVariables) => ['userList', variables];

export const AdminCreateUserDocument = `
    mutation adminCreateUser($request: UserAdminRequest!) {
  adminCreateUser(request: $request) {
    id
  }
}
    `;
export const useAdminCreateUserMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<AdminCreateUserMutation, TError, AdminCreateUserMutationVariables, TContext>) => 
    useMutation<AdminCreateUserMutation, TError, AdminCreateUserMutationVariables, TContext>(
      (variables?: AdminCreateUserMutationVariables) => fetcher<AdminCreateUserMutation, AdminCreateUserMutationVariables>(AdminCreateUserDocument, variables)(),
      options
    );
export const UpdateUserDocument = `
    mutation updateUser($userId: ID!, $request: UserAdminRequest!, $logUserOut: Boolean) {
  updateUser(userId: $userId, request: $request, logUserOut: $logUserOut) {
    id
  }
}
    `;
export const useUpdateUserMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) => 
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
      options
    );
export const RemoveUserDocument = `
    mutation removeUser($userId: ID!) {
  removeUser(userId: $userId)
}
    `;
export const useRemoveUserMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveUserMutation, TError, RemoveUserMutationVariables, TContext>) => 
    useMutation<RemoveUserMutation, TError, RemoveUserMutationVariables, TContext>(
      (variables?: RemoveUserMutationVariables) => fetcher<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, variables)(),
      options
    );
export const EnableUserDocument = `
    mutation enableUser($userId: ID!) {
  enableUser(userId: $userId)
}
    `;
export const useEnableUserMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<EnableUserMutation, TError, EnableUserMutationVariables, TContext>) => 
    useMutation<EnableUserMutation, TError, EnableUserMutationVariables, TContext>(
      (variables?: EnableUserMutationVariables) => fetcher<EnableUserMutation, EnableUserMutationVariables>(EnableUserDocument, variables)(),
      options
    );
export const DisableUserDocument = `
    mutation disableUser($userId: ID!) {
  disableUser(userId: $userId)
}
    `;
export const useDisableUserMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<DisableUserMutation, TError, DisableUserMutationVariables, TContext>) => 
    useMutation<DisableUserMutation, TError, DisableUserMutationVariables, TContext>(
      (variables?: DisableUserMutationVariables) => fetcher<DisableUserMutation, DisableUserMutationVariables>(DisableUserDocument, variables)(),
      options
    );
export const ForceLogoutUserDocument = `
    mutation forceLogoutUser($userId: ID!) {
  forceLogoutUser(userId: $userId)
}
    `;
export const useForceLogoutUserMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<ForceLogoutUserMutation, TError, ForceLogoutUserMutationVariables, TContext>) => 
    useMutation<ForceLogoutUserMutation, TError, ForceLogoutUserMutationVariables, TContext>(
      (variables?: ForceLogoutUserMutationVariables) => fetcher<ForceLogoutUserMutation, ForceLogoutUserMutationVariables>(ForceLogoutUserDocument, variables)(),
      options
    );
export const ChangePasswordDocument = `
    mutation changePassword($request: ChangePasswordRequest!) {
  changePassword(request: $request)
}
    `;
export const useChangePasswordMutation = <
      TError = DataError,
      TContext = unknown
    >(options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>) => 
    useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      (variables?: ChangePasswordMutationVariables) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, variables)(),
      options
    );