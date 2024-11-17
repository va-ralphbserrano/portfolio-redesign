import React, { useState, useEffect, CSSProperties } from 'react';
import { motion, MotionStyle, HTMLMotionProps } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import PlaceholderImage from './PlaceholderImage';

type ImageMotionProps = HTMLMotionProps<'img'>;

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding' | 'style'> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  blur?: boolean;
  animation?: boolean;
  motionProps?: Partial<ImageMotionProps>;
  eager?: boolean;
  priority?: boolean;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';

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

  const imageProps = {
    src: currentSrc,
    alt,
    loading: priority || eager ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    ...props
  };

  const containerClasses = classNames(
    'overflow-hidden',
    blur && isLoading && 'blur-lg',
    className
  );

  if (animation) {
    const motionStyle: MotionStyle = {
      ...(style as MotionStyle),
      width,
      height
    };

    const defaultMotionProps: Partial<ImageMotionProps> = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    };

    const combinedMotionProps: ImageMotionProps = {
      ...defaultMotionProps,
      ...motionProps,
      className: containerClasses,
      ...imageProps,
      style: motionStyle
    } as ImageMotionProps;

    return <motion.img {...combinedMotionProps} />;
  }

  return (
    <img
      className={containerClasses}
      {...imageProps}
      style={{ ...style, width, height }}
    />
  );
};

export default Image;
