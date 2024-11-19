import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { optimizeImage, generateBlurDataURL } from '@/utils/imageOptimizer';
import { useWindowSize } from '@/hooks/useWindowSize';

interface ImageBreakpoint {
  width: number;
  src: string;
  quality?: number;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  breakpoints?: ImageBreakpoint[];
  priority?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

interface ImageOptimizationOptions {
  width: number;
  height: number;
  quality: number;
}

const MOBILE_QUALITY = 65;
const TABLET_QUALITY = 75;
const DESKTOP_QUALITY = 85;

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  breakpoints = [],
  priority = false,
  width: initialWidth,
  height: initialHeight,
  quality: initialQuality,
  loading = 'lazy',
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState<string>('');
  const { width: windowWidth = 1920 } = useWindowSize();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    generateBlurDataURL(src).then(setBlurDataURL);
  }, [src]);

  const getDeviceQuality = (): number => {
    if (!windowWidth) return DESKTOP_QUALITY;
    if (windowWidth < 640) return MOBILE_QUALITY;
    if (windowWidth < 1024) return TABLET_QUALITY;
    return DESKTOP_QUALITY;
  };

  const getOptimalImageSource = (): string => {
    if (!breakpoints.length) return src;
    
    const sortedBreakpoints = [...breakpoints].sort((a, b) => b.width - a.width);
    const matchingBreakpoint = sortedBreakpoints.find(bp => (windowWidth || 0) <= bp.width);
    return matchingBreakpoint?.src || src;
  };

  const getImageDimensions = (): ImageOptimizationOptions => {
    const width = initialWidth || Math.min(windowWidth || 1920, 1920);
    const height = initialHeight || Math.round((width * 9) / 16);
    const quality = initialQuality || getDeviceQuality();

    return {
      width,
      height,
      quality,
    };
  };

  if (error) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-800 rounded-lg ${className}`}>
        <div className="flex items-center justify-center w-full h-full p-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Image failed to load</span>
        </div>
      </div>
    );
  }

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const optimizedSrc = optimizeImage(getOptimalImageSource(), getImageDimensions());

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={imageVariants}
      className={className}
    >
      {(inView || priority) && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          loading={priority ? 'eager' : loading}
          onError={() => setError(true)}
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </motion.div>
  );
};

export default ResponsiveImage;
