import React from 'react';
import { classNames } from '@/shared/utils/helpers';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  objectFit = 'cover',
  priority = false,
  loading,
  ...props
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    auto: 'aspect-auto'
  };

  return (
    <div className={classNames(
      'relative overflow-hidden',
      aspectRatioClasses[aspectRatio],
      className
    )}>
      <img
        src={src}
        alt={alt}
        className={classNames(
          'w-full h-full',
          `object-${objectFit}`
        )}
        loading={priority ? 'eager' : loading}
        {...props}
      />
    </div>
  );
};

ResponsiveImage.displayName = 'ResponsiveImage';
