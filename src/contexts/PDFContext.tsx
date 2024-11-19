import React, { createContext, useContext, useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

// Set worker source path using official CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFContextType {
  isWorkerReady: boolean;
}

const PDFContext = createContext<PDFContextType>({ isWorkerReady: false });

export const usePDF = () => useContext(PDFContext);

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    const initWorker = async () => {
      try {
        // Simply check if the worker is loaded
        if (pdfjs.GlobalWorkerOptions.workerSrc) {
          // Wait a bit to ensure worker is loaded
          await new Promise(resolve => setTimeout(resolve, 100));
          setIsWorkerReady(true);
        }
      } catch (error) {
        console.error('Error initializing PDF worker:', error);
        setIsWorkerReady(false);
      }
    };

    // Initialize worker
    if (typeof window !== 'undefined') {
      initWorker();
    }

    return () => {
      // No cleanup needed
    };
  }, []);

  return (
    <PDFContext.Provider value={{ isWorkerReady }}>
      {children}
    </PDFContext.Provider>
  );
};
