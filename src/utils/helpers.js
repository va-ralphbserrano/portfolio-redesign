// Class names helper
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Image optimization helper
export const optimizeImage = (url, { width, quality = 75, format = 'webp' } = {}) => {
  if (!url) return '';
  
  // If it's an external URL, return as is
  if (url.startsWith('http')) return url;

  // For local images, add optimization parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width);
  params.append('q', quality);
  params.append('fm', format);

  return `${url}?${params.toString()}`;
};

// Date formatter
export const formatDate = (date, locale = 'en-US') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Text truncate helper
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

// Scroll to element helper
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

// Form validation helper
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !value) {
      errors[field] = 'This field is required';
    } else if (fieldRules.email && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = 'Please enter a valid email';
    } else if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters`;
    }
  });

  return errors;
};

// Debounce helper
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle helper
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Random ID generator
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, length + 2);
};

// Local storage helper
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  }
};
