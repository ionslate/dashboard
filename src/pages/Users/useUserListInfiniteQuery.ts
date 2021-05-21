import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { DataError, gqlRequest } from '../../utils';
import {
  UserListDocument,
  UserListQuery,
  UserListQueryVariables,
} from '../../__generated__';

export const useUserListInfiniteQuery = (
  variables?: UserListQueryVariables,
  options?: UseInfiniteQueryOptions<UserListQuery, DataError, UserListQuery>,
) =>
  useInfiniteQuery<UserListQuery, DataError, UserListQuery>(
    ['infiniteUserList', variables],
    ({ pageParam = 0 }) =>
      gqlRequest(UserListDocument, { page: pageParam, ...variables }),
    options,
  );

useUserListInfiniteQuery.getKey = (variables?: UserListQueryVariables) => [
  'infiniteUserList',
  variables,
];
