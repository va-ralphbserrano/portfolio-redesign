import type { AtomEffect } from '../types';
import { ErrorReportingService } from '../../services/ErrorReportingService';

export function createValidationEffect<T>(
  validate: (value: T) => boolean,
  errorMessage: string = 'Invalid state value'
): AtomEffect<T> {
  return {
    onSet: (newValue, oldValue) => {
      try {
        if (!validate(newValue)) {
          ErrorReportingService.captureError(new Error(errorMessage));
          return oldValue;
        }
        return newValue;
      } catch (error) {
        ErrorReportingService.captureError(error);
        return oldValue;
      }
    },
    onInit: (defaultValue) => {
      try {
        if (!validate(defaultValue)) {
          ErrorReportingService.captureError(
            new Error('Invalid default state value')
          );
        }
      } catch (error) {
        ErrorReportingService.captureError(error);
      }
      return defaultValue;
    }
  };
}
