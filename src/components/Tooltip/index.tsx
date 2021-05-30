import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { classes } from '../../utils';

export interface TooltipProps<T> {
  placement?: TippyProps['placement'];
  disabled?: boolean;
  tip: string;
  children: React.ReactElement<T>;
}

export default function Tooltip<T>({
  disabled,
  children,
  tip,
  placement = 'top-start',
}: TooltipProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onHide: TippyProps['onHide'] = ({ unmount }) => {
    setIsOpen(false);
    timeoutRef.current = setTimeout(unmount, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });

  return (
    <Tippy
      disabled={disabled}
      onMount={() => setIsOpen(true)}
      onHide={onHide}
      animation
      offset={[0, 4]}
      placement={placement}
      render={(attrs) => (
        <div
          role="alert"
          className={classes(
            'z-10 bg-[#08101A] rounded p-2 text-gray-200 text-sm transition transform duration-100 shadow-md',
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
          )}
          {...attrs}
        >
          {tip}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}
