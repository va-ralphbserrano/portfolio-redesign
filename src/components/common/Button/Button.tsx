import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { ButtonProps, variants, sizes } from './types';
import { LoadingSpinner } from '../Loading';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  isSubmitting,
  icon: Icon,
  fullWidth,
  onClick,
  ...props
}) => {
  const isDisabled = disabled || loading || isSubmitting;
  
  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      className={classNames(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {(loading || isSubmitting) ? (
        <div className="flex items-center space-x-2">
          <LoadingSpinner />
          <span>{isSubmitting ? 'Submitting...' : 'Loading...'}</span>
        </div>
      ) : (
        <>
          {Icon && <Icon className="mr-2 -ml-1 h-5 w-5" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

Button.displayName = 'Button';

export default Button;

