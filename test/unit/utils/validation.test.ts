import { validateForm } from '@/shared/utils/helpers';
import type { ValidationRules } from '@/shared/utils/helpers';

describe('validateForm utility', () => {
  it('validates required fields', () => {
    const values = {
      name: '',
      email: 'test@example.com'
    };

    const rules: ValidationRules = {
      name: { required: true, message: 'Name is required' },
      email: { required: true }
    };

    const errors = validateForm(values, rules);
    expect(errors).toEqual({
      name: 'Name is required'
    });
  });

  it('validates email format', () => {
    const values = {
      email: 'invalid-email'
    };

    const rules: ValidationRules = {
      email: { 
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format'
      }
    };

    const errors = validateForm(values, rules);
    expect(errors).toEqual({
      email: 'Invalid email format'
    });
  });

  it('validates minimum length', () => {
    const values = {
      password: '123'
    };

    const rules: ValidationRules = {
      password: { 
        minLength: 6,
        message: 'Password must be at least 6 characters'
      }
    };

    const errors = validateForm(values, rules);
    expect(errors).toEqual({
      password: 'Password must be at least 6 characters'
    });
  });

  it('validates maximum length', () => {
    const values = {
      username: 'verylongusername'
    };

    const rules: ValidationRules = {
      username: { 
        maxLength: 10,
        message: 'Username cannot exceed 10 characters'
      }
    };

    const errors = validateForm(values, rules);
    expect(errors).toEqual({
      username: 'Username cannot exceed 10 characters'
    });
  });

  it('returns empty object for valid values', () => {
    const values = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secure123'
    };

    const rules: ValidationRules = {
      name: { required: true },
      email: { 
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: { minLength: 6 }
    };

    const errors = validateForm(values, rules);
    expect(errors).toEqual({});
  });

  it('handles multiple validation rules for a single field', () => {
    const values = {
      password: '123'
    };

    const rules: ValidationRules = {
      password: {
        required: true,
        minLength: 6,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: 'Password must be at least 6 characters and contain letters and numbers'
      }
    };

    const errors = validateForm(values, rules);
    expect(errors.password).toBeDefined();
  });
});
