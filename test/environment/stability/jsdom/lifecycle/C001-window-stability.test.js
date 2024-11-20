import { setupWindow } from '../setup.js';

describe('Window Object Stability Tests', () => {
    let window;

    beforeEach(() => {
        window = setupWindow();
    });

    afterEach(() => {
        window.close();
        window = null;
    });

    test('Window object maintains prototype chain integrity', () => {
        expect(window instanceof window.EventTarget).toBe(true);
        expect(Object.getPrototypeOf(Object.getPrototypeOf(window))).toBe(window.EventTarget.prototype);
    });

    test('Window object has proper event methods', () => {
        expect(typeof window.addEventListener).toBe('function');
        expect(typeof window.removeEventListener).toBe('function');
        expect(typeof window.dispatchEvent).toBe('function');
        expect(typeof window.on).toBe('function');
        expect(typeof window.off).toBe('function');
        expect(typeof window.emit).toBe('function');
    });

    test('Event methods maintain proper this binding', () => {
        const handler = function() {
            expect(this).toBe(window);
        };
        window.on('test', handler);
        window.emit('test');
    });

    test('Event methods handle invalid inputs', () => {
        expect(() => window.on('test', 'not a function')).toThrow(TypeError);
        expect(() => window.off('test', 123)).toThrow(TypeError);
        expect(() => window.emit(123)).toThrow(TypeError);
    });

    test('CustomEvent works correctly', () => {
        const data = { foo: 'bar' };
        let receivedData = null;

        window.addEventListener('custom', (e) => {
            receivedData = e.detail;
        });

        window.emit('custom', data);
        expect(receivedData).toEqual(data);
    });

    test('Window object maintains stability after initialization', () => {
        expect(window).toBeDefined();
        expect(window.document).toBeDefined();
        expect(window.addEventListener).toBeDefined();
        expect(window.removeEventListener).toBeDefined();
        expect(window.dispatchEvent).toBeDefined();
        expect(window.Event).toBeDefined();
        expect(window.CustomEvent).toBeDefined();
    });

    test('Window event methods are properly bound', () => {
        const handler = () => {};
        expect(() => window.addEventListener('test', handler)).not.toThrow();
        expect(() => window.removeEventListener('test', handler)).not.toThrow();
        expect(() => window.dispatchEvent(new window.Event('test'))).not.toThrow();
    });

    test('Window event methods maintain correct context', () => {
        let eventContext = null;
        const handler = function() { eventContext = this; };
        window.addEventListener('test', handler);
        window.dispatchEvent(new window.Event('test'));
        expect(eventContext).toBe(window);
    });

    test('Window event system handles multiple events correctly', () => {
        const events = [];
        const handler1 = () => events.push('handler1');
        const handler2 = () => events.push('handler2');

        window.addEventListener('test', handler1);
        window.addEventListener('test', handler2);
        window.dispatchEvent(new window.Event('test'));

        expect(events).toEqual(['handler1', 'handler2']);
    });

    test('Window event system handles event removal correctly', () => {
        const events = [];
        const handler = () => events.push('handled');

        window.addEventListener('test', handler);
        window.removeEventListener('test', handler);
        window.dispatchEvent(new window.Event('test'));

        expect(events).toEqual([]);
    });

    test('Window event system maintains order under stress', () => {
        const events = [];
        const handlers = Array.from({ length: 100 }, (_, i) => () => events.push(i));

        // Add all handlers
        handlers.forEach(handler => window.addEventListener('test', handler));

        // Dispatch event
        window.dispatchEvent(new window.Event('test'));

        // Verify order
        expect(events).toEqual(Array.from({ length: 100 }, (_, i) => i));
    });
});
