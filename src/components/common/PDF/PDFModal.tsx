import React from 'react';
import { Modal } from '@/components/common/Modal/Modal';
import { PDFViewer } from './PDFViewer';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: string;
  className?: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, file, className }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className={className}
    >
      <div className="h-[80vh]">
        <PDFViewer file={file} />
      </div>
    </Modal>
  );
};

PDFModal.displayName = 'PDFModal';

export default PDFModal;
