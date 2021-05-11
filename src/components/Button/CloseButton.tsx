import { forwardRef, Ref, useRef } from 'react';
import { useRipple } from 'react-use-ripple';
import { classes, mergeRefs } from '../../utils';

export type CloseButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'children'
>;

export default forwardRef(function CloseButton(
  { className, ...props }: CloseButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useRipple(buttonRef);

  return (
    <button
      {...props}
      className={classes(
        'w-7 h-7 rounded flex justify-center items-center bg-transparent opacity-[85%] hover:opacity-100',
        'focus:outline-none focus:ring focus:ring-gray-200',
        className,
      )}
      ref={mergeRefs(ref, buttonRef)}
    >
      <div
        className="w-7 h-7 rounded-full bg-gray-200"
        style={{
          clipPath:
            'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
        }}
      />
    </button>
  );
});
