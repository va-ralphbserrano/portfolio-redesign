import React from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

const imageDimensionsCache = new Map<string, ImageDimensions>();

/**
 * Gets the dimensions of an image
 * @param src Image source URL
 * @returns Promise that resolves with the image dimensions
 */
export const getImageDimensions = (src: string): Promise<ImageDimensions> => {
  if (imageDimensionsCache.has(src)) {
    return Promise.resolve(imageDimensionsCache.get(src)!);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const dimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      imageDimensionsCache.set(src, dimensions);
      resolve(dimensions);
    };
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Calculates the aspect ratio of an image
 * @param dimensions Image dimensions
 * @returns Aspect ratio as a string (e.g., "16/9")
 */
export const calculateAspectRatio = (dimensions: ImageDimensions): string => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(dimensions.width, dimensions.height);
  return `${dimensions.width / divisor}/${dimensions.height / divisor}`;
};

/**
 * Creates a placeholder for an image with the correct aspect ratio
 * @param dimensions Image dimensions
 * @returns Style object for maintaining aspect ratio
 */
export const createPlaceholder = (dimensions: ImageDimensions): React.CSSProperties => {
  const paddingTop = (dimensions.height / dimensions.width) * 100;
  return {
    position: 'relative',
    paddingTop: `${paddingTop}%`,
    backgroundColor: '#f3f4f6'
  };
};
