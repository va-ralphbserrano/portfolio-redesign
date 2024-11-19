import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  VideoQualityOptions,
  useOptimalVideoQuality,
} from '@/utils/mediaOptimization';
import { classNames } from '@/utils/helpers';

interface OptimizedVideoProps {
  sources: VideoQualityOptions[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  sources,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  playsInline = true,
  onLoad,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const currentSource = useOptimalVideoQuality(sources);

  const handleCanPlay = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    const error = new Error('Failed to load video');
    setError(error);
    onError?.(error);
  };

  // Preload optimization based on network quality
  useEffect(() => {
    if (videoRef.current) {
      // Removed the networkQuality variable and the related logic
    }
  }, []);

  if (error) {
    return (
      <div className={classNames('bg-gray-100 dark:bg-gray-800 rounded-lg p-4', className)}>
        <p className="text-red-500">Failed to load video</p>
      </div>
    );
  }

  return (
    <motion.div
      className={classNames('relative overflow-hidden', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        className={classNames(
          'w-full h-full object-cover',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        onCanPlay={handleCanPlay}
        onError={handleError}
      >
        <source src={currentSource.src} type={currentSource.type || 'video/mp4'} />
        Your browser does not support the video tag.
      </video>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
};
