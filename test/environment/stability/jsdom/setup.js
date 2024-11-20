import { JSDOM } from 'jsdom';

/**
 * Enhanced Window Object Setup
 * Implements proper prototype chain and event handling
 * Related to C001 - Window object stability
 */

function setupWindow() {
    // Create JSDOM instance with required configuration
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
        url: 'http://localhost',
        runScripts: 'dangerously',
        resources: 'usable',
        pretendToBeVisual: true
    });

    const window = dom.window;

    // Create a proper Event class
    class CustomEvent extends window.Event {
        constructor(type, eventInitDict = {}) {
            super(type, eventInitDict);
            if (eventInitDict.detail) {
                this.detail = eventInitDict.detail;
            }
        }
    }
    window.CustomEvent = CustomEvent;

    // Ensure Window properly inherits from EventTarget
    const windowProto = Object.getPrototypeOf(window);
    Object.setPrototypeOf(windowProto, window.EventTarget.prototype);

    // Define non-enumerable event methods that maintain proper this binding
    Object.defineProperties(window, {
        on: {
            value: function(event, handler) {
                if (typeof handler !== 'function') {
                    throw new TypeError('Event handler must be a function');
                }
                this.addEventListener(event, handler);
                return this;
            },
            writable: false,
            configurable: true
        },
        off: {
            value: function(event, handler) {
                if (typeof handler !== 'function') {
                    throw new TypeError('Event handler must be a function');
                }
                this.removeEventListener(event, handler);
                return this;
            },
            writable: false,
            configurable: true
        },
        emit: {
            value: function(event, data) {
                if (typeof event !== 'string') {
                    throw new TypeError('Event name must be a string');
                }
                const evt = new window.CustomEvent(event, { detail: data });
                return this.dispatchEvent(evt);
            },
            writable: false,
            configurable: true
        }
    });

    // Verify the setup
    if (!(window instanceof window.EventTarget)) {
        throw new Error('Window prototype chain setup failed');
    }

    return window;
}

// Export setup function
export { setupWindow };
