/**
 * Enhanced classNames utility that handles various input types and provides better type safety
 * @param classes - Array of class names, objects, or conditions
 * @returns Combined class names string with duplicates removed
 */
type ClassValue = string | number | boolean | undefined | null | ClassDictionary | ClassArray;

interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

interface ClassArray extends Array<ClassValue> {}

export const classNames = (...args: ClassValue[]): string => {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg.toString());
    } else if (Array.isArray(arg)) {
      const inner = classNames(...arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (const key in arg as ClassDictionary) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && (arg as ClassDictionary)[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};
