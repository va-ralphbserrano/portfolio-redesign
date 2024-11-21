interface EventListenerCallback {
  (event: Event): void;
}

interface CustomEventMap {
  [key: string]: EventListenerCallback;
}

interface BaseWindow extends Window {
  _eventListeners: Map<string, Set<EventListenerCallback>>;
}

export interface CustomWindow extends BaseWindow {
  on(type: string, callback: EventListenerCallback): void;
  off(type: string, callback: EventListenerCallback): void;
  emit(type: string, detail?: any): void;
}

export interface CustomEvent<T = any> extends Event {
  detail: T;
  initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void;
}

declare global {
  interface Window extends BaseWindow {}
}
