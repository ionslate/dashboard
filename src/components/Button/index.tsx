import { classes } from '../../utils/classes';
import { forwardRef, Ref, useRef } from 'react';
import { mergeRefs } from '../../utils/mergeRefs';
import { useRipple } from 'react-use-ripple';
import { IconType, IconContext } from 'react-icons';

const variantColorMap = {
  solid: {
    green:
      'bg-green-500 hover:bg-green-400 text-white font-bold focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-green-500 disabled:text-gray-400',
    pink:
      'bg-pink-500 hover:bg-pink-400 text-white font-bold focus:ring-purple-500 focus:ring-offset-purple-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-pink-500 disabled:text-gray-400',
    gray:
      'bg-gray-500 hover:bg-gray-400 text-white font-bold focus:ring-blue-500 focus:ring-offset-blue-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-gray-500 disabled:text-gray-400',
    red:
      'bg-red-500 hover:bg-red-400 text-white font-bold focus:ring-yellow-500 focus:ring-offset-yellow-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-red-500 disabled:text-gray-400',
  },
  outline: {
    green:
      'bg-transparent border-2 border-green-300 hover:bg-green-300 hover:bg-opacity-40 text-green-300 font-bold focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:italic disabled:hover:bg-transparent disabled:text-green-400 disabled:border-green-400 disabled:opacity-40',
    pink:
      'bg-transparent border-2 border-pink-400 hover:bg-pink-400 hover:bg-opacity-40 text-pink-400 font-bold focus:ring-purple-500 focus:ring-offset-purple-300 disabled:italic disabled:hover:bg-transparent disabled:text-pink-400 disabled:opacity-40',
    gray:
      'bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:bg-opacity-40 text-gray-400 font-bold focus:ring-blue-500 focus:ring-offset-blue-300 disabled:italic disabled:hover:bg-transparent disabled:text-gray-400 disabled:opacity-40',
    red:
      'bg-transparent border-2 border-red-400 hover:bg-red-400 hover:bg-opacity-40 text-red-400 font-bold focus:ring-yellow-500 focus:ring-offset-yellow-300 disabled:italic disabled:hover:bg-transparent disabled:text-red-400 disabled:opacity-40',
  },
  open: {
    green:
      'bg-transparent hover:bg-green-300 hover:bg-opacity-20 text-green-300 font-bold focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:italic disabled:hover:bg-transparent disabled:text-green-300 disabled:opacity-60',
    pink:
      'bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-pink-400 font-bold focus:ring-purple-500 focus:ring-offset-purple-300 disabled:italic disabled:hover:bg-transparent disabled:text-pink-400 disabled:opacity-60',
    gray:
      'bg-transparent hover:bg-gray-400 hover:bg-opacity-20 text-gray-400 font-bold focus:ring-blue-500 focus:ring-offset-blue-300 disabled:italic disabled:hover:bg-transparent disabled:text-gray-400 disabled:opacity-60',
    red:
      'bg-transparent hover:bg-red-400 hover:bg-opacity-20 text-red-400 font-bold focus:ring-yellow-500 focus:ring-offset-yellow-300 disabled:italic disabled:hover:bg-transparent disabled:text-red-400 disabled:opacity-60',
  },
} as const;

const heightMap = {
  sm: 'h-7',
  normal: 'h-10',
  lg: 'h-11',
} as const;

const iconSizeMap = {
  sm: '1rem',
  normal: '1.25rem',
  lg: '1.75rem',
};

const widthMap = {
  icon: {
    sm: 'w-7',
    normal: 'w-10',
    lg: 'w-11',
  },
  noIcon: {
    sm: 'min-w-[60px]',
    normal: 'min-w-[100px]',
    lg: 'min-w-[120px]',
  },
};

const textSizeMap = {
  sm: 'text-sm',
  normal: 'text-base',
  lg: 'text-lg tracking-wider',
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
  fullWidth?: boolean;
}

export default forwardRef(function Button(
  {
    variant = 'solid',
    color = 'gray',
    size = 'normal',
    icon: IconComponent,
    iconPosition = 'left',
    fullWidth,
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
        textSizeMap[size],
        heightMap[size],
        fullWidth
          ? 'w-full'
          : widthMap[IconComponent && !children ? 'icon' : 'noIcon'][size],
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'flex items-center justify-center',
        'disabled:cursor-not-allowed disabled:font-normal',
        iconPosition === 'right' && 'flex-row-reverse',
        IconComponent && !children && !fullWidth ? 'rounded-full' : 'rounded',
        (IconComponent && !children) || 'px-2',
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
            fullWidth || 'flex-1',
            !IconComponent && 'flex items-center justify-center',
          )}
        >
          {children}
        </span>
      )}
    </button>
  );
});
