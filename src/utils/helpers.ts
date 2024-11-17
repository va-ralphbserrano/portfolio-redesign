// Class names helper
export const classNames = <T extends (string | undefined | null | false)[]>(...classes: T): string => {
  return classes.filter(Boolean).join(' ');
};

interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

// Image optimization helper
export const optimizeImage = <T extends string>(url: T, { width, quality = 75, format = 'webp' }: ImageOptimizationOptions = {}): string => {
  if (!url) return '';
  
  // If it's an external URL, return as is
  if (url.startsWith('http')) return url;

  // For local images, add optimization parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  params.append('q', quality.toString());
  params.append('fm', format);

  return `${url}?${params.toString()}`;
};

// Date formatting helper
export const formatDate = <T extends string | Date>(date: T): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Text truncate helper
export const truncateText = <T extends string>(text: T, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Scroll to element helper
export const scrollToElement = <T extends string>(elementId: T, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

// Form validation helper
export const validateForm = <T extends Record<string, string>>(values: T, rules: ValidationRules): ValidationErrors => {
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

// Debounce helper
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle helper
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Random ID generator
export const generateId = <T extends string>(): T => {
  return Math.random().toString(36).substr(2, 9) as T;
};

// Local storage helper
export const storage = {
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      console.error(`Error reading ${key} from localStorage`);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage`, error);
    }
  }
};
