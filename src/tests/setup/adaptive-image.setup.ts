import { vi } from 'vitest';
import { matchers } from '@emotion/jest';

// Add emotion matchers
expect.extend(matchers);

// Mock canvas and image support
const createMockImage = () => {
  const img = {
    onload: null,
    onerror: null,
    src: '',
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
    addEventListener: vi.fn((event, handler) => {
      if (event === 'load') img.onload = handler;
      if (event === 'error') img.onerror = handler;
    }),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn((event) => {
      if (event.type === 'load' && img.onload) img.onload(event);
      if (event.type === 'error' && img.onerror) img.onerror(event);
      return true;
    }),
  };
  return img;
};

const mockCanvas = {
  toDataURL: vi.fn().mockImplementation((type) => `data:${type},`),
};

global.document.createElement = vi.fn().mockImplementation((tag) => {
  if (tag === 'canvas') return mockCanvas;
  if (tag === 'img') return createMockImage();
  return {};
});

// Mock URL
class MockURL {
  searchParams: URLSearchParams;
  constructor(url: string, base?: string) {
    this.searchParams = new URLSearchParams();
  }
}

global.URL = MockURL as any;

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe() {
    // Simulate element coming into view
    setTimeout(() => {
      this.callback([
        {
          isIntersecting: true,
          intersectionRatio: 1,
        } as IntersectionObserverEntry,
      ] as IntersectionObserverEntry[], this);
    }, 0);
  }
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock window events
window.addEventListener = vi.fn();
window.removeEventListener = vi.fn();
window.dispatchEvent = vi.fn();

// Mock format support
HTMLCanvasElement.prototype.toDataURL = vi.fn().mockImplementation((type) => `data:${type},`);

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost',
  },
  writable: true,
});

// Clean up function
export const cleanup = () => {
  vi.clearAllMocks();
};
