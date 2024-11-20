import { JSDOM } from 'jsdom';

// Create base JSDOM instance
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true
});

// Get window instance
const window = dom.window;

// Fix prototype chain
const eventTargetProto = window.EventTarget.prototype;
const windowProto = Object.getPrototypeOf(window);

// Create a new prototype that inherits from EventTarget
const combinedProto = Object.create(eventTargetProto);

// Copy all Window prototype properties
Object.getOwnPropertyNames(windowProto).forEach(prop => {
    const descriptor = Object.getOwnPropertyDescriptor(windowProto, prop);
    if (descriptor && prop !== 'constructor') {
        Object.defineProperty(combinedProto, prop, descriptor);
    }
});

// Set the prototype chain
Object.setPrototypeOf(window, combinedProto);

// Add event method aliases with proper event data handling
window.on = function(eventName, handler) {
    if (!handler || typeof handler !== 'function') {
        console.warn('Invalid event handler provided');
        return;
    }

    const wrappedHandler = function(event) {
        try {
            if (event && event.detail !== undefined) {
                handler.call(this, event.detail);
            } else {
                handler.call(this, event);
            }
        } catch (error) {
            console.error('Error in event handler:', error);
        }
    };

    // Maintain handler reference for removal
    wrappedHandler._originalHandler = handler;
    window._eventListeners = window._eventListeners || [];
    window._eventListeners.push(wrappedHandler);

    window.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
};

window.off = function(eventName, handler) {
    if (!handler) {
        console.warn('No handler provided for event removal');
        return;
    }

    const listeners = window._eventListeners || [];
    const wrappedHandler = listeners.find(l => l._originalHandler === handler);

    if (wrappedHandler) {
        window.removeEventListener(eventName, wrappedHandler);
        window._eventListeners = listeners.filter(l => l !== wrappedHandler);
    } else {
        window.removeEventListener(eventName, handler);
    }
};

window.emit = function(eventName, detail) {
    if (!eventName) {
        console.warn('No event name provided for emit');
        return false;
    }

    let event;
    try {
        if (detail !== undefined && detail !== null) {
            event = new window.CustomEvent(eventName, { 
                detail,
                bubbles: true,
                cancelable: true
            });
        } else {
            event = new window.Event(eventName, {
                bubbles: true,
                cancelable: true
            });
        }
        return window.dispatchEvent(event);
    } catch (error) {
        console.error('Error creating or dispatching event:', error);
        return false;
    }
};

// Keep track of event listeners for cleanup
window._eventListeners = [];

// Verify prototype chain and event methods
const verifyWindow = () => {
    // Verify inheritance
    if (!(window instanceof window.EventTarget)) {
        throw new Error('Window does not properly inherit from EventTarget');
    }

    // Verify core event methods
    if (typeof window.addEventListener !== 'function') {
        throw new Error('Window missing addEventListener method');
    }
    if (typeof window.removeEventListener !== 'function') {
        throw new Error('Window missing removeEventListener method');
    }
    if (typeof window.dispatchEvent !== 'function') {
        throw new Error('Window missing dispatchEvent method');
    }

    // Verify aliases
    if (typeof window.on !== 'function') {
        throw new Error('Window missing "on" method alias');
    }
    if (typeof window.off !== 'function') {
        throw new Error('Window missing "off" method alias');
    }
    if (typeof window.emit !== 'function') {
        throw new Error('Window missing "emit" method alias');
    }

    // Test event handling
    let testPassed = false;
    const handler = () => { testPassed = true; };
    window.on('test', handler);
    window.emit('test');
    window.off('test', handler);
    if (!testPassed) {
        throw new Error('Event system not working properly');
    }
};

// Verify window setup
verifyWindow();

// Set up global variables with verified window object
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
