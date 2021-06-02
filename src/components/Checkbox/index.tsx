import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  forwardRef,
  Ref,
} from 'react';

export interface CheckboxProps {
  label?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  id?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default forwardRef(function Checkbox(
  { label, id, className, style, ...props }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div style={style} className={className}>
      <input
        type="checkbox"
        id={id}
        className="form-checkbox rounded border-2 border-gray-600 text-green-500 bg-[#08101A] disabled:bg-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-200 focus:border-transparent"
        ref={ref}
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-gray-200 capitalize">
        {label}
      </label>
    </div>
  );
});
