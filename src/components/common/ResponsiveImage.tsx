import React from 'react';
import { motion } from 'framer-motion';
import { generateBlurDataURL } from '@/utils/imageOptimizer';
import { classNames } from '@/utils/helpers';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const imageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1.000]
    }
  }
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={classNames(
          'bg-gray-200 dark:bg-gray-800 flex items-center justify-center',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-500 dark:text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={imageVariants}
        className={classNames(
          'w-full h-full object-cover',
          !isLoaded && 'blur-[2px]'
        )}
      />
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
          style={{
            backgroundImage: `url(${generateBlurDataURL(src)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
    </div>
  );
};

export default ResponsiveImage;
