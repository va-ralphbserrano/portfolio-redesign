import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  useNetworkQuality,
  useProgressiveImage,
  getOptimalImageFormat,
  optimizeBackgroundImage,
} from '@/utils/mediaOptimization';
import { classNames } from '@/utils/helpers';

interface ImageFormats extends Record<string, string> {
  avif?: string;
  webp?: string;
  jpg?: string;
  png?: string;
  fallback: string;
}

interface OptimizedImageProps {
  formats: ImageFormats;
  lowResSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  formats,
  lowResSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  onClick,
}) => {
  const [optimizedSrc, setOptimizedSrc] = useState(formats.fallback);
  const networkQuality = useNetworkQuality();
  const { src, isLoading } = useProgressiveImage(optimizedSrc, lowResSrc);

  useEffect(() => {
    const loadOptimalFormat = async () => {
      const optimalSrc = await getOptimalImageFormat(formats);
      // Apply quality reduction for slower connections
      if (networkQuality === 'slow') {
        setOptimizedSrc(optimizeBackgroundImage(optimalSrc, width || 800, 60));
      } else if (networkQuality === 'medium') {
        setOptimizedSrc(optimizeBackgroundImage(optimalSrc, width || 1200, 75));
      } else {
        setOptimizedSrc(optimizeBackgroundImage(optimalSrc, width || 1600, 85));
      }
    };

    loadOptimalFormat();
  }, [formats, networkQuality, width]);

  return (
    <motion.div
      className={classNames('relative overflow-hidden', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        className={classNames(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'
        )}
        initial={false}
        animate={{ opacity: isLoading ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
};
