import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { Pagination } from './Pagination';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import Modal from './Modal';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// PDFViewer Component
interface PDFViewerProps {
  url: string;
  modal?: boolean;
  renderTextLayer?: boolean;
  renderAnnotationLayer?: boolean;
  onClose?: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  modal = false,
  renderTextLayer = true,
  renderAnnotationLayer = true,
  onClose
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {modal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <IoClose size={24} />
        </button>
      )}
      <div className="flex-1 w-full overflow-auto p-4">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={renderTextLayer}
            renderAnnotationLayer={renderAnnotationLayer}
            className="max-w-full"
          />
        </Document>
      </div>
      {numPages > 1 && (
        <div className="w-full p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Pagination
            currentPage={pageNumber}
            totalPages={numPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

// PDFThumbnail Component
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

// PDFModal Component
interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: string;
  title?: string;
  renderTextLayer?: boolean;
  renderAnnotationLayer?: boolean;
}

export const PDFModal: React.FC<PDFModalProps> = ({
  isOpen,
  onClose,
  file,
  title,
  renderTextLayer = true,
  renderAnnotationLayer = true
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || 'View PDF'}
      size="xl"
    >
      <div className="w-full h-[80vh]">
        <PDFViewer 
          url={file} 
          modal 
          onClose={onClose}
          renderTextLayer={renderTextLayer}
          renderAnnotationLayer={renderAnnotationLayer}
        />
      </div>
    </Modal>
  );
};
