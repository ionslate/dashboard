import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { DataError, gqlRequest } from '../../utils';
import {
  UserListDocument,
  UserListQuery,
  UserListQueryVariables,
} from '../../__generated__';

const QUERY_PREFIX = 'infiniteUserList';

export const useUserListInfiniteQuery = (
  variables?: UserListQueryVariables,
  options?: UseInfiniteQueryOptions<UserListQuery, DataError, UserListQuery>,
) =>
  useInfiniteQuery<UserListQuery, DataError, UserListQuery>(
    [QUERY_PREFIX, variables],
    ({ pageParam = 0 }) =>
      gqlRequest(UserListDocument, { page: pageParam, ...variables }),
    options,
  );

useUserListInfiniteQuery.getKey = (variables?: UserListQueryVariables) => [
  QUERY_PREFIX,
  variables,
];

useUserListInfiniteQuery.queryPrefix = QUERY_PREFIX;
