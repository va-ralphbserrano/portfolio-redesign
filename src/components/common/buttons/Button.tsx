import { classNames } from '@/shared/utils/helpers';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { IconType } from 'react-icons';

// Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'form';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: IconType;
  isSubmitting?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

// Styles
export const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400',
  form: 'w-full bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
} as const;

export const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
} as const;

const LoadingSpinner = () => {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
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
}, ref) => {
  const isDisabled = disabled || loading || isSubmitting;

  return (
    <motion.button
      ref={ref}
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
});

Button.displayName = 'Button';

export default Button;
