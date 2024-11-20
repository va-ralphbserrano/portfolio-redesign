import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@/components/icons';
import PDFViewer from './PDFViewer';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <XIcon className="h-6 w-6" />
            </button>

            {/* PDF Viewer */}
            <div className="p-6">
              <PDFViewer url={pdfUrl} className="w-full" />
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PDFModal;
