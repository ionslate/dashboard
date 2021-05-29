import { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiChevronDown, FiPower } from 'react-icons/fi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { useQueryClient } from 'react-query';
import {
  useLogoutMutation,
  User,
  UserQuery,
  useUserQuery,
} from '../../__generated__';
import Dropdown, { DropdownItem } from '../Dropdown';
import ConfirmModal from '../Modal/ConfirmModal';
import ChangePasswordModal from './ChangePasswordModal';

export default function UserMenu({ user }: { user?: User | null }) {
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLogoutLoading } = useLogoutMutation({
    onSuccess: () => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: null,
      });
      queryClient.clear();
    },
  });

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(
    false,
  );
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] = useState(
    false,
  );

  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <div className=" border-r-2 border-gray-500 mr-4" />
      <Dropdown
        icon={FiChevronDown}
        iconPosition="right"
        variant="open"
        placement="bottom-end"
        buttonText={
          <div className="flex justify-between items-center mr-4">
            <IconContext.Provider value={{ className: 'mr-4 w-5 h-5' }}>
              <FaRegUserCircle />
            </IconContext.Provider>
            <span>{user.username}</span>
          </div>
        }
        menuProps={{ className: 'w-48' }}
      >
        <DropdownItem
          icon={RiUserSettingsLine}
          onClick={() => setIsChangePasswordModalOpen(true)}
        >
          Change Password
        </DropdownItem>
        <DropdownItem
          color="red"
          icon={FiPower}
          onClick={() => setIsConfirmLogoutModalOpen(true)}
        >
          Logout
        </DropdownItem>
      </Dropdown>
      <ChangePasswordModal
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
      <ConfirmModal
        open={isConfirmLogoutModalOpen}
        onClose={() => setIsConfirmLogoutModalOpen(false)}
        onConfirm={() => logout({})}
        confirmColor="pink"
        confirmText="Yes, Logout"
        title="Logout?"
        description="Are you sure you want to logout?"
        loading={isLogoutLoading}
      />
    </div>
  );
}
