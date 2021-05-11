import { MutableRefObject, Ref } from 'react';

export const mergeRefs = <T>(...refs: Ref<unknown>[]) => (value: T): void =>
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(value);
    } else if (ref) {
      (ref as MutableRefObject<unknown>).current = value;
    }
  });
