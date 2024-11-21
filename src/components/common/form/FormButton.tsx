import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import { motion } from 'framer-motion';
import React from 'react';

interface FormButtonProps extends WithClassName {
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  disabled = false,
  onClick,
  children,
  className
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classNames(
        'w-full px-6 py-3',
        'bg-primary-500 hover:bg-primary-600',
        'text-white font-medium',
        'rounded-lg shadow-md',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
    >
      {children}
    </motion.button>
  );
};

FormButton.displayName = 'FormButton';

export default FormButton;
