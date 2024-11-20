import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from '@emotion/styled';

interface AdaptiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: string;
  formats?: ('webp' | 'avif' | 'jpeg' | 'png')[];
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const StyledImage = styled.img<{ isLoading: boolean }>`
  width: 100%;
  height: auto;
  transition: filter 0.3s ease-in-out;
  filter: ${({ isLoading }) => isLoading ? 'blur(20px)' : 'none'};
  will-change: filter;
  contain: content;
`;

const formatSupport = async (format: string): Promise<boolean> => {
  try {
    // Check for valid environment and format
    if (typeof window === 'undefined' || !format || format.trim() === '') {
      return false;
    }

    // Create canvas safely
    const canvas = document.createElement('canvas');
    if (!canvas || typeof canvas.toDataURL !== 'function') {
      return false;
    }

    // Format the image type correctly
    const imageType = format.startsWith('image/') ? format : `image/${format}`;
    
    // Try to get data URL with proper error handling
    try {
      const dataUrl = canvas.toDataURL(imageType);
      return dataUrl.indexOf(imageType) > -1;
    } catch (err) {
      console.warn(`Format support check failed for ${format}:`, err);
      return false;
    }
  } catch (error) {
    console.warn(`Format support check failed for ${format}:`, error);
    return false;
  }
};

export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  quality = 85,
  placeholder,
  formats = ['webp', 'avif', 'jpeg'],
  onLoad,
  onError,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder || src);
  const [supportedFormats, setSupportedFormats] = useState<string[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    const checkFormatSupport = async () => {
      const supported = await Promise.all(
        formats.map(async format => ({
          format,
          supported: await formatSupport(format)
        }))
      );
      setSupportedFormats(
        supported
          .filter(({ supported }) => supported)
          .map(({ format }) => format)
      );
    };

    checkFormatSupport();
  }, [formats]);

  useEffect(() => {
    if (!inView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
      onLoad?.();
    };
    img.onerror = (error) => {
      setIsLoading(false);
      onError?.(error as Error);
      if (placeholder) {
        setCurrentSrc(placeholder);
      }
    };
  }, [inView, src, placeholder, onLoad, onError]);

  const generateSrcSet = () => {
    if (!supportedFormats.length) return undefined;

    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    const format = supportedFormats[0];

    return widths
      .map(width => {
        const imageUrl = new URL(src, window.location.origin);
        imageUrl.searchParams.set('w', width.toString());
        imageUrl.searchParams.set('q', quality.toString());
        imageUrl.searchParams.set('fm', format);
        return `${imageUrl.toString()} ${width}w`;
      })
      .join(', ');
  };

  return (
    <StyledImage
      ref={(el) => {
        // Combine refs
        imageRef.current = el;
        if (typeof ref === 'function') ref(el);
      }}
      src={currentSrc}
      alt={alt}
      sizes={sizes}
      loading={loading}
      srcSet={generateSrcSet()}
      onLoad={() => setIsLoading(false)}
      onError={(e) => {
        setIsLoading(false);
        onError?.(e as unknown as Error);
      }}
      className={className}
      isLoading={isLoading}
      role="img"
      data-testid="adaptive-image"
    />
  );
};
