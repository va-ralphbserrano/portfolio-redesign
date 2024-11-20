/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        include: [
            '**/*.{test,spec}.{js,jsx,ts,tsx}'
        ],
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./setup.js'],
        testTimeout: 10000
    }
});
