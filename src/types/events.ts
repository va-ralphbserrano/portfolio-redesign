export type EventListenerCallback = (event: Event) => void;

export interface EventEmitter {
  on(event: string, callback: EventListenerCallback): void;
  off(event: string, callback: EventListenerCallback): void;
  emit(event: string, data?: any): void;
}

export interface TestWindow extends Window {
  on<T = any>(type: string, callback: (event: CustomEvent<T>) => void): void;
  off<T = any>(type: string, callback: (event: CustomEvent<T>) => void): void;
  emit(event: string, data?: any): void;
}
