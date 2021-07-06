import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { DataError, gqlRequest } from '../../utils';
import {
  AuditListDocument,
  AuditListQuery,
  AuditListQueryVariables,
} from '../../__generated__';

const QUERY_PREFIX = 'infiniteAuditList';

export const useAuditListInfiniteQuery = (
  variables?: AuditListQueryVariables,
  options?: UseInfiniteQueryOptions<AuditListQuery, DataError, AuditListQuery>,
) =>
  useInfiniteQuery<AuditListQuery, DataError, AuditListQuery>(
    [QUERY_PREFIX, variables],
    ({ pageParam = 0 }) =>
      gqlRequest(AuditListDocument, { page: pageParam, ...variables }),
    options,
  );

useAuditListInfiniteQuery.getKey = (variables?: AuditListQueryVariables) => [
  QUERY_PREFIX,
  variables,
];

useAuditListInfiniteQuery.queryPrefix = QUERY_PREFIX;
