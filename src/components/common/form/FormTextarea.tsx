import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import React, { forwardRef } from 'react';

interface FormTextareaProps extends WithClassName {
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

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
            {required && <span className="text-red-500 ml-1">*</span>}
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
            'bg-white dark:bg-gray-800',
            'border border-gray-300 dark:border-gray-700',
            'rounded-lg shadow-sm',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-700',
            className
          )}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
