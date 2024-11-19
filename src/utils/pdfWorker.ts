import * as pdfjs from 'pdfjs-dist';

// Configure worker
const initWorker = async () => {
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
};

// Initialize worker
if (typeof window !== 'undefined') {
  initWorker();
}

export { pdfjs };
