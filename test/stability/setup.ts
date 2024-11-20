import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach } from 'vitest';
import { setupTestEnvironment } from './test.environment';

console.log('Stability Tests: Initializing test environment');

// Initialize test environment
const customWindow = setupTestEnvironment();

// Define global window object
Object.defineProperty(global, 'window', {
  value: customWindow,
  writable: true,
  configurable: true,
  enumerable: true
});

// Set up test matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});
