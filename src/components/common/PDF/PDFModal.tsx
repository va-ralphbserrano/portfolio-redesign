import React from 'react';
import Modal from '../Modal';
import { PDFViewer } from './PDFViewer';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: string;
  title?: string;
  renderTextLayer?: boolean;
  renderAnnotationLayer?: boolean;
}

export const PDFModal: React.FC<PDFModalProps> = ({
  isOpen,
  onClose,
  file,
  title,
  renderTextLayer = true,
  renderAnnotationLayer = true
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || 'View PDF'}
      size="xl"
    >
      <div className="w-full h-[80vh]">
        <PDFViewer 
          url={file} 
          modal={true}
          renderTextLayer={renderTextLayer}
          renderAnnotationLayer={renderAnnotationLayer}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};
