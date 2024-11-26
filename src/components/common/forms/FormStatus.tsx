import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

export interface FormStatusProps {
  status: 'success' | 'error' | null;
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  status,
  message,
  onDismiss,
  className
}) => {
  if (!status || !message) return null;

  const isSuccess = status === 'success';
  const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={classNames(
          'relative',
          'flex items-start gap-3 p-4 mb-6',
          isSuccess 
            ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800/50' 
            : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800/50',
          'rounded-xl border shadow-sm backdrop-blur-sm',
          'transform-gpu',
          className
        )}
        role="alert"
        aria-live="polite"
      >
        <Icon 
          className={classNames(
            'h-5 w-5 flex-shrink-0',
            isSuccess ? 'text-green-400 dark:text-green-300' : 'text-red-400 dark:text-red-300'
          )}
          aria-hidden="true" 
        />
        <div className="flex-1 pt-0.5">
          <p className={classNames(
            'text-sm font-medium',
            isSuccess ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
          )}>
            {message}
          </p>
        </div>
        {onDismiss && (
          <button
            type="button"
            className={classNames(
              'inline-flex rounded-md p-1.5',
              isSuccess 
                ? 'text-green-500 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800/50' 
                : 'text-red-500 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-800/50',
              'focus:outline-none focus:ring-2',
              isSuccess 
                ? 'focus:ring-green-500 dark:focus:ring-green-400' 
                : 'focus:ring-red-500 dark:focus:ring-red-400',
              'focus:ring-offset-2 dark:focus:ring-offset-gray-900'
            )}
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

FormStatus.displayName = 'FormStatus';

export default FormStatus;
