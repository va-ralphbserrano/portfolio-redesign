import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';
import { JSDOM } from 'jsdom';

console.log('Setup: Starting test environment configuration');

// Extend Window interface
declare global {
    interface Window {
        on: (event: string, handler: Function) => void;
        off: (event: string, handler: Function) => void;
        emit: (event: string, ...args: any[]) => void;
        _eventListeners: { eventName: string; handler: Function }[];
    }
}

// Initialize JSDOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    runScripts: 'dangerously',
    resources: 'usable'
});

// Get window instance and set up prototype chain
const window = dom.window;
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

// Set up globals
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

console.log('Setup: Adding event methods to window');

// Add event method aliases with proper event data handling
window.on = function(eventName, handler) {
    if (!handler || typeof handler !== 'function') {
        console.warn('Invalid event handler provided');
        return;
    }

    const wrappedHandler = function(event) {
        try {
            handler.call(this, event);
        } catch (error) {
            console.error('Error in event handler:', error);
        }
    };

    this.addEventListener(eventName, wrappedHandler);
    window._eventListeners.push({ eventName, handler: wrappedHandler });
};

window.off = function(eventName, handler) {
    if (!handler || typeof handler !== 'function') {
        console.warn('Invalid event handler provided');
        return;
    }

    const listenerIndex = window._eventListeners.findIndex(
        listener => listener.eventName === eventName && listener.handler === handler
    );

    if (listenerIndex > -1) {
        this.removeEventListener(eventName, window._eventListeners[listenerIndex].handler);
        window._eventListeners.splice(listenerIndex, 1);
    }
};

window.emit = function(eventName, detail = {}) {
    let event;
    try {
        if (typeof detail === 'object') {
            event = new CustomEvent(eventName, { detail });
        } else {
            event = new Event(eventName);
        }
        this.dispatchEvent(event);
    } catch (error) {
        console.error('Error dispatching event:', error);
        throw error;
    }
};

// Keep track of event listeners for cleanup
window._eventListeners = [];

// Set up React
global.React = React;

// Clean up after each test
afterEach(() => {
    cleanup();
    window._eventListeners = [];
});

// Set up ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

Object.defineProperty(global, 'ResizeObserver', {
    value: MockResizeObserver,
    writable: true,
    configurable: true,
});

// Set up requestAnimationFrame
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 0);
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

// Set up test matchers
expect.extend(matchers);
