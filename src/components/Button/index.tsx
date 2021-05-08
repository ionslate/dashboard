import { classes } from '../../utils/classes';
import { forwardRef, Ref, useRef } from 'react';
import { mergeRefs } from '../../utils/mergeRefs';
import { useRipple } from 'react-use-ripple';
import { IconType, IconContext } from 'react-icons';

const variantColorMap = {
  solid: {
    green:
      'bg-green-500 hover:bg-green-400 text-white font-bold focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-green-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
    pink:
      'bg-pink-500 hover:bg-pink-400 text-white font-bold focus:ring-purple-500 focus:ring-offset-purple-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-pink-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
    gray:
      'bg-gray-500 hover:bg-gray-400 text-white font-bold focus:ring-blue-500 focus:ring-offset-blue-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
    red:
      'bg-red-500 hover:bg-red-400 text-white font-bold focus:ring-yellow-500 focus:ring-offset-yellow-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-red-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
  },
  outline: {
    green:
      'bg-transparent border-2 border-green-300 hover:bg-green-300 hover:bg-opacity-40 text-green-300 font-bold focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:italic disabled:hover:bg-transparent disabled:text-green-400 disabled:border-green-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
    pink:
      'bg-transparent border-2 border-pink-400 hover:bg-pink-400 hover:bg-opacity-40 text-pink-400 font-bold focus:ring-purple-500 focus:ring-offset-purple-300 disabled:italic disabled:hover:bg-transparent disabled:text-pink-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
    gray:
      'bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:bg-opacity-40 text-gray-400 font-bold focus:ring-blue-500 focus:ring-offset-blue-300 disabled:italic disabled:hover:bg-transparent disabled:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
    red:
      'bg-transparent border-2 border-red-400 hover:bg-red-400 hover:bg-opacity-40 text-red-400 font-bold focus:ring-yellow-500 focus:ring-offset-yellow-300 disabled:italic disabled:hover:bg-transparent disabled:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
  },
  open: {
    green:
      'bg-transparent hover:bg-green-300 hover:bg-opacity-20 text-green-300 font-bold focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:italic disabled:hover:bg-transparent disabled:text-green-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
    pink:
      'bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-pink-400 font-bold focus:ring-purple-500 focus:ring-offset-purple-300 disabled:italic disabled:hover:bg-transparent disabled:text-pink-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
    gray:
      'bg-transparent hover:bg-gray-400 hover:bg-opacity-20 text-gray-400 font-bold focus:ring-blue-500 focus:ring-offset-blue-300 disabled:italic disabled:hover:bg-transparent disabled:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
    red:
      'bg-transparent hover:bg-red-400 hover:bg-opacity-20 text-red-400 font-bold focus:ring-yellow-500 focus:ring-offset-yellow-300 disabled:italic disabled:hover:bg-transparent disabled:text-red-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
  },
} as const;

const sizeMap = {
  icon: {
    sm: 'text-sm h-7 w-7 rounded-full',
    normal: 'text-base h-10 w-10 rounded-full',
    lg: 'text-lg h-11 w-11 rounded-full',
  },
  noIcon: {
    sm: 'text-sm h-7 px-2 min-w-[60px] rounded',
    normal: 'text-base h-10 px-2 min-w-[100px] rounded',
    lg: 'text-lg h-11 px-2 tracking-wider min-w-[120px] rounded',
  },
} as const;

const iconSizeMap = {
  sm: '1rem',
  normal: '1.25rem',
  lg: '1.75rem',
};

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'solid' | 'outline' | 'open';
  color?: 'green' | 'pink' | 'gray' | 'red';
  disabled?: boolean;
  size?: 'sm' | 'normal' | 'lg';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
}

export default forwardRef(function Button(
  {
    variant = 'solid',
    color = 'gray',
    size = 'normal',
    icon: IconComponent,
    iconPosition = 'left',
    className,
    children,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLElement>,
) {
  const inputRef = useRef<HTMLButtonElement>(null);
  useRipple(inputRef);

  return (
    <button
      ref={mergeRefs(ref, inputRef)}
      className={classes(
        variantColorMap[variant]?.[color],
        sizeMap[IconComponent && !children ? 'icon' : 'noIcon'][size],
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'flex items-center justify-center',
        iconPosition === 'right' && 'flex-row-reverse',
        className,
      )}
      {...props}
    >
      {IconComponent && (
        <IconContext.Provider
          value={{
            className: classes(
              children && iconPosition === 'left' && 'mr-2',
              children && iconPosition === 'right' && 'ml-2',
            ),
            size: iconSizeMap[size],
          }}
        >
          <IconComponent />
        </IconContext.Provider>
      )}
      {children && (
        <span
          className={classes(
            'flex-1',
            !IconComponent && 'flex items-center justify-center',
          )}
        >
          {children}
        </span>
      )}
    </button>
  );
});
