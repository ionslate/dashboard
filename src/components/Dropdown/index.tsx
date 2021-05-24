import { Menu, Transition } from '@headlessui/react';
import {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  Fragment,
  PropsWithChildren,
  useState,
} from 'react';
import { IconContext, IconType } from 'react-icons';
import { usePopper } from 'react-popper';
import { classes } from '../../utils';
import Button from '../Button';

export interface DropdownProps {
  variant?: 'solid' | 'outline' | 'open';
  color?: 'green' | 'pink' | 'gray' | 'red';
  disabled?: boolean;
  size?: 'sm' | 'normal' | 'lg';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  buttonText?: string;
  className?: string;
  style?: CSSProperties;
  menuProps?: {
    className?: string;
    style?: CSSProperties;
  };
}

export default function Dropdown({
  variant,
  color,
  disabled,
  size,
  icon,
  iconPosition,
  buttonText,
  className,
  style,
  menuProps,
  children,
}: PropsWithChildren<DropdownProps>) {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
        },
      },
      {
        name: 'flip',
        options: {
          allowedAutoPlacements: ['bottom-end'],
          fallbackPlacements: ['bottom-end', 'top-end'],
          altBoundary: true,
          padding: 120,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  return (
    <Menu
      as="div"
      className={classes('relative inline-block text-left', className)}
      style={style}
    >
      {({ open }) => (
        <>
          <Menu.Button
            as={Button}
            variant={variant}
            color={color}
            disabled={disabled}
            size={size}
            icon={icon}
            iconPosition={iconPosition}
            // ref={setReferenceElement}
          >
            {buttonText}
          </Menu.Button>
          <div
            ref={setPopperElement}
            // style={{ ...styles.popper, ...menuProps?.style }}
            // {...attributes.popper}
            className={classes('z-30', menuProps?.className)}
          >
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              show={open}
            >
              <Menu.Items
                static
                className="overflow-auto py-1 text-base bg-gray-700 rounded-sm shadow-lg max-h-60 ring-2 ring-green-200 focus:outline-none"
              >
                {children}
              </Menu.Items>
            </Transition>
          </div>
        </>
      )}
    </Menu>
  );
}

const dropdownItemColorMap = {
  green: 'text-green-500',
  red: 'text-red-500',
  gray: 'text-gray-100',
  pink: 'text-pink-500',
} as const;

interface DropdownItemProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disabled?: boolean;
  icon?: IconType;
  color?: 'green' | 'red' | 'pink' | 'gray';
}

export function DropdownItem({
  disabled,
  icon: IconComponent,
  color = 'gray',
  className,
  children,
  ...props
}: PropsWithChildren<DropdownItemProps>) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <button
          disabled={disabled}
          className={classes(
            dropdownItemColorMap[color],
            active && 'bg-gray-600',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            'select-none relative py-2 px-4 group flex items-center w-full disabled:text-gray-400 disabled:italic text-sm',
            'focus:outline-none',
            className,
          )}
          {...props}
        >
          {IconComponent ? (
            <IconContext.Provider value={{ className: 'w-5 h-5 mr-4' }}>
              <IconComponent aria-hidden="true" />
            </IconContext.Provider>
          ) : (
            <span className="w-5 h-5 mr-4" />
          )}
          <div className="flex-1 text-left">{children}</div>
        </button>
      )}
    </Menu.Item>
  );
}
