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
class MockResizeObserver implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    void callback;
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback) {
    void callback;
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});

// Mock PromiseRejectionEvent
class MockPromiseRejectionEvent extends Event implements PromiseRejectionEvent {
  readonly promise: Promise<any>;
  readonly reason: any;

  constructor(type: string, init: PromiseRejectionEventInit) {
    super(type, { cancelable: true });
    this.promise = init.promise;
    this.reason = init.reason;
  }
}

Object.defineProperty(window, 'PromiseRejectionEvent', {
  writable: true,
  configurable: true,
  value: MockPromiseRejectionEvent
});

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

// Mock Web Vitals
vi.mock('web-vitals', () => ({
  onLCP: vi.fn(),
  onFID: vi.fn(),
  onCLS: vi.fn(),
  onTTFB: vi.fn(),
  onFCP: vi.fn()
}));

// Mock window.scrollTo
window.scrollTo = vi.fn().mockImplementation((x: number, y: number) => {
  window.pageXOffset = x;
  window.pageYOffset = y;
});

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    nav: 'nav',
    button: 'button'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock window.getComputedStyle
global.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn(),
}));

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockFetch.mockReset();
  mockFetch.mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }));
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});
