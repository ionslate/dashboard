import { CSSProperties } from 'react';
import { classes } from '../../utils';

const sizeMap = {
  sm: 'h-10',
  normal: 'h-11',
  lg: 'h-20',
} as const;

const spinnerSizeMap = {
  sm: 'w-7 h-7 border-4',
  normal: 'w-8 h-8 border-4',
  lg: 'w-14 h-14 border-8',
};

export interface LoaderProps {
  active?: boolean;
  size?: 'sm' | 'normal' | 'lg';
  className?: string;
  style?: CSSProperties;
}

export default function Loader({
  active = true,
  size = 'normal',
  className,
  style,
}: LoaderProps) {
  if (!active) {
    return null;
  }

  return (
    <div
      className={classes(
        sizeMap[size],
        'flex justify-center items-center w-full my-4',
        className,
      )}
      style={style}
    >
      <div
        className={classes(
          spinnerSizeMap[size],
          'animate-spin opacity-70 border-l-gray-600 border-t-gray-600 border-b-gray-600 border-r-gray-300 rounded-full',
        )}
      />
    </div>
  );
}
