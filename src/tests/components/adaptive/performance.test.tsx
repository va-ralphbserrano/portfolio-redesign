import { render, act, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { AdaptiveImage, AdaptiveContainer } from '@/components/adaptive';

describe('Adaptive Components Performance', () => {
  beforeEach(() => {
    // Mock performance API
    vi.useFakeTimers();
    performance.mark = vi.fn();
    performance.measure = vi.fn();
    performance.getEntriesByType = vi.fn();
    performance.clearMarks = vi.fn();
    performance.clearMeasures = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('AdaptiveImage Performance', () => {
    it('should load images efficiently', async () => {
      const startTime = performance.now();
      
      render(
        <AdaptiveImage
          src="/test-image.jpg"
          alt="Test image"
          loading="lazy"
          quality={85}
        />
      );

      const loadTime = performance.now() - startTime;
      expect(loadTime).toBeLessThan(100); // Initial render should be fast
    });

    it('should handle multiple format checks efficiently', async () => {
      const startTime = performance.now();
      
      render(
        <AdaptiveImage
          src="/test-image.jpg"
          alt="Test image"
          formats={['webp', 'avif', 'jpeg']}
        />
      );

      const checkTime = performance.now() - startTime;
      expect(checkTime).toBeLessThan(50); // Format checking should be optimized
    });

    it('should not cause layout shifts while loading', () => {
      const { container } = render(
        <AdaptiveImage
          src="/test-image.jpg"
          alt="Test image"
          placeholder="/placeholder.jpg"
        />
      );

      const initialHeight = container.clientHeight;
      
      act(() => {
        const img = container.querySelector('img');
        if (img) {
          fireEvent.load(img);
        }
      });

      expect(container.clientHeight).toBe(initialHeight);
    });
  });

  describe('AdaptiveContainer Performance', () => {
    it('should handle resize events efficiently', () => {
      const onResize = vi.fn();
      const { container } = render(
        <AdaptiveContainer
          performance={{
            monitorResize: true,
            debounceDelay: 150
          }}
          onResize={onResize}
        >
          <div>Test content</div>
        </AdaptiveContainer>
      );

      // Simulate multiple resize events
      for (let i = 0; i < 10; i++) {
        act(() => {
          fireEvent(window, new Event('resize'));
        });
      }

      // Fast forward past debounce time
      act(() => {
        vi.advanceTimersByTime(200);
      });

      // Should only call once due to debouncing
      expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('should optimize reflows', () => {
      const { container } = render(
        <AdaptiveContainer
          performance={{
            optimizeReflows: true
          }}
        >
          <div>Test content</div>
        </AdaptiveContainer>
      );

      const styles = window.getComputedStyle(container.firstChild as Element);
      expect(styles.contain).toBe('layout');
      expect(styles.willChange).toBe('contents');
    });

    it('should handle nested containers efficiently', () => {
      const startTime = performance.now();
      
      render(
        <AdaptiveContainer>
          <AdaptiveContainer>
            <AdaptiveContainer>
              <div>Deeply nested content</div>
            </AdaptiveContainer>
          </AdaptiveContainer>
        </AdaptiveContainer>
      );

      const renderTime = performance.now() - startTime;
      expect(renderTime).toBeLessThan(100); // Nested renders should be optimized
    });
  });

  describe('Memory Usage', () => {
    it('should clean up resources on unmount', () => {
      const { unmount } = render(
        <AdaptiveContainer
          performance={{
            monitorResize: true
          }}
        >
          <AdaptiveImage
            src="/test-image.jpg"
            alt="Test image"
            loading="lazy"
          />
        </AdaptiveContainer>
      );

      // Track memory before unmount
      const heapBefore = process.memoryUsage().heapUsed;
      
      unmount();

      // Memory should be cleaned up
      const heapAfter = process.memoryUsage().heapUsed;
      expect(heapAfter).toBeLessThanOrEqual(heapBefore);
    });
  });

  describe('Bundle Size', () => {
    it('should maintain reasonable bundle size', async () => {
      const moduleSize = await import('@/components/adaptive').then(module => {
        return JSON.stringify(module).length;
      });

      // Size should be reasonable (adjust threshold as needed)
      expect(moduleSize).toBeLessThan(50000);
    });
  });
});
