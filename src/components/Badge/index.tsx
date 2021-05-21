import { CSSProperties } from 'react';
import { classes } from '../../utils';

export interface BadgeProps {
  children: string;
  color?: 'red' | 'green' | 'pink' | 'purple' | 'gray' | 'blue' | 'indigo';
  style?: CSSProperties;
  className?: string;
}

const badgeColorMap = {
  red: 'bg-red-500 text-red-50',
  green: 'bg-green-500 text-green-50',
  pink: 'bg-pink-500 text-pink-50',
  purple: 'bg-purple-500 text-purple-50',
  gray: 'bg-gray-500 text-gray-50',
  blue: 'bg-blue-500 text-blue-50',
  indigo: 'bg-indigo-500 text-indigo-50',
} as const;

export default function Badge({
  children,
  color = 'gray',
  style,
  className,
}: BadgeProps) {
  return (
    <div
      style={style}
      className={classes(
        'text-xs py-1 px-2 inline-block min-w-[50px] rounded-full capitalize text-center',
        badgeColorMap[color],
        className,
      )}
    >
      {children}
    </div>
  );
}
