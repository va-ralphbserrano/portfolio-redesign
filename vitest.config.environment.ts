import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/environment/stability/setup.ts'],
    include: ['test/environment/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage/environment',
      include: ['test/environment/**/*.{js,ts}'],
      exclude: [
        'node_modules',
        'test/environment/**/*.{test,spec}.{js,ts}',
        'coverage/**'
      ],
      all: true,
      lines: 85,
      functions: 90,
      branches: 80,
      statements: 85
    },
    reporters: ['default', 'json'],
    outputFile: {
      json: './test-results/environment.json'
    }
  },
  resolve: {
    alias: {
      '@test': resolve(__dirname, './test'),
      '@environment': resolve(__dirname, './test/environment')
    }
  }
});
