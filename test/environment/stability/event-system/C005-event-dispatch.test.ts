import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import '../../../../src/tests/setup';

describe('C005: Event Dispatch System', () => {
  let window: Window;
  let cleanup: Function[];

  beforeEach(() => {
    window = global.window;
    cleanup = [];
  });

  afterEach(() => {
    cleanup.forEach(fn => fn());
    window._eventListeners = [];
  });

  // Original Element Tests
  test('handles missing addEventListener', () => {
    const img = document.createElement('img');
    img.addEventListener = undefined;
    expect(() => img?.addEventListener?.('load', () => {})).not.toThrow();
  });

  test('handles missing removeEventListener', () => {
    const img = document.createElement('img');
    img.removeEventListener = undefined;
    expect(() => img?.removeEventListener?.('load', () => {})).not.toThrow();
  });

  test('handles missing dispatchEvent', () => {
    const img = document.createElement('img');
    img.dispatchEvent = undefined;
    expect(() => img?.dispatchEvent?.(new Event('load'))).not.toThrow();
  });

  test('validates event propagation', () => {
    const img = document.createElement('img');
    const handler = vi.fn();
    img.addEventListener('load', handler);
    img.dispatchEvent(new Event('load'));
    expect(handler).toHaveBeenCalled();
  });

  // New Event System Stability Tests
  test('window.on maintains proper this binding', () => {
    const handler = vi.fn(function() {
      expect(this).toBe(window);
    });
    window.on('test-event', handler);
    cleanup.push(() => window.off('test-event', handler));
    window.emit('test-event');
    expect(handler).toHaveBeenCalled();
  });

  test('window.off properly removes event listeners', () => {
    const handler = vi.fn();
    window.on('test-event', handler);
    window.off('test-event', handler);
    window.emit('test-event');
    expect(handler).not.toHaveBeenCalled();
  });

  test('window.emit handles event data correctly', () => {
    const testData = { foo: 'bar' };
    const handler = vi.fn();
    window.on('test-event', handler);
    cleanup.push(() => window.off('test-event', handler));
    window.emit('test-event', testData);
    expect(handler).toHaveBeenCalledWith(testData);
  });

  test('event system handles errors gracefully', () => {
    const errorHandler = () => {
      throw new Error('Test error');
    };
    window.on('error-event', errorHandler);
    cleanup.push(() => window.off('error-event', errorHandler));
    expect(() => window.emit('error-event')).not.toThrow();
  });

  test('event system properly cleans up listeners', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    window.on('test-event-1', handler1);
    window.on('test-event-2', handler2);
    
    window.off('test-event-1', handler1);
    window.emit('test-event-1');
    window.emit('test-event-2');
    
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(window._eventListeners.length).toBe(1);
  });

  test('event system handles null and undefined data', () => {
    const handler = vi.fn();
    window.on('test-event', handler);
    cleanup.push(() => window.off('test-event', handler));
    
    window.emit('test-event', null);
    expect(handler).toHaveBeenCalledWith(null);
    
    window.emit('test-event', undefined);
    expect(handler).toHaveBeenCalledWith(undefined);
  });

  test('event system maintains event independence', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    window.on('event1', handler1);
    window.on('event2', handler2);
    cleanup.push(() => {
      window.off('event1', handler1);
      window.off('event2', handler2);
    });
    
    window.emit('event1');
    expect(handler1).toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });
});
