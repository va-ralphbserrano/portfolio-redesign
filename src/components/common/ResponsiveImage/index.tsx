import React from 'react';
import { classNames } from '@/utils/helpers';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  loading = 'lazy',
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : loading}
      className={classNames(
        'transition-opacity duration-300',
        className
      )}
      {...props}
    />
  );
};

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
