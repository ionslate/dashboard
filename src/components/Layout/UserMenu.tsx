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

export default function UserMenu({ user }: { user?: User | null }) {
  const queryClient = useQueryClient();

  const { mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      queryClient.setQueryData<UserQuery>(useUserQuery.getKey({}), {
        user: null,
      });
      queryClient.clear();
    },
  });

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
        <DropdownItem icon={RiUserSettingsLine}>Change Password</DropdownItem>
        <DropdownItem color="red" icon={FiPower} onClick={() => logout({})}>
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
