import type { AtomEffect } from '../types';
import { MonitoringService } from '../../services/MonitoringService';

export function createLoggerEffect<T>(): AtomEffect<T> {
  return {
    onSet: (newValue, oldValue) => {
      console.debug('[State Change]', {
        oldValue,
        newValue,
        timestamp: new Date().toISOString()
      });

      // Track state change in monitoring service
      MonitoringService.trackMetric('state_change', 1, ['state', 'change']);
    },
    onGet: (value) => {
      console.debug('[State Read]', {
        value,
        timestamp: new Date().toISOString()
      });
    },
    onInit: (defaultValue) => {
      console.debug('[State Init]', {
        defaultValue,
        timestamp: new Date().toISOString()
      });
    }
  };
}
