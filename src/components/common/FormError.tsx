import React from 'react';
import { motion } from 'framer-motion';
import { HiExclamationCircle } from 'react-icons/hi';
import { classNames } from '../../utils/helpers';

interface FormErrorProps {
  message: string;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={classNames(
        'flex items-center text-sm text-red-600 dark:text-red-400',
        className
      )}
    >
      <HiExclamationCircle className="mr-1" />
      {message}
    </motion.div>
  );
};

FormError.displayName = 'FormError';

export default FormError;
