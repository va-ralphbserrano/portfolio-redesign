export interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export function optimizeImage(src: string, config: ImageConfig = {}): string {
  const {
    width = 800,
    height = 600,
    quality = 75,
    format = 'webp'
  } = config;

  // If src is an absolute URL, return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // If src is a data URL, return as is
  if (src.startsWith('data:')) {
    return src;
  }

  // For local images, add optimization parameters
  const params = new URLSearchParams();
  params.append('w', width.toString());
  params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('fm', format);

  // Ensure src starts with a forward slash
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  return `/_next/image?url=${encodeURIComponent(normalizedSrc)}&${params.toString()}`;
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  if (!maxWidth && !maxHeight) {
    return { width: originalWidth, height: originalHeight };
  }

  const aspectRatio = getAspectRatio(originalWidth, originalHeight);

  if (maxWidth && maxHeight) {
    const widthRatio = maxWidth / originalWidth;
    const heightRatio = maxHeight / originalHeight;
    const ratio = Math.min(widthRatio, heightRatio);
    return {
      width: Math.round(originalWidth * ratio),
      height: Math.round(originalHeight * ratio)
    };
  }

  if (maxWidth) {
    return {
      width: maxWidth,
      height: Math.round(maxWidth / aspectRatio)
    };
  }

  if (maxHeight) {
    return {
      width: Math.round(maxHeight * aspectRatio),
      height: maxHeight
    };
  }

  return { width: originalWidth, height: originalHeight };
}
