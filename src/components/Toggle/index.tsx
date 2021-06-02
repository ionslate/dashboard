import { Switch } from '@headlessui/react';
import { CSSProperties } from 'react';
import { classes } from '../../utils';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export default function Toggle({
  label,
  className,
  style,
  disabled,
  checked = false,
  onChange = function () {},
}: CheckboxProps) {
  return (
    <div className={classes('flex items-center', className)} style={style}>
      <Switch.Group>
        <Switch
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className={classes(
            disabled ? 'bg-gray-800' : checked ? 'bg-[#08101A]' : 'bg-gray-800',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            'relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-gray-600 rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2  focus:ring-green-200',
          )}
          type="button"
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classes(
              checked ? 'translate-x-4' : 'translate-x-0',
              disabled ? 'bg-gray-400' : ' bg-gray-200',
              'pointer-events-none inline-block h-4 w-4 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200',
            )}
          />
        </Switch>
        {label && (
          <Switch.Label
            className={classes(
              'ml-2 capitalize',
              disabled ? 'text-gray-400 italic' : 'text-gray-200',
            )}
          >
            {label}
          </Switch.Label>
        )}
      </Switch.Group>
    </div>
  );
}
