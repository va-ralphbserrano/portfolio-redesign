import React, { useState, useEffect } from 'react';
import { classNames, optimizeImage } from '@/shared/utils/helpers';
import { getImageDimensions, createPlaceholder } from '@/shared/utils/imageDimensions';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  quality?: number;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'auto',
  objectFit = 'cover',
  priority = false,
  loading,
  sizes = '100vw',
  quality = 75,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    getImageDimensions(src).then(dimensions => {
      setPlaceholder(createPlaceholder(dimensions));
    }).catch(console.error);
  }, [src]);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const quality = priority ? 85 : 75; // Higher quality for priority images
    return widths
      .map(w => `${optimizeImage(src, { width: w, quality })} ${w}w`)
      .join(', ');
  };

  return (
    <div
      className={classNames(
        'relative overflow-hidden',
        aspectRatio === 'square' ? 'aspect-square' : aspectRatio === '4/3' ? 'aspect-[4/3]' : aspectRatio === '16/9' ? 'aspect-[16/9]' : 'aspect-auto',
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={classNames(
          'w-full h-full',
          objectFit === 'cover' ? 'object-cover' : 
          objectFit === 'contain' ? 'object-contain' : 
          objectFit === 'fill' ? 'object-fill' : 
          objectFit === 'none' ? 'object-none' : 
          'object-scale-down',
          '!filter-none !blur-none'
        )}
        {...props}
      />
    </div>
  );
};

ResponsiveImage.displayName = 'ResponsiveImage';
