const isString = (value: unknown): value is string => typeof value === 'string';

export const classes = (...args: unknown[]): string =>
  args
    .filter(isString)
    .map((className) => className.trim())
    .join(' ');
