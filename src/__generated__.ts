import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
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
  resetPasswordRequest?: Maybe<Scalars['Boolean']>;
  resetPassword: User;
  login: User;
  logout?: Maybe<Scalars['Boolean']>;
  createUser: User;
  changePassword?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
  removeUser?: Maybe<Scalars['ID']>;
  remove?: Maybe<Scalars['ID']>;
  disableUser?: Maybe<Scalars['ID']>;
  enableUser?: Maybe<Scalars['ID']>;
  createRule: Rule;
  updateRule: Rule;
  createAmmo: Ammo;
  updateAmmo: Ammo;
  createWeaponMode: WeaponMode;
  updateWeaponMode: WeaponMode;
  removeWeaponMode?: Maybe<Scalars['ID']>;
  createWeapon: Weapon;
  updateWeapon: Weapon;
  createHackingDevice: HackingDevice;
  updateHackingDevice: HackingDevice;
  createHackingProgram: HackingProgram;
  updateHackingProgram: HackingProgram;
};


export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetId: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  request: LoginRequest;
};


export type MutationCreateUserArgs = {
  request: UserRequest;
};


export type MutationChangePasswordArgs = {
  request: ChangePasswordRequest;
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ID'];
  request: UserRequest;
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


export type MutationCreateRuleArgs = {
  request: RuleRequest;
};


export type MutationUpdateRuleArgs = {
  ruleId: Scalars['ID'];
  request: RuleRequest;
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

export type PagedAmmo = {
  __typename?: 'PagedAmmo';
  content: Array<Ammo>;
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
  user?: Maybe<User>;
  userById: User;
  userList: PagedUsers;
  ruleById: Rule;
  rulesList: PagedRules;
  ammoById: Ammo;
  ammoList: PagedAmmo;
  weaponById: Weapon;
  weaponsList: PagedWeapons;
  hackingDeviceById: HackingDevice;
  hackingDevicesList: PagedHackingDevices;
  hackingProgramById: HackingProgram;
  hackingProgramsList: PagedHackingPrograms;
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
};

export type UserRequest = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

export type UserRole =
  | 'USER'
  | 'USER_ADMIN'
  | 'CONTENT_MANAGER'
  | 'CONTENT_PUBLISHER';

export type UserSearch = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
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

export const UserInfoFragmentDoc = `
    fragment UserInfo on User {
  id
  username
  email
  roles
}
    `;
export const LoginDocument = `
    mutation login($request: LoginRequest!) {
  login(request: $request) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useLoginMutation = <
      TError = unknown,
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
      TError = unknown,
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
      TError = unknown
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
      TError = unknown,
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
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) => 
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
      options
    );