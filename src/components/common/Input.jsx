import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const variants = {
  primary: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
};

const Input = forwardRef(({
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
          ref={ref}
          className={inputClasses}
          rows={4}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
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

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'textarea']),
  variant: PropTypes.oneOf(['primary', 'error', 'success']),
  required: PropTypes.bool
};

export default Input;
