import { RefObject, useLayoutEffect, useState } from 'react';

export function useDiemensions<T extends HTMLElement>(
  ref: RefObject<T>,
): Partial<DOMRectReadOnly> {
  const [dimensions, setDimensions] = useState<Partial<DOMRectReadOnly>>({});

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      setDimensions(entry.contentRect);
    });

    const current = ref.current;

    if (current) {
      resizeObserver.observe(current);
      return () => resizeObserver.unobserve(current);
    }
  }, [ref]);

  return dimensions;
}
