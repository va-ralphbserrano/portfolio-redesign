interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
}

interface OptimizedImage {
  src: string;
  srcSet: string;
  webpSrcSet?: string | undefined;
  sizes: string;
  width?: number | undefined;
  height?: number | undefined;
}

const DEFAULT_QUALITY = 75;
const DEFAULT_WIDTHS = [320, 640, 768, 1024, 1280, 1536];
const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

/**
 * Generates optimized image URLs with various widths and formats
 */
export const optimizeImage = (
  src: string,
  options: ImageOptimizationOptions = {}
): OptimizedImage => {
  const {
    quality = DEFAULT_QUALITY,
    format = 'webp',
    width,
    height
  } = options;

  // Generate srcSet for original format
  const srcSet = DEFAULT_WIDTHS
    .map(w => `${src}?w=${w}&q=${quality} ${w}w`)
    .join(', ');

  // Generate WebP srcSet if requested
  const webpSrcSet = format === 'webp'
    ? DEFAULT_WIDTHS
        .map(w => `${src}?w=${w}&q=${quality}&fm=webp ${w}w`)
        .join(', ')
    : undefined;

  return {
    src: `${src}?w=${width || DEFAULT_WIDTHS[2]}&q=${quality}${format === 'webp' ? '&fm=webp' : ''}`,
    srcSet,
    webpSrcSet,
    sizes: DEFAULT_SIZES,
    width,
    height
  };
};

/**
 * Generates a blur data URL for image placeholder
 */
export const generateBlurDataURL = (
  width: number = 8,
  height: number = 8
): string => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="1"/>
      </filter>
      <rect width="100%" height="100%" fill="#e5e7eb"/>
    </svg>`
  ).toString('base64')}`;
};

/**
 * Calculates image dimensions while maintaining aspect ratio
 */
export const calculateImageDimensions = (
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): { width: number; height: number } => {
  if (!targetWidth && !targetHeight) {
    return { width: originalWidth, height: originalHeight };
  }

  const ratio = originalWidth / originalHeight;

  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / ratio)
    };
  }

  if (!targetWidth && targetHeight) {
    return {
      width: Math.round(targetHeight * ratio),
      height: targetHeight
    };
  }

  return {
    width: targetWidth || originalWidth,
    height: targetHeight || originalHeight
  };
};

export const imageOptimizer = {
  optimizeImage,
  generateBlurDataURL,
  calculateImageDimensions
};
