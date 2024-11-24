import React from 'react';
import { classNames } from '@/shared/utils/helpers';
import { WithClassName } from '@/types/component';

const variants = {
  primary: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
} as const;

export interface TextareaProps extends WithClassName, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  name: string;
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  success,
  helperText,
  className,
  id,
  name,
  rows = 5,
  ...props
}, ref) => {
  const variant = error ? 'error' : success ? 'success' : 'primary';
  const inputId = id || name;
  const descriptionId = helperText || error ? `${inputId}-description` : undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          rows={rows}
          className={classNames(
            'block w-full rounded-md shadow-sm sm:text-sm resize-y min-h-[100px]',
            'dark:bg-gray-800 dark:text-white dark:border-gray-700',
            variants[variant],
            props.disabled && 'cursor-not-allowed opacity-50'
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={descriptionId}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p
          id={descriptionId}
          className={classNames(
            'mt-2 text-sm',
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
