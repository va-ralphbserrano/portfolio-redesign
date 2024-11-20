import { JSDOM } from 'jsdom';

describe('JSDOM Initialization Tests', () => {
    test('JSDOM initialization stability', async () => {
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
            url: 'http://localhost',
            runScripts: 'dangerously',
            resources: 'usable',
            pretendToBeVisual: true
        });

        const window = dom.window;

        // Wait for document to be ready
        await new Promise(resolve => {
            if (window.document.readyState === 'complete') {
                resolve();
            } else {
                window.document.addEventListener('load', resolve);
            }
        });

        // Test basic initialization
        expect(dom).toBeDefined();
        expect(window).toBeDefined();
        expect(window.document).toBeDefined();
        expect(window.document.body).toBeDefined();

        // Test event handling capabilities
        expect(window.EventTarget).toBeDefined();
        expect(window.addEventListener).toBeDefined();
        expect(window.removeEventListener).toBeDefined();
        expect(window.dispatchEvent).toBeDefined();

        // Test default properties
        expect(window.location.href).toBe('http://localhost/');
        expect(window.document.documentElement.tagName).toBe('HTML');
        expect(window.document.readyState).toBe('complete');

        // Test DOM manipulation
        const div = window.document.createElement('div');
        div.textContent = 'Test';
        window.document.body.appendChild(div);
        expect(window.document.body.innerHTML).toBe('<div>Test</div>');
        expect(window.document.querySelector('div')).toBe(div);

        // Test stability under load
        for (let i = 0; i < 100; i++) {
            const tempDiv = window.document.createElement('div');
            window.document.body.appendChild(tempDiv);
            window.document.body.removeChild(tempDiv);
        }

        // Add and remove event listeners
        const handler = () => {};
        for (let i = 0; i < 100; i++) {
            window.addEventListener('test', handler);
            window.removeEventListener('test', handler);
        }

        // Verify final state
        expect(window.document.body.children.length).toBe(1); // Original div still present
        expect(window).toBeDefined();
        expect(window.document).toBeDefined();

        // Cleanup
        window.close();
    });
});
