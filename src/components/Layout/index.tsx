import { PropsWithChildren } from 'react';
import { GiAmmoBox } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import {
  RiAddCircleLine,
  RiCpuLine,
  RiFileList3Line,
  RiFileUserLine,
  RiFolderUserLine,
  RiGroupFill,
  RiImage2Fill,
  RiSwordLine,
} from 'react-icons/ri';
import { VscHome } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import NavItem from '../../NavItem';
import NavGroupLabel from '../../NavItem/NavGroupLabel';
import NavItemAction from '../../NavItem/NavItemAction';
import { useAuth } from '../AuthProvider';
import UserMenu from './UserMenu';

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { hasRole, user } = useAuth();

  return (
    <div className="h-full flex">
      <div className="h-full overflow-y-scroll bg-gray-800 bg-opacity-75 w-80">
        <Link
          to="/"
          className="h-16 py-2 px-4 flex items-center bg-gray-700 sticky top-0 z-10"
        >
          <div className="w-10 h-10 mr-4 rounded-full bg-indigo-600"></div>
          <div>
            <span className="font-medium block text-gray-100 text-2xl leading-5">
              Ion Slate
            </span>
            <span className="text-indigo-400 text-lg leading-none">
              Dashboard
            </span>
          </div>
        </Link>
        <nav className="p-4">
          <NavItem to="/" icon={VscHome}>
            Dashboard
          </NavItem>
          {(hasRole('CONTENT_MANAGER') || hasRole('CONTENT_PUBLISHER')) && (
            <NavGroupLabel>Content</NavGroupLabel>
          )}
          {hasRole('CONTENT_MANAGER') && (
            <>
              <NavItem to="/content/armies" icon={RiGroupFill}>
                Armies
              </NavItem>
              <NavItem to="/content/entries" icon={RiFolderUserLine}>
                Entries
              </NavItem>
              <NavItem to="/content/units" icon={RiFileUserLine}>
                Units
              </NavItem>
              <NavItemAction icon={RiFileList3Line}>Rules</NavItemAction>
              <NavItem to="/content/weapons" icon={RiSwordLine}>
                Weapons
              </NavItem>
              <NavItemAction icon={GiAmmoBox}>Ammo</NavItemAction>
              <NavItem to="/content/hacking" icon={RiCpuLine}>
                Hacking
              </NavItem>
            </>
          )}
          {hasRole('CONTENT_PUBLISHER') && (
            <NavItemAction icon={RiAddCircleLine} color="green">
              Publish
            </NavItemAction>
          )}
          {hasRole('CONTENT_MANAGER') && (
            <>
              <NavGroupLabel>Files</NavGroupLabel>
              <NavItem to="/files/images" icon={RiImage2Fill}>
                Images
              </NavItem>
            </>
          )}
          {hasRole('USER_ADMIN') && (
            <>
              <NavGroupLabel>User Management</NavGroupLabel>
              <NavItem to="/users" icon={HiUserGroup}>
                Users
              </NavItem>
            </>
          )}
        </nav>
      </div>
      <div className="h-full flex flex-col flex-1">
        <div className="h-16 w-full bg-gray-700 bg-opacity-75 flex flex-row-reverse py-2 px-4 items-center">
          {/* <LogoutButton /> */}
          <UserMenu user={user} />
        </div>
        <div className="max-w-7xl flex-1 p-4 shadow-inner">{children}</div>
      </div>
    </div>
  );
}
