import { useState } from 'react';
import { memo } from 'react';
import {
  BiUserCheck,
  BiUserMinus,
  BiUserX,
  BiTrash,
  BiEdit,
} from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import { useQueryClient } from 'react-query';
import Badge from '../../components/Badge';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import SidePanel from '../../components/SidePanel';
import { classes } from '../../utils';
import { useAppSelector } from '../../utils/reduxHooks';
import {
  useEnableUserMutation,
  User,
  useUpdateUserMutation,
} from '../../__generated__';
import { ConfirmDisableUser } from './ConfirmDisableUser';
import { ConfirmForceLogoutUser } from './confirmForceLogoutUser';
import { ConfirmRemoveUser } from './ConfirmRemoveUser';
import UserForm from './UserForm';
import { useUserListInfiniteQuery } from './useUserListInfiniteQuery';

interface UserRowProps {
  user: User;
}

export default memo(function UserRow({ user }: UserRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isForceLogoutModalOpen, setIsForceLogoutModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);

  const userSearch = useAppSelector((state) => state.userSearch);

  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    error,
    reset,
    isLoading: isUpdateUserLoading,
  } = useUpdateUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
      setIsEditModalOpen(false);
    },
  });
  const { mutate: enableUser } = useEnableUserMutation({
    onSuccess: () => {
      queryClient.refetchQueries(
        useUserListInfiniteQuery.getKey({ search: userSearch }),
      );
    },
  });

  return (
    <>
      <SidePanel
        title="Edit User"
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <UserForm
          user={user}
          onSubmit={(request, logUserOut) => {
            updateUser({
              userId: user.id,
              request,
              logUserOut: logUserOut || !!request.password,
            });
          }}
          validationError={error?.validationError}
          resetApiError={reset}
          loading={isUpdateUserLoading}
        />
      </SidePanel>
      <ConfirmDisableUser
        open={isDisableModalOpen}
        onClose={() => setIsDisableModalOpen(false)}
        userId={user.id}
        username={user.username}
      />
      <ConfirmForceLogoutUser
        open={isForceLogoutModalOpen}
        onClose={() => setIsForceLogoutModalOpen(false)}
        userId={user.id}
        username={user.username}
      />
      <ConfirmRemoveUser
        open={isRemoveUserModalOpen}
        onClose={() => setIsRemoveUserModalOpen(false)}
        userId={user.id}
        username={user.username}
      />
      <div className="px-4">
        <div className="grid grid-cols-12 gap-1 items-center border-b-2 border-gray-500 py-4">
          <div className="col-span-7 flex items-center">
            <div>
              <div>{user.username}</div>
              <div className={classes('text-xs')}>{user.email}</div>
            </div>
            {!user.active && (
              <Badge color="red" variant="outline" className="ml-4">
                Disabled
              </Badge>
            )}
          </div>
          <div className="col-span-4 text-xs">
            {user.roles.sort().map((role) => (
              <Badge className="mr-2 my-2" color="blue" key={role}>
                {role.split('_').join(' ').toLowerCase()}
              </Badge>
            ))}
          </div>
          <div className="flex justify-end col-span-1">
            <Dropdown
              icon={FiMoreVertical}
              placement="bottom-end"
              variant="open"
              menuProps={{ className: 'w-48' }}
            >
              <DropdownItem
                icon={BiEdit}
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                icon={user.active ? BiUserX : BiUserCheck}
                onClick={() => {
                  if (user.active) {
                    setIsDisableModalOpen(true);
                  } else {
                    enableUser({ userId: user.id });
                  }
                }}
              >
                {user.active ? 'Disable' : 'Enable'}
              </DropdownItem>
              <DropdownItem
                icon={BiUserMinus}
                onClick={() => setIsForceLogoutModalOpen(true)}
              >
                Force Logout
              </DropdownItem>
              <hr className="my-1" />
              <div>
                <DropdownItem
                  icon={BiTrash}
                  color="red"
                  onClick={() => setIsRemoveUserModalOpen(true)}
                >
                  Delete
                </DropdownItem>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
});
