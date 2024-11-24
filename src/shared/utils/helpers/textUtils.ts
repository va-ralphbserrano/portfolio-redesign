/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
};

/**
 * Formats a date string into a readable format
 * @param date - Date string or Date object to format
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Scrolls to an element with optional offset
 * @param elementId - ID of the target element
 * @param offset - Offset from the top in pixels
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
