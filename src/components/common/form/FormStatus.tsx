import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';

interface FormStatusProps extends WithClassName {
  status: 'success' | 'error' | null;
  message?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  status,
  message,
  className
}) => {
  if (!status) return null;

  const isSuccess = status === 'success';
  const Icon = isSuccess ? CheckCircleIcon : ExclamationCircleIcon;
  const baseColor = isSuccess ? 'green' : 'red';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={classNames(
        'flex items-center gap-2 p-4',
        `bg-${baseColor}-50 dark:bg-${baseColor}-900/20`,
        `text-${baseColor}-700 dark:text-${baseColor}-200`,
        'rounded-lg',
        className
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

FormStatus.displayName = 'FormStatus';

export default FormStatus;
