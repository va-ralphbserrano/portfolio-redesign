import React from 'react';
import { classNames } from '@/shared/utils/helpers';
import { WithClassName } from '@/types/component';

const variants = {
  primary: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
} as const;

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';

// Common autocomplete values for form fields
type AutocompleteType =
  | 'off' | 'on'
  // Name related
  | 'name' | 'given-name' | 'additional-name' | 'family-name' | 'nickname' | 'organization' | 'organization-title'
  // Contact related
  | 'email' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local'
  // Address related
  | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3'
  | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4'
  | 'country' | 'country-name' | 'postal-code'
  // Payment related
  | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type'
  // Other common fields
  | 'username' | 'new-password' | 'current-password' | 'one-time-code'
  | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year'
  | 'sex' | 'url' | 'photo';

export interface InputProps extends WithClassName, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  name: string;
  label?: string;
  type?: InputType;
  error?: string;
  success?: boolean;
  helperText?: string;
  autoComplete?: AutocompleteType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  success,
  helperText,
  className,
  type = 'text',
  id,
  name,
  autoComplete,
  ...props
}, ref) => {
  const variant = error ? 'error' : success ? 'success' : 'primary';
  const inputId = id || name;
  const descriptionId = helperText || error ? `${inputId}-description` : undefined;

  // Default autocomplete based on name and type if not explicitly provided
  const defaultAutoComplete = !autoComplete ? (
    name === 'email' || type === 'email' ? 'email' :
    name.includes('name') ? 'name' :
    name === 'subject' ? 'off' :
    type === 'password' ? 'current-password' :
    type === 'tel' ? 'tel' :
    'on'
  ) : autoComplete;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          autoComplete={defaultAutoComplete}
          className={classNames(
            'block w-full rounded-md shadow-sm sm:text-sm',
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

Input.displayName = 'Input';

export default Input;
