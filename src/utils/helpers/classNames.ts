/**
 * Combines class names, filtering out falsy values
 * @param classes - Array of class names or conditions
 * @returns Combined class names string
 */
export const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
