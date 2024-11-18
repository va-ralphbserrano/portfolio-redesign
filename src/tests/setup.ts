import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock fetch
export const mockFetch = vi.fn();
global.fetch = mockFetch;

// Set test environment
process.env.NODE_ENV = 'test';

// Mock performance API
global.performance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn()
} as any;

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = MockIntersectionObserver;

// Mock matchMedia
global.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}));

// Mock console methods
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn()
};

// Mock PromiseRejectionEvent
class MockPromiseRejectionEvent extends Event {
  promise: Promise<any>;
  reason: any;

  constructor(type: string, init: { promise: Promise<any>, reason: any, cancelable?: boolean }) {
    super(type, { cancelable: init.cancelable });
    this.promise = init.promise;
    this.reason = init.reason;
  }
}
global.PromiseRejectionEvent = MockPromiseRejectionEvent;

// Mock Web Vitals
vi.mock('web-vitals', () => ({
  onLCP: vi.fn(),
  onFID: vi.fn(),
  onCLS: vi.fn(),
  onTTFB: vi.fn(),
  onFCP: vi.fn()
}));

// Reset mocks before each test
beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }));
});
