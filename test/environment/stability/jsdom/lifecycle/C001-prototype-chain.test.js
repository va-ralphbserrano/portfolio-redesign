import { JSDOM } from 'jsdom';
import { setupWindow } from '../setup.js';

describe('Window Object Prototype Chain Tests', () => {
    let window;

    beforeEach(async () => {
        window = setupWindow();

        // Wait for document to be ready
        await new Promise(resolve => {
            if (window.document.readyState === 'complete') {
                resolve();
            } else {
                window.document.addEventListener('load', resolve);
            }
        });
    });

    afterEach(() => {
        window.close();
        window = null;
    });

    test('Window should properly inherit from EventTarget', () => {
        expect(window instanceof window.EventTarget).toBe(true);
        expect(Object.getPrototypeOf(Object.getPrototypeOf(window))).toBe(window.EventTarget.prototype);
    });

    test('Window should have proper event methods', () => {
        expect(typeof window.addEventListener).toBe('function');
        expect(typeof window.removeEventListener).toBe('function');
        expect(typeof window.dispatchEvent).toBe('function');
        expect(typeof window.on).toBe('function');
        expect(typeof window.off).toBe('function');
        expect(typeof window.emit).toBe('function');
    });

    test('Event methods should be non-enumerable', () => {
        const props = Object.getOwnPropertyDescriptors(window);
        expect(props.on.enumerable).toBe(false);
        expect(props.off.enumerable).toBe(false);
        expect(props.emit.enumerable).toBe(false);
    });

    test('Event methods should be non-writable', () => {
        const props = Object.getOwnPropertyDescriptors(window);
        expect(props.on.writable).toBe(false);
        expect(props.off.writable).toBe(false);
        expect(props.emit.writable).toBe(false);
    });

    test('Event methods should maintain proper this binding', () => {
        const listener = vi.fn(function() {
            expect(this).toBe(window);
        });
        
        window.on('test', listener);
        window.emit('test');
        
        expect(listener).toHaveBeenCalled();
    });
});
