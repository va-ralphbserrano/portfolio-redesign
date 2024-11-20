import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupTestEnvironment, cleanupEventListeners, type CustomWindow } from './test.environment';

describe('Event Dispatch System Stability (C005)', () => {
  let testElement: HTMLElement;
  let customWindow: Window & CustomWindow;

  beforeEach(() => {
    // Initialize test environment for each test
    const env = setupTestEnvironment();
    Object.entries(env).forEach(([key, value]) => {
      try {
        (global as any)[key] = value;
      } catch (error) {
        Object.defineProperty(global, key, {
          get() { return value; }
        });
      }
    });
    customWindow = window as Window & CustomWindow;
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    if (testElement && testElement.parentNode) {
      document.body.removeChild(testElement);
    }
    cleanupEventListeners(customWindow);
  });

  describe('Basic Event Handling', () => {
    it('should properly dispatch and handle click events', () => {
      let clicked = false;
      const handler = () => { clicked = true; };
      testElement.addEventListener('click', handler);

      fireEvent.click(testElement);
      expect(clicked).toBe(true);
    });

    it('should handle multiple event listeners in correct order', () => {
      const sequence: number[] = [];
      const handler1 = () => sequence.push(1);
      const handler2 = () => sequence.push(2);

      testElement.addEventListener('click', handler1);
      testElement.addEventListener('click', handler2);

      fireEvent.click(testElement);
      expect(sequence).toEqual([1, 2]);
    });
  });

  describe('Event Object Properties', () => {
    it('should create proper event objects with correct properties', () => {
      const eventProps: Partial<Event> = {};
      const handler = (event: Event) => {
        eventProps.type = event.type;
        eventProps.target = event.target;
        eventProps.currentTarget = event.currentTarget;
        eventProps.bubbles = event.bubbles;
        eventProps.cancelable = event.cancelable;
      };

      testElement.addEventListener('click', handler);
      fireEvent.click(testElement);

      expect(eventProps.type).toBe('click');
      expect(eventProps.target).toBe(testElement);
      expect(eventProps.currentTarget).toBe(testElement);
      expect(eventProps.bubbles).toBe(true);
      expect(eventProps.cancelable).toBe(true);
    });

    it('should handle custom events with detail', () => {
      const customEvent = new CustomEvent('test-event', {
        detail: { data: 'test' },
        bubbles: true,
        cancelable: true
      });

      let receivedDetail = null;
      const handler = (event: CustomEvent) => {
        receivedDetail = event.detail.data;
      };

      testElement.addEventListener('test-event', handler);
      testElement.dispatchEvent(customEvent);
      
      expect(receivedDetail).toBe('test');
    });
  });

  describe('Event Propagation', () => {
    let parent: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      parent = document.createElement('div');
      child = document.createElement('div');
      parent.appendChild(child);
      document.body.appendChild(parent);
    });

    afterEach(() => {
      if (parent && parent.parentNode) {
        document.body.removeChild(parent);
      }
    });

    it('should properly bubble events up the DOM tree', () => {
      const sequence: string[] = [];
      const childHandler = () => sequence.push('child');
      const parentHandler = () => sequence.push('parent');

      child.addEventListener('click', childHandler);
      parent.addEventListener('click', parentHandler);

      fireEvent.click(child);
      expect(sequence).toEqual(['child', 'parent']);
    });

    it('should respect stopPropagation', () => {
      const sequence: string[] = [];
      const childHandler = (event: Event) => {
        sequence.push('child');
        event.stopPropagation();
      };
      const parentHandler = () => sequence.push('parent');

      child.addEventListener('click', childHandler);
      parent.addEventListener('click', parentHandler);

      fireEvent.click(child);
      expect(sequence).toEqual(['child']);
    });
  });
});
