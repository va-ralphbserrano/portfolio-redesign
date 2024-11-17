import React from 'react';
import { motion } from 'framer-motion';
import { HiExclamationCircle, HiRefresh } from 'react-icons/hi';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <HiExclamationCircle className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          {error.message}
        </p>
        <div className="flex justify-center">
          <button
            onClick={resetErrorBoundary}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
          >
            <HiRefresh className="mr-2" />
            Try again
          </button>
        </div>
      </div>
    </motion.div>
  );
};

ErrorFallback.displayName = 'ErrorFallback';

export default ErrorFallback;
