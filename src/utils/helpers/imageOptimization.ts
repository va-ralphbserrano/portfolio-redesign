import { ImageOptimizationOptions } from './types';

/**
 * Optimizes image URLs by adding width, quality, and format parameters
 * @param url - Image URL
 * @param options - Optimization options
 * @returns Optimized image URL
 */
export const optimizeImage = (url: string, { width, quality = 75, format = 'webp' }: ImageOptimizationOptions = {}): string => {
  if (!url) return '';
  
  // If it's an external URL, return as is
  if (url.startsWith('http')) return url;

  // For local images, add optimization parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  params.append('q', quality.toString());
  params.append('fm', format);

  return `${url}?${params.toString()}`;
};
