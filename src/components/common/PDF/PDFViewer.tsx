import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { classNames } from '@/utils/helpers';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  onClose?: () => void;
  className?: string;
  modal?: boolean;
  renderTextLayer?: boolean;
  renderAnnotationLayer?: boolean;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  onClose,
  className,
  modal = false,
  renderTextLayer = true,
  renderAnnotationLayer = true
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const Wrapper = modal ? 'div' : React.Fragment;
  const wrapperProps = modal
    ? {
        className: 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
      }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <div
        className={classNames(
          modal ? 'relative bg-white dark:bg-gray-800 p-4 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto' : '',
          'pdf-viewer',
          className
        )}
      >
        {onClose && (
          <button
            onClick={onClose}
            className={classNames(
              modal
                ? 'absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                : 'close-button'
            )}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className={modal ? 'mx-auto' : 'max-w-full'}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={renderTextLayer}
            renderAnnotationLayer={renderAnnotationLayer}
            className={modal ? 'mx-auto' : 'max-w-full'}
          />
        </Document>

        {numPages && numPages > 1 && (
          <div className={classNames(
            'flex items-center justify-center gap-4 mt-4',
            modal ? '' : 'mt-4 flex items-center gap-4'
          )}>
            <button
              onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
              disabled={pageNumber <= 1}
              className={classNames(
                'px-4 py-2 rounded',
                'text-sm font-medium',
                'disabled:opacity-50',
                modal
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
              disabled={pageNumber >= numPages}
              className={classNames(
                'px-4 py-2 rounded',
                'text-sm font-medium',
                'disabled:opacity-50',
                modal
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

PDFViewer.displayName = 'PDFViewer';

export default PDFViewer;
