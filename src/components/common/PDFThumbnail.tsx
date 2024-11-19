import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface PDFThumbnailProps extends WithClassName {
  url: string;
  fallbackImage?: string;
  onClick?: () => void;
}

export const PDFThumbnail: React.FC<PDFThumbnailProps> = ({
  url,
  fallbackImage,
  className,
  onClick
}) => {
  const [error, setError] = useState(false);

  if (error && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt="PDF thumbnail fallback"
        className={classNames('w-full h-full object-cover', className)}
        onClick={onClick}
      />
    );
  }

  return (
    <Document
      file={url}
      onLoadError={() => setError(true)}
      loading={
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
      }
      error={
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500">Failed to load PDF</span>
        </div>
      }
    >
      <Page
        pageNumber={1}
        width={300}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        className={classNames('cursor-pointer', className)}
        onClick={onClick}
      />
    </Document>
  );
};
