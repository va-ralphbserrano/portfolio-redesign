/**
 * Optimizes an image URL for the specified width and quality
 * @param url - Image URL to optimize
 * @param width - Optional width to resize the image to
 * @param quality - Optional quality parameter (0-100)
 * @returns Optimized image URL
 */
export const optimizeImage = (url: string, width?: number, quality?: number): string => {
  if (!url) return '';
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (quality) params.append('q', quality.toString());
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};
