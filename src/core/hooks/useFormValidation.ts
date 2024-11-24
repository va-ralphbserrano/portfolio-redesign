import { useState, useCallback } from 'react';

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((name: string, value: string) => {
    if (!rules[name]) return true;

    const fieldRules = rules[name];
    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  }, [rules]);

  const validateForm = useCallback((data: { [key: string]: string }) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.entries(rules).forEach(([name, fieldRules]) => {
      const value = data[name] || '';
      
      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          newErrors[name] = rule.message;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  };
};

// Common validation rules
export const commonRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: value => value.trim().length > 0,
    message
  }),
  email: (message = 'Invalid email address'): ValidationRule => ({
    validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
  }),
  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule => ({
    validate: value => value.length >= length,
    message
  }),
  maxLength: (length: number, message = `Must be no more than ${length} characters`): ValidationRule => ({
    validate: value => value.length <= length,
    message
  })
};
