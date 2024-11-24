import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupTestEnvironment } from '../../test.environment';
import type { CustomEvent } from '@/types/events';
import { EventDispatcher } from '@/shared/types/events';

class TestEventDispatcher implements EventDispatcher {
  private listeners: Map<string, Set<Function>> = new Map();

  addEventListener(type: string, listener: Function): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  removeEventListener(type: string, listener: Function): void {
    this.listeners.get(type)?.delete(listener);
  }

  dispatchEvent(event: CustomEvent): boolean {
    const listeners = this.listeners.get(event.type);
    if (!listeners) return false;

    listeners.forEach(listener => listener(event));
    return true;
  }

  emit(type: string, detail?: any): void {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

describe('Event System', () => {
  let env: ReturnType<typeof setupTestEnvironment>;
  let dispatcher: TestEventDispatcher;

  beforeEach(() => {
    env = setupTestEnvironment();
    dispatcher = new TestEventDispatcher();
  });

  it('should register event listeners correctly', () => {
    const mockCallback = vi.fn();
    dispatcher.addEventListener('test', mockCallback);
    dispatcher.emit('test');
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should remove event listeners correctly', () => {
    const mockCallback = vi.fn();
    dispatcher.addEventListener('test', mockCallback);
    dispatcher.removeEventListener('test', mockCallback);
    dispatcher.emit('test');
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should handle multiple listeners for the same event', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();
    dispatcher.addEventListener('test', mockCallback1);
    dispatcher.addEventListener('test', mockCallback2);
    dispatcher.emit('test');
    expect(mockCallback1).toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalled();
  });

  it('should pass event data to listeners as CustomEvent', () => {
    const mockCallback = vi.fn();
    const testData = { foo: 'bar' };
    dispatcher.addEventListener('test', mockCallback);
    dispatcher.emit('test', testData);
    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'test',
        detail: testData,
        bubbles: true,
        cancelable: true
      })
    );
    const event = mockCallback.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual(testData);
  });

  it('should not call removed listeners', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();
    dispatcher.addEventListener('test', mockCallback1);
    dispatcher.addEventListener('test', mockCallback2);
    dispatcher.removeEventListener('test', mockCallback1);
    dispatcher.emit('test');
    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalled();
  });

  it('should handle multiple events independently', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();
    dispatcher.addEventListener('test1', mockCallback1);
    dispatcher.addEventListener('test2', mockCallback2);
    dispatcher.emit('test1');
    expect(mockCallback1).toHaveBeenCalled();
    expect(mockCallback2).not.toHaveBeenCalled();
  });

  it('should maintain separate listener sets for different events', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();
    dispatcher.addEventListener('test1', mockCallback1);
    dispatcher.addEventListener('test2', mockCallback2);
    dispatcher.emit('test1');
    dispatcher.emit('test2');
    expect(mockCallback1).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    env.resetMocks();
  });
});
