import { Listbox, Transition } from '@headlessui/react';
import { CSSProperties, Fragment } from 'react';
import { IconContext } from 'react-icons';
import { BiErrorCircle } from 'react-icons/bi';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { classes } from '../../utils';

export interface DropdownOption<T> {
  label: string;
  disabled?: boolean;
  value: T;
}

export interface DropdownChangeEvent<T> {
  name?: string;
  option: DropdownOption<T>;
}

export interface DropdownProps<T> {
  label?: string;
  error?: boolean | string;
  name?: string;
  options?: DropdownOption<T>[];
  value: DropdownOption<T>;
  disabled?: boolean;
  onChange?: (e: DropdownChangeEvent<T>) => void;
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  placeholder?: string;
  straightSide?: 'left' | 'right';
}

export default function Example<T>({
  label,
  error,
  name,
  options = [],
  value,
  disabled,
  onChange,
  autoFocus,
  className,
  style,
  fullWidth,
  placeholder,
  straightSide,
}: DropdownProps<T>) {
  return (
    <div
      style={style}
      className={classes('inline-block', fullWidth && 'w-full', className)}
    >
      <Listbox
        disabled={disabled}
        value={value}
        onChange={(value) => {
          onChange?.({ name, option: value });
        }}
      >
        {({ open, disabled }) => (
          <div className="relative">
            {label && (
              <Listbox.Label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                {label}
              </Listbox.Label>
            )}
            <div className="shadow-sm">
              <Listbox.Button
                autoFocus={autoFocus}
                className={classes(
                  'relative border-t-2 border-b-2  w-full py-2 pl-3 pr-10 text-left min-h-[2.750em] bg-[#08101A] shadow-inner focus:outline-none focus:ring-2 focus:border-transparent',
                  !straightSide && 'rounded border-l-2 border-r-2',
                  straightSide === 'left' &&
                    'border-l-[1px] rounded-r border-r-2',
                  straightSide === 'right' &&
                    'border-r-[1px] rounded-l border-l-2',
                  error
                    ? 'border-red-600 focus:ring-red-400'
                    : 'border-gray-600 focus:ring-green-200',
                  disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
              >
                <span
                  className={classes(
                    'block truncate',
                    disabled && 'text-gray-400 italic',
                  )}
                >
                  {value?.label ||
                    (placeholder && (
                      <span className="text-gray-400 not-italic">
                        {placeholder}
                      </span>
                    ))}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              {error && typeof error === 'string' && (
                <div className="flex items-center">
                  <IconContext.Provider
                    value={{ className: 'mr-2 text-red-500' }}
                  >
                    <BiErrorCircle />
                  </IconContext.Provider>
                  <span className="text-red-500 text-sm flex-1">{error}</span>
                </div>
              )}
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={open}
            >
              <Listbox.Options
                static
                className="absolute w-full py-1 mt-1 overflow-auto text-base bg-[#08101A] rounded-sm shadow-lg max-h-60 ring-2 ring-green-200 focus:outline-none sm:text-sm z-10"
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.label}
                    disabled={option.disabled}
                    className={({ active, disabled }) =>
                      classes(
                        disabled && 'text-gray-400 italic',
                        active && 'bg-gray-700',
                        'select-none relative py-2 pl-10 pr-4',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <HiCheck className="w-5 h-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
