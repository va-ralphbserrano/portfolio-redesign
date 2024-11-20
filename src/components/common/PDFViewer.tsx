import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import classNames from 'classnames';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  onClose?: () => void;
  className?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url, onClose, className = '' }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className={classNames("pdf-viewer", className)}>
      {onClose && (
        <button onClick={onClose} className="close-button">Close</button>
      )}
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="max-w-full"
        />
      </Document>
      {numPages && numPages > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="rounded px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= (numPages || 0)}
            className="rounded px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
