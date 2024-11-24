/**
 * Validates form values against a set of rules
 * @param values - Form values to validate
 * @param rules - Validation rules to apply
 * @returns Object containing validation errors
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = (values: Record<string, string>, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = values[field];

    if (rule?.required && !value) {
      errors[field] = rule?.message || 'This field is required';
    }

    if (value && rule?.minLength && value.length < rule?.minLength) {
      errors[field] = rule?.message || `Minimum length is ${rule?.minLength} characters`;
    }

    if (value && rule?.maxLength && value.length > rule?.maxLength) {
      errors[field] = rule?.message || `Maximum length is ${rule?.maxLength} characters`;
    }

    if (value && rule?.pattern && !rule?.pattern.test(value)) {
      errors[field] = rule?.message || 'Invalid format';
    }
  });

  return errors;
};
