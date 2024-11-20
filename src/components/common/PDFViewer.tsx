import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  className?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url, className = '' }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
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
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="rounded px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={goToNextPage}
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
