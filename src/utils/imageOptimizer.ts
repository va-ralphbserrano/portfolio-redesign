import { ImageLoaderProps } from 'next/image';

// Types
export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
}

// Core image optimization functions
export const optimizeImage = (src: string, options: ImageOptimizationOptions = {}) => {
  const {
    quality = 75,
    format = 'webp',
    width,
    height
  } = options;

  const params = new URLSearchParams();
  
  if (quality) params.append('q', quality.toString());
  if (format) params.append('fm', format);
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());

  return `${src}?${params.toString()}`;
};

// Next.js image loader
export const nextImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  return optimizeImage(src, { width, quality });
};

// Responsive image helpers
export const getResponsiveImageSizes = (baseWidth: number): string => {
  return `(max-width: 768px) 100vw, ${baseWidth}px`;
};

// Image preloading
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch image optimization
export const optimizeImages = (srcs: string[], options: ImageOptimizationOptions = {}): string[] => {
  return srcs.map(src => optimizeImage(src, options));
};

// Responsive srcset generator
export const generateSrcSet = (src: string, widths: number[]): string => {
  return widths
    .map(width => `${optimizeImage(src, { width })} ${width}w`)
    .join(', ');
};

// Blur data URL generator
export async function generateBlurDataURL(src: string): Promise<string> {
  if (!src) return '';

  try {
    // In a real application, this would generate a proper blur hash
    // For now, we'll return a simple base64-encoded placeholder
    const format = src.split('.').pop()?.toLowerCase() || 'jpeg';
    const placeholder = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    
    return `data:image/${format};base64,${placeholder}`;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return '';
  }
}
