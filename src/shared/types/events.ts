export type EventListenerCallback = (event: Event) => void;

export interface CustomEventInit<T> extends EventInit {
  detail?: T;
}

export interface ICustomEvent<T> extends CustomEvent<T> {
  readonly detail: T;
}

export interface IEventDispatcher {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  dispatchEvent(event: Event): boolean;
}

export interface CustomEventMap {
  'theme:change': CustomEvent<{ theme: string }>;
  'error:report': CustomEvent<{ error: Error; context?: Record<string, unknown> }>;
  'metric:track': CustomEvent<{ name: string; value: number; metadata?: Record<string, unknown> }>;
  'navigation:start': CustomEvent<{ from: string; to: string }>;
  'navigation:end': CustomEvent<{ from: string; to: string; duration: number }>;
}

declare global {
  interface WindowEventMap extends CustomEventMap {}

  interface Window {
    addEventListener<K extends keyof WindowEventMap>(
      type: K,
      listener: (event: WindowEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof WindowEventMap>(
      type: K,
      listener: (event: WindowEventMap[K]) => void,
      options?: boolean | EventListenerOptions
    ): void;
    dispatchEvent<K extends keyof WindowEventMap>(event: WindowEventMap[K]): boolean;
  }
}

export type EventCallback<T = unknown> = (event: CustomEvent<T>) => void;

export interface IEventEmitter<T = unknown> {
  on(eventName: string, callback: EventCallback<T>): void;
  off(eventName: string, callback: EventCallback<T>): void;
  emit(eventName: string, detail?: T): void;
  once(eventName: string, callback: EventCallback<T>): void;
}

export class EventEmitter<T = unknown> implements IEventEmitter<T> {
  private listeners = new Map<string, Set<EventCallback<T>>>();

  public on(eventName: string, callback: EventCallback<T>): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)?.add(callback);
  }

  public off(eventName: string, callback: EventCallback<T>): void {
    this.listeners.get(eventName)?.delete(callback);
  }

  public emit(eventName: string, detail?: T): void {
    const event = new CustomEvent(eventName, { detail });
    this.listeners.get(eventName)?.forEach(callback => callback(event));
  }

  public once(eventName: string, callback: EventCallback<T>): void {
    const onceCallback = (event: CustomEvent<T>) => {
      callback(event);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
}

export class EventDispatcherImpl implements IEventDispatcher {
  private readonly target: EventTarget;

  constructor() {
    this.target = new EventTarget();
  }

  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.target.addEventListener(type, listener, options);
  }

  public removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    this.target.removeEventListener(type, listener, options);
  }

  public dispatchEvent(event: Event): boolean {
    return this.target.dispatchEvent(event);
  }
}
