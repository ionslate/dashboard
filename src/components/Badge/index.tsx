import { CSSProperties } from 'react';
import { classes } from '../../utils';

export interface BadgeProps {
  children: string;
  color?: 'red' | 'green' | 'pink' | 'purple' | 'gray' | 'blue' | 'indigo';
  style?: CSSProperties;
  variant?: 'solid' | 'outline';
  className?: string;
}

const badgeColorMap = {
  solid: {
    red: 'border-red-500 bg-red-500 text-red-50',
    green: 'border-green-500 bg-green-500 text-green-50',
    pink: 'border-pink-500 bg-pink-500 text-pink-50',
    purple: 'border-purple-500 bg-purple-500 text-purple-50',
    gray: 'border-gray-500 bg-gray-500 text-gray-50',
    blue: 'border-blue-500 bg-blue-500 text-blue-50',
    indigo: 'border-indigo-500 bg-indigo-500 text-indigo-50',
  },
  outline: {
    red: 'border-red-500 text-red-500',
    green: 'border-green-500 text-green-500',
    pink: 'border-pink-500 text-pink-500',
    purple: 'border-purple-500 text-purple-500',
    gray: 'border-gray-500 text-gray-500',
    blue: 'border-blue-500 text-blue-500',
    indigo: 'border-indigo-500 text-indigo-500',
  },
} as const;

export default function Badge({
  children,
  color = 'gray',
  variant = 'solid',
  style,
  className,
}: BadgeProps) {
  return (
    <div
      style={style}
      className={classes(
        'text-xs py-[2px] px-2 inline-block min-w-[70px] rounded-full uppercase text-center font-bold border-2',
        badgeColorMap[variant][color],
        className,
      )}
    >
      {children}
    </div>
  );
}
