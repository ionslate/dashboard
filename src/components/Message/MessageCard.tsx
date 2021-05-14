import { PropsWithChildren } from 'react';
import { IconContext, IconType } from 'react-icons';
import { classes } from '../../utils';

interface MessageCardProps {
  title: string;
  icon: IconType;
  negative?: boolean;
}

export default function MessageCard({
  title,
  icon: IconComponent,
  negative,
  children,
}: PropsWithChildren<MessageCardProps>) {
  return (
    <div
      className={classes(
        'flex items-center max-w-lg p-6 rounded-lg bg-opacity-40 shadow-lg',
        negative ? 'bg-red-900' : 'bg-indigo-900 ',
      )}
    >
      <IconContext.Provider
        value={{
          size: '5rem',
          className: classes(
            'mr-2',
            negative ? 'text-red-400' : 'text-indigo-400',
          ),
        }}
      >
        <IconComponent />
      </IconContext.Provider>
      <div>
        <span
          className={classes(
            'block text-4xl mb-1',
            negative ? 'text-red-200' : 'text-indigo-200',
          )}
        >
          {title}
        </span>
        <span
          className={classes(
            'block',
            negative ? 'text-red-200' : 'text-indigo-200',
          )}
        >
          {children}
        </span>
      </div>
    </div>
  );
}
