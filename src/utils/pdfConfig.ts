import { pdfjs } from 'react-pdf';

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
