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
  placeholder?: string;
  straightSide?: 'left' | 'right';
  required?: boolean;
}

export default forwardRef(function TextField(
  {
    label,
    error,
    className,
    id,
    fullWidth,
    straightSide,
    style,
    required,
    ...props
  }: TextFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={classes(fullWidth && 'w-full', className)} style={style}>
      <label
        htmlFor={id}
        className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1"
      >
        {label}
      </label>
      <div className={classes('shadow-sm', 'w-full')}>
        <input
          id={id}
          ref={ref}
          aria-required={required}
          aria-invalid={!!error}
          className={classes(
            'shadow-inner appearance-none border-t-2 border-b-2 py-2 px-3 text-gray-100 bg-[#08101A] disabled:bg-gray-800 disabled:italic focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed',
            !straightSide && 'rounded border-l-2 border-r-2',
            straightSide === 'left' && 'border-l-[1px] rounded-r border-r-2',
            straightSide === 'right' && 'border-r-[1px] rounded-l border-l-2',
            'w-full',
            error
              ? 'border-red-600 focus:ring-red-400'
              : 'border-gray-600 focus:ring-green-200',
          )}
          {...props}
        />
      </div>
      {error && typeof error === 'string' && (
        <div className="flex items-center mt-1" role="alert">
          <IconContext.Provider value={{ className: 'mr-2 text-red-500' }}>
            <BiErrorCircle />
          </IconContext.Provider>
          <span className="text-red-500 text-sm flex-1">{error}</span>
        </div>
      )}
    </div>
  );
});
