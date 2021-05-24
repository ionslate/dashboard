import { Listbox, Transition } from '@headlessui/react';
import { CSSProperties, Fragment } from 'react';
import { IconContext } from 'react-icons';
import { BiErrorCircle } from 'react-icons/bi';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { classes } from '../../utils';
import Tippy from '@tippyjs/react/headless';
import { useRef } from 'react';

export interface SelectOption<T> {
  label: string;
  disabled?: boolean;
  value: T;
}

export interface SelectChangeEvent<T> {
  name?: string;
  option: SelectOption<T>;
}

export interface SelectProps<T> {
  label?: string;
  error?: boolean | string;
  name?: string;
  options?: SelectOption<T>[];
  value: SelectOption<T>;
  disabled?: boolean;
  onChange?: (e: SelectChangeEvent<T>) => void;
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  placeholder?: string;
  straightSide?: 'left' | 'right';
}

export default function Select<T>({
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
}: SelectProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={style}
      className={classes('inline-block', fullWidth && 'w-full', className)}
      ref={wrapperRef}
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
            <Tippy
              visible={open}
              placement="bottom"
              interactive
              offset={[0, 6]}
              animation
              render={(attr) => (
                <div
                  className="z-10"
                  style={{
                    width: wrapperRef.current?.getBoundingClientRect().width,
                  }}
                  {...attr}
                >
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={open}
                  >
                    <Listbox.Options
                      static
                      className="absolute w-full py-1 overflow-auto text-sm bg-gray-700 rounded-sm shadow-lg max-h-60 ring-2 ring-green-200 focus:outline-none"
                    >
                      {options.map((option) => (
                        <Listbox.Option
                          key={option.label}
                          disabled={option.disabled}
                          className={({ active, disabled }) =>
                            classes(
                              disabled && 'text-gray-400 italic',
                              active && 'bg-gray-600',
                              'select-none relative py-2 pl-10 pr-4',
                              disabled
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer',
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
                                  <HiCheck
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
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
            >
              <div>
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
                    <div className="flex items-center mt-1">
                      <IconContext.Provider
                        value={{ className: 'mr-2 text-red-500' }}
                      >
                        <BiErrorCircle />
                      </IconContext.Provider>
                      <span className="text-red-500 text-sm flex-1">
                        {error}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Tippy>
          </div>
        )}
      </Listbox>
    </div>
  );
}
