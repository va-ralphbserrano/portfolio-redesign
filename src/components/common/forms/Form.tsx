import { classNames } from '@/shared/utils/helpers';
import { WithClassName } from '@/types/component';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

// Form Button Component
export interface FormButtonProps extends WithClassName {
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(({
  type = 'button',
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  onClick,
  children,
  className
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
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
        'relative',
        className
      )}
    >
      <span className={classNames(
        'inline-flex items-center',
        isLoading ? 'invisible' : 'visible'
      )}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2">{loadingText}</span>
        </span>
      )}
    </motion.button>
  );
});

FormButton.displayName = 'FormButton';

// Form Status Component
export interface FormStatusProps extends WithClassName {
  status: 'success' | 'error' | null;
  message?: string;
  onDismiss?: () => void;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  status,
  message,
  onDismiss,
  className
}) => {
  if (!status || !message) return null;

  const isSuccess = status === 'success';
  const Icon = isSuccess ? CheckCircleIcon : ExclamationCircleIcon;

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
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

FormStatus.displayName = 'FormStatus';

// Form Textarea Component
export interface FormTextareaProps extends WithClassName {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      name,
      label,
      placeholder,
      value,
      error,
      rows = 4,
      required = false,
      disabled = false,
      onChange,
      onBlur,
      className
    },
    ref
  ) => {
    return (
      <div className={classNames('space-y-1', className)}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={rows}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames(
            'block w-full px-4 py-3',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-lg shadow-sm',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700',
            className
          )}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
