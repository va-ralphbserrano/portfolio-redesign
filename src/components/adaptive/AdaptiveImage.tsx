import React, { useEffect, useRef, useState } from 'react';
import { ErrorReportingService, ErrorSeverity, ErrorCategory } from '../../services/ErrorReportingService';
import { ImageOptimizer } from '../common/AdaptiveImage/ImageOptimizer';

export interface AdaptiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  quality?: number;
  formats?: ('webp' | 'avif' | 'jpeg')[];
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const AdaptiveImage: React.FC<AdaptiveImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  quality = 80,
  formats = ['webp', 'jpeg'],
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const optimizeImage = async () => {
      try {
        setIsLoading(true);
        const optimizer = new ImageOptimizer();
        const optimizedSrc = await optimizer.optimize(src, {
          width: width || 800, // Provide a default width if none specified
          quality: quality,
          format: formats[0] || 'webp'
        });
        setImageSrc(optimizedSrc);
        setIsLoading(false);
        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to optimize image');
        setError(error);
        setIsLoading(false);
        onError?.(error);
        ErrorReportingService.captureError({
          name: 'ImageOptimizationError',
          message: error.message,
          severity: ErrorSeverity.ERROR,
          category: ErrorCategory.SYSTEM,
          metadata: {
            src,
            width,
            quality,
            formats
          }
        });
      }
    };

    optimizeImage();
  }, [src, width, quality, formats]);

  const handleError = () => {
    const error = new Error('Failed to load image');
    setError(error);
    onError?.(error);
    ErrorReportingService.captureError({
      name: 'ImageLoadError',
      message: error.message,
      severity: ErrorSeverity.ERROR,
      category: ErrorCategory.SYSTEM,
      metadata: {
        src: imageSrc
      }
    });
  };

  if (error) {
    return (
      <div role="alert" className="adaptive-image-error">
        <p>Failed to load image: {error.message}</p>
      </div>
    );
  }

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      className={isLoading ? 'adaptive-image-loading' : 'adaptive-image-loaded'}
    />
  );
};

export default AdaptiveImage;
