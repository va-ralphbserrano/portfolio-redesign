type LogLevel = 'info' | 'warn' | 'error';

interface LogOptions {
  level: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

const defaultOptions: LogOptions = {
  level: 'info',
  prefix: '[Portfolio]',
  timestamp: true,
};

const getTimestamp = () => new Date().toISOString();

const formatMessage = (message: string, options: LogOptions = defaultOptions) => {
  const parts = [];
  
  if (options.timestamp) {
    parts.push(`[${getTimestamp()}]`);
  }
  
  if (options.prefix) {
    parts.push(options.prefix);
  }
  
  parts.push(message);
  
  return parts.join(' ');
};

// Use a no-op function in production
const noop = () => {};

// Environment-aware logging functions
/* eslint-disable no-console */
export const logInfo = import.meta.env.DEV
  ? (message: string, ...args: unknown[]) => {
      console.info(formatMessage(message, { ...defaultOptions, level: 'info' }), ...args);
    }
  : noop;

export const logWarn = import.meta.env.DEV
  ? (message: string, ...args: unknown[]) => {
      console.warn(formatMessage(message, { ...defaultOptions, level: 'warn' }), ...args);
    }
  : noop;

export const logError = import.meta.env.DEV
  ? (message: string, ...args: unknown[]) => {
      console.error(formatMessage(message, { ...defaultOptions, level: 'error' }), ...args);
    }
  : noop;
/* eslint-enable no-console */
