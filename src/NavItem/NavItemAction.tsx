import { useRef } from 'react';
import { IconContext } from 'react-icons';
import { IconType } from 'react-icons/lib';
import { useRipple } from 'react-use-ripple';
import { classes } from '../utils';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  negative?: boolean;
  icon?: IconType;
}

export default function NavItemAction({
  negative,
  className,
  icon: IconComponent,
  children,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useRipple(buttonRef);

  return (
    <button
      ref={buttonRef}
      className={classes(
        'w-full py-2 px-4 my-2 rounded flex text-gray-500',
        'bg-transparent hover:bg-gray-700 hover:bg-opacity-70',
        'focus:outline-none focus:ring-2 focus:ring-gray-200',
        className,
      )}
    >
      {IconComponent && (
        <IconContext.Provider
          value={{
            className: classes(
              'w-6 h-6 mr-4',
              negative ? 'text-red-300' : 'text-green-300',
            ),
          }}
        >
          <IconComponent />
        </IconContext.Provider>
      )}
      <span className="flex-1 text-lg text-left">{children}</span>
    </button>
  );
}
