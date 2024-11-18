import React, { useState, useEffect, CSSProperties } from 'react';
import { motion, MotionStyle, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import PlaceholderImage from './PlaceholderImage';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding' | 'style' | 'srcSet'> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  blur?: boolean;
  animation?: boolean;
  motionProps?: Partial<HTMLMotionProps<'img'>>;
  eager?: boolean;
  priority?: boolean;
  style?: CSSProperties;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  webpSrcSet?: string;
  fallbackSrcSet?: string;
}

const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';

const generateSrcSet = (src: string, quality: number = 75): string => {
  const widths = [320, 640, 768, 1024, 1280, 1536];
  return widths
    .map(w => `${src}?w=${w}&q=${quality} ${w}w`)
    .join(', ');
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc = defaultPlaceholder,
  blur = true,
  animation = true,
  motionProps,
  eager = false,
  priority = false,
  style,
  width,
  height,
  sizes = '100vw',
  quality = 75,
  webpSrcSet,
  fallbackSrcSet,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setCurrentSrc(placeholderSrc);
    setError(false);

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholderSrc]);

  if (error) {
    return (
      <PlaceholderImage
        width={width || 400}
        height={height || 300}
        text={alt}
        className={className}
      />
    );
  }

  const containerClasses = classNames(
    'overflow-hidden',
    blur && isLoading && 'blur-lg',
    className
  );

  const imageProps = {
    src: currentSrc,
    alt,
    loading: priority || eager ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    sizes,
    ...props
  };

  const MotionImage = motion.img as any;

  const pictureContent = (
    <picture>
      {webpSrcSet && (
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={sizes}
        />
      )}
      <source
        type="image/jpeg"
        srcSet={fallbackSrcSet || generateSrcSet(src, quality)}
        sizes={sizes}
      />
      <AnimatePresence mode="wait">
        {animation ? (
          <MotionImage
            key={src}
            {...imageProps}
            {...motionProps}
            className={containerClasses}
            style={{ ...style as MotionStyle, width, height }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <img
            {...imageProps}
            className={containerClasses}
            style={{ ...style, width, height }}
          />
        )}
      </AnimatePresence>
    </picture>
  );

  return pictureContent;
};

export default Image;
