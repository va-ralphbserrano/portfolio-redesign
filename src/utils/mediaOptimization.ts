import { useEffect, useState } from 'react';

// Network quality types
export type NetworkQuality = 'slow' | 'medium' | 'fast';

// Network speed thresholds (in Mbps)
const NETWORK_THRESHOLDS = {
  slow: 1,
  medium: 5,
};

// Image format support detection
export const supportsWebP = async (): Promise<boolean> => {
  const elem = document.createElement('canvas');
  const supportsWebP = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  return supportsWebP;
};

export const supportsAVIF = async (): Promise<boolean> => {
  const avif = new Image();
  return new Promise((resolve) => {
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Network quality detection
export const useNetworkQuality = (): NetworkQuality => {
  const [quality, setQuality] = useState<NetworkQuality>('medium');

  useEffect(() => {
    const checkNetworkQuality = async () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const downlink = connection?.downlink || 0;

        if (downlink <= NETWORK_THRESHOLDS.slow) {
          setQuality('slow');
        } else if (downlink <= NETWORK_THRESHOLDS.medium) {
          setQuality('medium');
        } else {
          setQuality('fast');
        }

        // Listen for connection changes
        connection?.addEventListener('change', checkNetworkQuality);
        return () => connection?.removeEventListener('change', checkNetworkQuality);
      }
      return undefined;
    };

    checkNetworkQuality();
  }, []);

  return quality;
};

// Progressive image loading
export interface ProgressiveImageProps {
  src: string;
  lowResSrc: string;
  alt: string;
  className?: string;
}

export const useProgressiveImage = (highResSrc: string, lowResSrc: string): {
  src: string;
  isLoading: boolean;
} => {
  const [src, setSrc] = useState(lowResSrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc;
    img.onload = () => {
      setSrc(highResSrc);
      setIsLoading(false);
    };
  }, [highResSrc]);

  return { src, isLoading };
};

// Video quality optimization
export interface VideoQualityOptions {
  src: string;
  quality: 'low' | 'medium' | 'high';
  type?: string;
}

export const getOptimalVideoQuality = (
  options: VideoQualityOptions[],
  networkQuality: NetworkQuality
): VideoQualityOptions => {
  if (!options.length) {
    throw new Error('No video options provided');
  }

  const defaultOption = options[0];
  
  const qualityMap: Record<NetworkQuality, 'low' | 'medium' | 'high'> = {
    slow: 'low',
    medium: 'medium',
    fast: 'high'
  };

  const targetQuality = qualityMap[networkQuality];
  
  // Since we've verified options has at least one element with defaultOption,
  // we can safely assert that the result will be VideoQualityOptions
  return (options.find(option => option.quality === targetQuality) ?? defaultOption) as VideoQualityOptions;
};

export const useOptimalVideoQuality = (options: VideoQualityOptions[]): VideoQualityOptions => {
  const networkQuality = useNetworkQuality();
  return getOptimalVideoQuality(options, networkQuality);
};

// Background image optimization
export const optimizeBackgroundImage = (url: string, width: number, quality = 80): string => {
  // Assuming you're using a service like Cloudinary or similar
  return `${url}?w=${width}&q=${quality}&auto=format`;
};

// Image format selection based on browser support
export const getOptimalImageFormat = async (formats: Record<string, string>): Promise<string> => {
  if (!Object.keys(formats).length) {
    throw new Error('No image formats provided');
  }

  const hasAVIF = await supportsAVIF();
  const hasWebP = await supportsWebP();

  const formatOrder = ['avif', 'webp', 'fallback', 'jpg', 'png'];
  
  // First, try AVIF if supported
  if (hasAVIF && formats.avif) {
    return formats.avif;
  }

  // Then try WebP if supported
  if (hasWebP && formats.webp) {
    return formats.webp;
  }

  // Finally, try formats in order until we find one that exists
  for (const format of formatOrder) {
    if (formats[format]) {
      return formats[format];
    }
  }

  // If we still haven't found a format, use the first available one
  const firstFormat = Object.values(formats)[0];
  if (!firstFormat) {
    throw new Error('No valid image formats provided');
  }

  return firstFormat;
};
