import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import { ButtonProps, variants, sizes } from './types';
import { LoadingSpinner } from './LoadingSpinner';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon: Icon,
  onClick,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classNames(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : Icon ? (
        <Icon className="mr-2 -ml-1 h-5 w-5" />
      ) : null}
      {children}
    </motion.button>
  );
};

Button.displayName = 'Button';

export default Button;
