import React from 'react';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface ResponsiveImageProps extends WithClassName {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  onLoad?: () => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  onError,
  onLoad,
}) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
    onError?.();
  };

  if (error) {
    return (
      <div className={classNames('bg-gray-100 dark:bg-gray-800 flex items-center justify-center', className)}>
        <span className="text-gray-500 dark:text-gray-400">Image failed to load</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={classNames('w-full h-full object-cover', className)}
      onError={handleError}
      onLoad={onLoad}
    />
  );
};
