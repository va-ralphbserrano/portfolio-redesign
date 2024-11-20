import { vi, act } from 'vitest';
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

interface IntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
  boundingClientRect: DOMRectReadOnly;
  intersectionRatio: number;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  time: number;
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [0];
  private callback: IntersectionObserverCallback;
  private elements: Set<Element>;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(target: Element): void {
    this.elements.add(target);

    // Simulate intersection
    act(() => {
      const entry: IntersectionObserverEntry = {
        target,
        isIntersecting: true,
        boundingClientRect: target.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: target.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now()
      };

      this.callback([entry], this);
    });
  }

  unobserve(target: Element): void {
    this.elements.delete(target);
  }

  disconnect(): void {
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
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

export function setupAdaptiveImage(): void {
  // Mock Image loading
  Object.defineProperty(window.Image.prototype, 'src', {
    set(src: string) {
      if (src) {
        setTimeout(() => {
          if (this.onload) {
            this.onload();
          }
        }, 10);
      }
    }
  });
}
