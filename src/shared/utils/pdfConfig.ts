import { pdfjs } from 'react-pdf';
import { PDFOptions } from '@/types';

// Configure worker source to use CDN
const pdfjsVersion = pdfjs.version;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

/**
 * Resolves a PDF URL to its correct path
 * @param url The URL to resolve
 * @returns The resolved URL
 */
export const resolvePDFUrl = (url: string): string => {
  if (!url) return '';

  // Handle absolute URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Clean up the URL by removing any leading slashes and 'pdfs/' prefix
  const cleanUrl = url.replace(/^\/+/, '').replace(/^pdfs\//, '');

  // In Vite, files in public directory are served from root without the 'public' prefix
  return new URL(`/pdfs/${cleanUrl}`, window.location.origin).href;
};

// PDF Configuration
export const defaultPDFOptions: PDFOptions = {
  format: 'A4',
  margin: {
    top: '1cm',
    right: '1cm',
    bottom: '1cm',
    left: '1cm'
  },
  printBackground: true
};

// PDF Worker Functions
export const createPDFWorker = async () => {
  if (typeof window === 'undefined') return null;
  
  const worker = new Worker(new URL('./pdfWorker.ts', import.meta.url));
  return worker;
};

export const generatePDF = async (html: string, options: Partial<PDFOptions> = {}): Promise<Blob> => {
  const worker = await createPDFWorker();
  if (!worker) throw new Error('PDF worker could not be created');

  return new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      if (e.data.error) {
        reject(new Error(e.data.error));
      } else {
        resolve(e.data.pdf);
      }
      worker.terminate();
    };

    worker.postMessage({
      html,
      options: { ...defaultPDFOptions, ...options }
    });
  });
};

// PDF Utility Functions
export const downloadPDF = async (blob: Blob, filename: string = 'document.pdf') => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const previewPDF = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  URL.revokeObjectURL(url);
};
