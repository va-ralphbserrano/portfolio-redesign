import { vi } from 'vitest';
import { type EventListenerCallback, type TestWindow, type CustomEvent, CustomEventImpl } from '@/shared/types/events';

declare global {
  interface Window extends TestWindow {}
}

export function setupTestEnvironment() {
  const eventListeners = new Map<string, Set<EventListenerCallback>>();

  const mockWindow = {
    _eventListeners: eventListeners,
    on(type: string, callback: EventListenerCallback) {
      if (!eventListeners.has(type)) {
        eventListeners.set(type, new Set());
      }
      eventListeners.get(type)?.add(callback);
    },
    off(type: string, callback: EventListenerCallback) {
      eventListeners.get(type)?.delete(callback);
    },
    emit(type: string, detail?: any) {
      const event = new CustomEventImpl(type, {
        detail,
        bubbles: true,
        cancelable: true
      });
      eventListeners.get(type)?.forEach(callback => callback(event));
    }
  };

  Object.assign(window, mockWindow);

  return {
    resetMocks() {
      eventListeners.clear();
    }
  };
}
