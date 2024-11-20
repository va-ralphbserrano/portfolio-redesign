/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { setupTestEnvironment } from './test.environment';

// Initialize test environment
const env = setupTestEnvironment();
Object.assign(global, env);

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        runScripts: 'dangerously',
        pretendToBeVisual: true,
      }
    },
    setupFiles: [
      './test/stability/setup.ts'
    ],
    include: [
      'test/stability/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src'),
      '@test': path.resolve(__dirname, '..'),
      '@stability': path.resolve(__dirname, '.')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
});
