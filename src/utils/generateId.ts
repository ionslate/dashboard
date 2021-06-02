const alphabet = 'qQwWeErRtTyYuUiIoOpPlLkKjJhHgGfFdDsSaAzZxXcCvVbBnNmM';

export const generateId = (size = 12) =>
  Array(size)
    .fill(null)
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join('');
