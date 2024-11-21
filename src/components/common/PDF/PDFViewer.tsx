import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { Pagination } from '../Pagination';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
            prevIcon={<HiChevronLeft />}
            nextIcon={<HiChevronRight />}
          />
        </div>
      )}
    </div>
  );
};
