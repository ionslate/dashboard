import { useState } from 'react';
import { memo } from 'react';
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import Badge from '../../components/Badge';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import { classes } from '../../utils';
import { User } from '../../__generated__';
import UserModal from './UserModal';

interface UserRowProps {
  user: User;
}

export default memo(function UserRow({ user }: UserRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <UserModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
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
              menuProps={{ className: 'w-48' }}
            >
              <DropdownItem
                icon={MdEdit}
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </DropdownItem>
              <DropdownItem icon={user.active ? BiUserX : BiUserCheck}>
                {user.active ? 'Disable' : 'Enable'}
              </DropdownItem>
              <DropdownItem icon={BiUserMinus}>Force Logout</DropdownItem>
              <hr className="my-1" />
              <div>
                <DropdownItem icon={FaRegTrashAlt} color="red">
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
