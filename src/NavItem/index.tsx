import { PropsWithChildren, useRef } from 'react';
import { IconType } from 'react-icons';
import { IconContext } from 'react-icons/lib';
import { Link, useLocation } from 'react-router-dom';
import { useRipple } from 'react-use-ripple';
import { classes } from '../utils';

export interface NavItemProps {
  to: string;
  icon?: IconType;
}

export default function NavItem({
  to,
  icon: IconComponent,
  children,
}: PropsWithChildren<NavItemProps>) {
  const location = useLocation();

  const active =
    (location.pathname === '/' && to === '/') ||
    (to !== '/' && location.pathname.startsWith(to));

  const linkRef = useRef<HTMLAnchorElement>(null);
  useRipple(linkRef, { disabled: active });

  return (
    <Link
      ref={linkRef}
      to={to}
      className={classes(
        'w-full py-2 px-4 my-2 rounded flex text-gray-500',
        active
          ? 'bg-gray-300'
          : 'bg-transparent hover:bg-gray-700 hover:bg-opacity-70',
        'focus:outline-none focus:ring-2 focus:ring-gray-200',
      )}
    >
      {IconComponent && (
        <IconContext.Provider value={{ className: 'w-6 h-6 mr-4' }}>
          <IconComponent />
        </IconContext.Provider>
      )}
      <span className="flex-1 text-lg">{children}</span>
    </Link>
  );
}
