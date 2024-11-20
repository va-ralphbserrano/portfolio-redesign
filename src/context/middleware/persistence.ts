import type { AtomEffect } from '../types';
import { ErrorReportingService } from '../../services/ErrorReportingService';

export function createPersistenceEffect<T>(key: string): AtomEffect<T> {
  return {
    onSet: (newValue) => {
      try {
        localStorage.setItem(
          `state_${key}`,
          JSON.stringify({
            value: newValue,
            timestamp: Date.now()
          })
        );
      } catch (error) {
        ErrorReportingService.captureError(error);
      }
    },
    onInit: (defaultValue) => {
      try {
        const stored = localStorage.getItem(`state_${key}`);
        if (stored) {
          const { value, timestamp } = JSON.parse(stored);
          // Check if stored value is not too old (24 hours)
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            return value;
          }
        }
      } catch (error) {
        ErrorReportingService.captureError(error);
      }
      return defaultValue;
    }
  };
}
