import debounce from 'lodash/debounce';
import { useState } from 'react';
import { VscSearchStop } from 'react-icons/vsc';
import { Virtuoso } from 'react-virtuoso';
import Button from '../../components/Button';
import MessageCard from '../../components/Message/MessageCard';
import { UserSearch } from '../../__generated__';
import UserModal from './UserModal';
import UserRow from './UserRow';
import { UserSearchFields } from './UserSearch';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

const PAGE_LIMIT = 25;

export function UsersPage() {
  const [userSearch, setUserSearch] = useState<UserSearch>({});
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserListInfiniteQuery(
    {
      limit: PAGE_LIMIT,
      search: userSearch,
    },
    {
      getNextPageParam: ({ userList }) =>
        userList.last ? undefined : userList.page + 1,
    },
  );

  const users = data?.pages.flatMap((page) => page.userList.content) || [];

  const handleSearch = debounce((userSearch: UserSearch) => {
    setUserSearch(userSearch);
  }, 300);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-400">Users</h2>
          <Button
            color="pink"
            className="w-32"
            onClick={() => setIsUserModalOpen(true)}
          >
            Create User
          </Button>
        </div>
        <div className="rounded-md flex-1 flex flex-col">
          <div className="p-4 bg-gray-700 bg-opacity-40 rounded-t-md">
            <UserSearchFields onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-12 gap-1 px-4 pb-2 bottom-box-shadow bg-gray-700 bg-opacity-40">
            <span className="col-span-7 uppercase font-bold text-sm text-gray-300">
              user
            </span>
            <span className="col-span-4 uppercase font-bold text-sm text-gray-300">
              roles
            </span>
            <span />
          </div>
          {users.length || isLoading ? (
            <Virtuoso
              className="flex-1 bg-gray-700 bg-opacity-30 rounded-b-md overflow-x-hidden"
              data={users}
              endReached={hasNextPage ? () => fetchNextPage() : undefined}
              overscan={200}
              itemContent={(_, user) => <UserRow user={user} />}
              components={{
                Footer: () => {
                  return isLoading || isFetchingNextPage ? (
                    <div className="p-4 flex justify-center">Loading...</div>
                  ) : (
                    <div className="pb-4" />
                  );
                },
              }}
            />
          ) : (
            <div className="flex-1 bg-gray-700 bg-opacity-30 rounded-b-md flex items-center justify-center">
              <MessageCard title="No Users Found" icon={VscSearchStop}>
                No users match that search criteria
              </MessageCard>
            </div>
          )}
        </div>
      </div>
      <UserModal
        open={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </>
  );
}
