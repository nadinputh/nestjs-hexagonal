// one-two-three
export const toKebab = (str: string): string => {
  return str
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-');
};

// one_two_three
export const toSnakeCase = (str: string): string => {
  return toKebab(str).split('-').join('_');
};

// oneTwoThree
export const toCamelCase = (str: string): string => {
  return toKebab(str)
    .split('-')
    .map((word, index) => {
      if (index === 0) return word;
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};
