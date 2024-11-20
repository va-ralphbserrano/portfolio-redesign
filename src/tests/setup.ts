import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';
import { JSDOM } from 'jsdom';
import { TextDecoder, TextEncoder } from 'util';
import { vi } from 'vitest';

console.log('Setup: Starting test environment configuration');

// Define base window interface
interface BaseWindow {
  TextDecoder: typeof TextDecoder;
  TextEncoder: typeof TextEncoder;
  addEventListener: Window['addEventListener'];
  removeEventListener: Window['removeEventListener'];
  dispatchEvent: Window['dispatchEvent'];
  setTimeout: Window['setTimeout'];
  clearTimeout: Window['clearTimeout'];
  requestAnimationFrame: Window['requestAnimationFrame'];
  cancelAnimationFrame: Window['cancelAnimationFrame'];
}

// Define custom event handling interface
interface EventHandling {
  on: (event: string, handler: EventListener) => void;
  off: (event: string, handler: EventListener) => void;
  emit: (event: string, detail?: Record<string, unknown>) => void;
  _eventListeners: Array<{ eventName: string; handler: EventListener }>;
}

// Combine interfaces
interface CustomWindow extends BaseWindow, EventHandling {}

// Extend global Window interface
declare global {
  interface Window extends CustomWindow {}
}

// Initialize JSDOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  runScripts: 'dangerously',
  resources: 'usable',
});

// Get window instance and set up prototype chain
const customWindow = dom.window as unknown as Window & typeof globalThis;

// Add missing properties to window
Object.defineProperty(customWindow, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});

Object.defineProperty(customWindow, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [0];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    this.callback = callback;
  }

  observe(target: Element): void {
    // Simulate an intersection after a short delay
    const timeoutId = setTimeout(() => {
      this.callback([
        {
          target,
          isIntersecting: true,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry
      ], this);
    }, 100);
  }

  unobserve(_target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

// Add IntersectionObserver to window
Object.defineProperty(customWindow, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock requestAnimationFrame
const requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return window.setTimeout(() => callback(Date.now()), 0);
};

const cancelAnimationFrame = (handle: number): void => {
  window.clearTimeout(handle);
};

// Add RAF methods to window
Object.defineProperty(customWindow, 'requestAnimationFrame', {
  writable: true,
  value: requestAnimationFrame,
});

Object.defineProperty(customWindow, 'cancelAnimationFrame', {
  writable: true,
  value: cancelAnimationFrame,
});

// Add event handling methods
customWindow.on = function(this: Window, eventName: string, handler: EventListener): void {
  this.addEventListener(eventName, handler);
  this._eventListeners = this._eventListeners || [];
  this._eventListeners.push({ eventName, handler });
};

customWindow.off = function(this: Window, eventName: string, handler: EventListener): void {
  this.removeEventListener(eventName, handler);
  this._eventListeners = this._eventListeners || [];
  const index = this._eventListeners.findIndex(
    listener => listener.eventName === eventName && listener.handler === handler
  );
  if (index !== -1) {
    this._eventListeners.splice(index, 1);
  }
};

customWindow.emit = function(this: Window, eventName: string, detail: Record<string, unknown> = {}): void {
  const event = new CustomEvent(eventName, { detail });
  this.dispatchEvent(event);
};

// Initialize event listeners array
customWindow._eventListeners = [];

// Clean up after each test
afterEach(() => {
  cleanup();
  customWindow._eventListeners.forEach(({ eventName, handler }) => {
    customWindow.removeEventListener(eventName, handler);
  });
  customWindow._eventListeners = [];
});

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(_target: Element): void {}
  unobserve(_target: Element): void {}
  disconnect(): void {}
}

// Add ResizeObserver to window
Object.defineProperty(global, 'ResizeObserver', {
  value: MockResizeObserver,
  writable: true,
  configurable: true,
});

// Set up globals
global.document = customWindow.document;
global.navigator = customWindow.navigator;
global.Element = customWindow.Element;
global.HTMLElement = customWindow.HTMLElement;
global.React = React;

console.log('Setup: Adding event methods to window');

const mockWindow: CustomWindow = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  setTimeout: vi.fn().mockReturnValue(1),
  clearTimeout: vi.fn(),
  requestAnimationFrame: vi.fn().mockReturnValue(1),
  cancelAnimationFrame: vi.fn(),
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true
});

// Set up test matchers
expect.extend(matchers);
