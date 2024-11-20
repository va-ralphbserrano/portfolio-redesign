import { JSDOM } from 'jsdom';

// ESM module declaration
export interface EventListener {
  eventName: string;
  handler: (event: Event) => void;
}

export interface CustomWindow extends Window {
  _eventListeners: EventListener[];
  on: (eventName: string, handler: (event: Event) => void) => void;
  off: (eventName: string, handler: (event: Event) => void) => void;
  emit: (eventName: string, event?: Event) => void;
}

export function setupTestEnvironment() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    runScripts: 'dangerously',
    resources: 'usable'
  });

  const window = dom.window;

  // Create a proper Event class
  class CustomEvent extends window.Event {
    detail?: any;
    constructor(type: string, eventInitDict: any = {}) {
      super(type, eventInitDict);
      if (eventInitDict.detail) {
        this.detail = eventInitDict.detail;
      }
    }
  }
  window.CustomEvent = CustomEvent;

  // Ensure Window properly inherits from EventTarget
  Object.setPrototypeOf(
    Object.getPrototypeOf(window),
    window.EventTarget.prototype
  );

  // Initialize event listeners array
  (window as CustomWindow)._eventListeners = [];

  // Add core event methods
  (window as CustomWindow).on = function(eventName: string, handler: (event: Event) => void) {
    this.addEventListener(eventName, handler);
    (this as CustomWindow)._eventListeners.push({ eventName, handler });
  };

  (window as CustomWindow).off = function(eventName: string, handler: (event: Event) => void) {
    this.removeEventListener(eventName, handler);
    (this as CustomWindow)._eventListeners = (this as CustomWindow)._eventListeners.filter(
      l => l.eventName !== eventName || l.handler !== handler
    );
  };

  (window as CustomWindow).emit = function(eventName: string, event?: Event) {
    const evt = event || new CustomEvent(eventName);
    this.dispatchEvent(evt);
  };

  // Enhance event dispatch handling
  const originalAddEventListener = window.EventTarget.prototype.addEventListener;
  const originalRemoveEventListener = window.EventTarget.prototype.removeEventListener;
  const originalDispatchEvent = window.EventTarget.prototype.dispatchEvent;

  window.EventTarget.prototype.addEventListener = function(
    type: string,
    listener: EventListener | null,
    options?: boolean | AddEventListenerOptions
  ) {
    if (listener) {
      (window as CustomWindow)._eventListeners.push({ eventName: type, handler: listener as (event: Event) => void });
    }
    return originalAddEventListener.call(this, type, listener, options);
  };

  window.EventTarget.prototype.removeEventListener = function(
    type: string,
    listener: EventListener | null,
    options?: boolean | EventListenerOptions
  ) {
    if (listener) {
      (window as CustomWindow)._eventListeners = (window as CustomWindow)._eventListeners.filter(
        l => l.eventName !== type || l.handler !== listener
      );
    }
    return originalRemoveEventListener.call(this, type, listener, options);
  };

  window.EventTarget.prototype.dispatchEvent = function(event: Event) {
    if (!event.target) {
      Object.defineProperty(event, 'target', {
        value: this,
        writable: false,
        configurable: true
      });
    }
    
    if (!event.currentTarget) {
      Object.defineProperty(event, 'currentTarget', {
        value: this,
        writable: false,
        configurable: true
      });
    }

    return originalDispatchEvent.call(this, event);
  };

  return window as CustomWindow;
}

export function cleanupEventListeners(window: CustomWindow) {
  window._eventListeners.forEach(({ eventName, handler }) => {
    window.removeEventListener(eventName, handler);
  });
  window._eventListeners = [];
}
