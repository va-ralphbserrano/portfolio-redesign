/**
 * Enhanced classNames utility that handles various input types and provides better type safety
 * @param classes - Array of class names, objects, or conditions
 * @returns Combined class names string with duplicates removed
 */
function classNames(...classes: (string | boolean | undefined | null | Record<string, boolean>)[]): string {
  const result = new Set<string>();

  classes.forEach((cls) => {
    if (!cls) return;

    if (typeof cls === 'string') {
      cls.split(' ').forEach(c => c && result.add(c));
    } else if (typeof cls === 'object') {
      Object.entries(cls).forEach(([className, condition]) => {
        if (condition) {
          className.split(' ').forEach(c => c && result.add(c));
        }
      });
    }
  });

  return Array.from(result).join(' ');
}

export { classNames };
