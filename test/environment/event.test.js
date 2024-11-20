import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import './setup';

describe('Event System', () => {
    let window;
    let eventFired;
    let eventData;

    beforeEach(() => {
        window = global.window;
        eventFired = false;
        eventData = null;
    });

    afterEach(() => {
        // Clean up any remaining event listeners
        window._eventListeners = [];
    });

    test('should properly bind event listeners', () => {
        const handler = function(data) {
            eventFired = true;
            eventData = data;
            expect(this).toBe(window); // Check correct this binding
        };

        window.on('test-event', handler);
        window.emit('test-event', { foo: 'bar' });

        expect(eventFired).toBe(true);
        expect(eventData).toEqual({ foo: 'bar' });
    });

    test('should handle event removal correctly', () => {
        const handler = () => { eventFired = true; };
        
        window.on('test-event', handler);
        window.off('test-event', handler);
        window.emit('test-event');

        expect(eventFired).toBe(false);
    });

    test('should handle multiple events independently', () => {
        let event1Fired = false;
        let event2Fired = false;

        window.on('event1', () => { event1Fired = true; });
        window.on('event2', () => { event2Fired = true; });

        window.emit('event1');
        expect(event1Fired).toBe(true);
        expect(event2Fired).toBe(false);

        window.emit('event2');
        expect(event2Fired).toBe(true);
    });

    test('should handle errors in event handlers gracefully', () => {
        const errorHandler = () => {
            throw new Error('Test error');
        };

        // Should not throw when adding handler
        expect(() => {
            window.on('error-event', errorHandler);
        }).not.toThrow();

        // Should not throw when emitting event
        expect(() => {
            window.emit('error-event');
        }).not.toThrow();
    });

    test('should handle null and undefined event data', () => {
        let receivedData;
        const handler = (data) => {
            receivedData = data;
        };

        window.on('test-event', handler);
        
        window.emit('test-event', null);
        expect(receivedData).toBeNull();

        window.emit('test-event', undefined);
        expect(receivedData).toBeUndefined();
    });
});
