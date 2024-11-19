import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PDFViewer from './PDFViewer';
import { XIcon } from './Icons';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, url }) => {
  // Prevent click propagation from modal content to overlay
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={handleContentClick}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* PDF Viewer */}
            <div className="p-4 h-full overflow-auto">
              <PDFViewer url={url} className="w-full h-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFModal;
