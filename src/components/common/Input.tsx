import React, { forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

const variants = {
  primary: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
} as const;

type InputVariant = keyof typeof variants;
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea';

interface BaseInputProps {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  className?: string;
  variant?: InputVariant;
  required?: boolean;
}

interface TextareaProps extends BaseInputProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseInputProps> {
  type: 'textarea';
}

interface StandardInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps> {
  type?: Exclude<InputType, 'textarea'>;
}

type InputProps = TextareaProps | StandardInputProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  label,
  error,
  success,
  helperText,
  className,
  type = 'text',
  variant = 'primary',
  required,
  ...props
}, ref) => {
  const inputClasses = classNames(
    'block w-full rounded-lg shadow-sm transition-colors duration-200',
    'dark:bg-gray-800 dark:text-white dark:border-gray-700',
    variants[error ? 'error' : success ? 'success' : variant],
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={inputClasses}
          rows={4}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          className={inputClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {(error || success || helperText) && (
        <p
          className={classNames(
            'text-sm mt-1',
            error ? 'text-red-600 dark:text-red-400' :
            success ? 'text-green-600 dark:text-green-400' :
            'text-gray-500 dark:text-gray-400'
          )}
        >
          {error || success || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
