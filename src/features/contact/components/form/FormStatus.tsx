import { classNames } from '@/shared/utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

interface FormStatusProps {
  status: 'success' | 'error' | null;
  message?: string;
  className?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({ status, message, className }) => {
  if (!status || !message) return null;

  const variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={classNames(
          'p-4 rounded-lg',
          status === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
          className
        )}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            {status === 'success' ? (
              <HiCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
            ) : (
              <HiExclamationCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            )}
          </div>
          <div className="ml-3">
            <p
              className={classNames(
                'text-sm font-medium',
                status === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              )}
            >
              {message}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

FormStatus.displayName = 'FormStatus';

export default FormStatus;
