import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('C002 - JSDOM Initialization Stability', () => {
    let dom;
    let window;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
            url: 'http://localhost',
            runScripts: 'dangerously',
            resources: 'usable',
            pretendToBeVisual: true
        });
        window = dom.window;
    });

    afterEach(() => {
        window.close();
        window = null;
        dom = null;
    });

    it('should properly initialize JSDOM with all required features', () => {
        expect(dom).toBeDefined();
        expect(window).toBeDefined();
        expect(window.document).toBeDefined();
        expect(window.document.body).toBeDefined();
    });

    it('should support event handling capabilities', () => {
        expect(window.EventTarget).toBeDefined();
        expect(window.addEventListener).toBeDefined();
        expect(window.removeEventListener).toBeDefined();
        expect(window.dispatchEvent).toBeDefined();
    });

    it('should initialize with correct default properties', () => {
        expect(window.location.href).toBe('http://localhost/');
        expect(window.document.documentElement.tagName).toBe('HTML');
        expect(window.document.readyState).toBe('complete');
    });

    it('should support DOM manipulation', () => {
        const div = window.document.createElement('div');
        div.textContent = 'Test';
        window.document.body.appendChild(div);
        expect(window.document.body.innerHTML).toBe('<div>Test</div>');
        expect(window.document.querySelector('div')).toBe(div);
    });

    it('should maintain stability after multiple operations', async () => {
        // Create and remove elements
        for (let i = 0; i < 100; i++) {
            const div = window.document.createElement('div');
            window.document.body.appendChild(div);
            window.document.body.removeChild(div);
        }

        // Add and remove event listeners
        const handler = () => {};
        for (let i = 0; i < 100; i++) {
            window.addEventListener('test', handler);
            window.removeEventListener('test', handler);
        }

        // Verify stability
        expect(window.document.body.children.length).toBe(0);
        expect(window).toBeDefined();
        expect(window.document).toBeDefined();
    });
});
