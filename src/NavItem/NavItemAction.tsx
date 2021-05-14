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
  color?: 'gray' | 'red' | 'green' | 'pink';
  icon?: IconType;
}

const iconColorMap = {
  gray: 'text-gray-500',
  red: 'text-red-300',

  green: 'text-green-300',
  pink: 'text-pink-400',
} as const;

export default function NavItemAction({
  color = 'gray',
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
            className: classes('w-6 h-6 mr-4', iconColorMap[color]),
          }}
        >
          <IconComponent />
        </IconContext.Provider>
      )}
      <span className="flex-1 text-lg text-left">{children}</span>
    </button>
  );
}
