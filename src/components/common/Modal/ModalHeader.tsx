import React from 'react';
import { HiX } from 'react-icons/hi';
import { ModalHeaderProps } from './types';

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, showClose, onClose }) => {
  if (!title && !showClose) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {showClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span className="sr-only">Close</span>
          <HiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
