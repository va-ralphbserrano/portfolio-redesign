import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { FormFieldProps } from '../types';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  rows,
  className
}) => {
  const Field = rows ? 'textarea' : 'input';

  return (
    <div className={classNames('space-y-1', className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={classNames(
          'block w-full px-4 py-2 rounded-lg border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 transition-colors',
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500'
        )}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';

export default FormField;
