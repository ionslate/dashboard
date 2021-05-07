import { classes } from '../../utils/classes';
import { forwardRef, Ref, useRef } from 'react';
import { mergeRefs } from '../../utils/mergeRefs';
import { useRipple } from 'react-use-ripple';

const variantColorMap = {
  solid: {
    green:
      'bg-green-500 hover:bg-green-400 text-white font-bold rounded focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-green-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
    pink:
      'bg-pink-500 hover:bg-pink-400 text-white font-bold rounded focus:ring-purple-500 focus:ring-offset-purple-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-pink-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
    gray:
      'bg-gray-500 hover:bg-gray-400 text-white font-bold rounded focus:ring-blue-500 focus:ring-offset-blue-300 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:italic disabled:hover:bg-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-normal',
  },
  outline: {
    green:
      'bg-transparent border-2 border-green-300 hover:bg-green-300 hover:bg-opacity-40 text-green-300 font-bold rounded focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:italic disabled:hover:bg-transparent disabled:text-green-400 disabled:border-green-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
    pink:
      'bg-transparent border-2 border-pink-400 hover:bg-pink-400 hover:bg-opacity-40 text-pink-400 font-bold rounded focus:ring-purple-500 focus:ring-offset-purple-300 disabled:italic disabled:hover:bg-transparent disabled:text-pink-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
    gray:
      'bg-transparent border-2 border-gray-400 hover:bg-gray-400 hover:bg-opacity-40 text-gray-400 font-bold rounded focus:ring-blue-500 focus:ring-offset-blue-300 disabled:italic disabled:hover:bg-transparent disabled:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:font-normal',
  },
  open: {
    green:
      'bg-transparent hover:bg-green-300 hover:bg-opacity-20 text-green-300 font-bold rounded focus:ring-indigo-500 focus:ring-offset-indigo-300 disabled:italic disabled:hover:bg-transparent disabled:text-green-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
    pink:
      'bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-pink-400 font-bold rounded focus:ring-purple-500 focus:ring-offset-purple-300 disabled:italic disabled:hover:bg-transparent disabled:text-pink-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
    gray:
      'bg-transparent hover:bg-gray-400 hover:bg-opacity-20 text-gray-400 font-bold rounded focus:ring-blue-500 focus:ring-offset-blue-300 disabled:italic disabled:hover:bg-transparent disabled:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:font-normal',
  },
} as const;

const sizeMap = {
  sm: 'text-sm py-1 px-2 min-w-[80px] ',
  normal: 'text-base py-2 px-4 min-w-[100px] ',
  lg: 'text-lg py-2 px-4 tracking-wider min-w-[120px] ',
} as const;

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'solid' | 'outline' | 'open';
  color?: 'green' | 'pink' | 'gray';
  disabled?: boolean;
  size?: 'sm' | 'normal' | 'lg';
}

export default forwardRef(function Button(
  {
    variant = 'solid',
    color = 'gray',
    size = 'normal',
    className,
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
        sizeMap[size],
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
});
