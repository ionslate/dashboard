import { classes } from '../../utils';
import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  forwardRef,
  Ref,
} from 'react';
import { IconContext } from 'react-icons';
import { BiErrorCircle } from 'react-icons/bi';

export interface TextFieldProps {
  label?: string;
  error?: boolean | string;
  name?: string;
  value?: string;
  id?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  type?: JSX.IntrinsicElements['input']['type'];
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
}

export default forwardRef(function TextField(
  { label, error, className, id, fullWidth, ...props }: TextFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-gray-400 text-xs font-bold uppercase tracking-widest"
      >
        {label}
      </label>
      <div
        className={classes('shadow-sm', fullWidth ? 'w-full' : 'inline-block')}
      >
        <input
          id={id}
          ref={ref}
          className={classes(
            'shadow-inner appearance-none border-2 border-opacity-60 rounded py-2 px-3 text-gray-100 bg-black bg-opacity-80 focus:outline-none focus:ring-2 focus:border-transparent',
            error
              ? 'border-red-600 focus:ring-red-400'
              : 'border-gray-600 focus:ring-green-200',
            fullWidth && 'w-full',
            className,
          )}
          {...props}
        />
      </div>
      {error && typeof error === 'string' && (
        <div className="flex items-center">
          <IconContext.Provider value={{ className: 'mr-2 text-red-500' }}>
            <BiErrorCircle />
          </IconContext.Provider>
          <span className="text-red-500 text-sm flex-1">{error}</span>
        </div>
      )}
    </>
  );
});
