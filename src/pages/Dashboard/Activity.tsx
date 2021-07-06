import { useMemo } from 'react';
import { queryErrorHandler } from '../../utils/queryErrorHandler';
import { useAuditListInfiniteQuery } from './useAuditListInfiniteQuery';
import { Virtuoso } from 'react-virtuoso';
import Loader from '../../components/Loader';
import ActivityCard from './ActivityCard';

const PAGE_LIMIT = 25;

export default function Activity() {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAuditListInfiniteQuery(
    { limit: PAGE_LIMIT },
    {
      getNextPageParam: ({ auditList }) =>
        auditList.last ? undefined : auditList.page + 1,
      onError: queryErrorHandler,
    },
  );

  const activities = useMemo(
    () => data?.pages.flatMap((page) => page.auditList.content) || [],
    [data?.pages],
  );

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl  font-bold mb-2 text-gray-400">Activity</h2>
      <Virtuoso
        className="flex-1 bg-gray-700 bg-opacity-40 rounded-md overflow-x-hidden"
        data={activities}
        endReached={hasNextPage ? () => fetchNextPage() : undefined}
        overscan={200}
        itemContent={(_, activity) => <ActivityCard activity={activity} />}
        components={{
          Footer: () => (
            <Loader active={isLoading || isFetchingNextPage} size="lg" />
          ),
        }}
      />
    </div>
  );
}
