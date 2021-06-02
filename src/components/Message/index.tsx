import { classes } from '../../utils';
import { CSSProperties, PropsWithChildren } from 'react';
import { IconContext } from 'react-icons';
import {
  BiError,
  BiErrorCircle,
  BiCheckCircle,
  BiInfoCircle,
} from 'react-icons/bi';

const colorMap = {
  info: 'bg-blue-500 text-blue-100',
  success: 'bg-green-700 text-green-200',
  warn: 'bg-yellow-500 text-yellow-50',
  error: 'bg-red-700 text-red-200',
} as const;

const iconMap = {
  info: BiInfoCircle,
  success: BiCheckCircle,
  warn: BiError,
  error: BiErrorCircle,
} as const;

export interface MessageProps {
  type?: 'info' | 'success' | 'warn' | 'error';
  className?: string;
  style?: CSSProperties;
  active?: boolean;
}

export default function Message({
  type = 'info',
  style,
  className,
  active = true,
  children,
}: PropsWithChildren<MessageProps>) {
  const IconComponent = iconMap[type];

  if (!active) {
    return null;
  }

  return (
    <div
      role="alert"
      style={style}
      className={classes(
        'p-4 rounded shadow bg-opacity-60 w-full flex items-center italic',
        colorMap[type],
        className,
      )}
    >
      <IconContext.Provider value={{ className: 'mr-2', size: '1.5rem' }}>
        <IconComponent />
      </IconContext.Provider>
      <p className=" flex-1">{children}</p>
    </div>
  );
}
