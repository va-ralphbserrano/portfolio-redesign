import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AdaptiveContainer } from '@/components/common/AdaptiveContainer';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('AdaptiveContainer', () => {
  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render children correctly', () => {
      render(
        <AdaptiveContainer>
          <div data-testid="child">Test content</div>
        </AdaptiveContainer>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should apply default styles', () => {
      render(
        <AdaptiveContainer>
          <div>Content</div>
        </AdaptiveContainer>
      );
      const container = screen.getByTestId('adaptive-container');
      expect(container).toHaveStyle({
        minWidth: 'auto',
        maxWidth: '100%'
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply responsive padding', () => {
      render(
        <AdaptiveContainer
          padding={{
            base: '1rem',
            md: '2rem'
          }}
        >
          <div>Content</div>
        </AdaptiveContainer>
      );
      
      const container = screen.getByTestId('adaptive-container');
      expect(container).toHaveStyle({ padding: '1rem' });

      // Simulate resize to medium breakpoint
      act(() => {
        window.innerWidth = 768;
        window.dispatchEvent(new Event('resize'));
      });
      expect(container).toHaveStyle({ padding: '2rem' });
    });

    it('should handle custom breakpoints', () => {
      render(
        <AdaptiveContainer
          breakpoints={{
            sm: 480,
            md: 768,
            lg: 1024
          }}
        >
          <div>Content</div>
        </AdaptiveContainer>
      );

      const container = screen.getByTestId('adaptive-container');
      expect(container).toHaveAttribute('data-breakpoints');
    });
  });

  describe('Performance Optimization', () => {
    it('should debounce resize events', async () => {
      const mockResize = vi.fn();
      render(
        <AdaptiveContainer
          performance={{
            monitorResize: true,
            debounceDelay: 150
          }}
          onResize={mockResize}
        >
          <div>Content</div>
        </AdaptiveContainer>
      );

      // Trigger multiple resize events
      act(() => {
        for (let i = 0; i < 5; i++) {
          window.dispatchEvent(new Event('resize'));
        }
      });

      // Wait for debounce
      await vi.advanceTimersByTimeAsync(200);
      expect(mockResize).toHaveBeenCalledTimes(1);
    });

    it('should optimize reflows', () => {
      render(
        <AdaptiveContainer
          performance={{
            optimizeReflows: true
          }}
        >
          <div>Content</div>
        </AdaptiveContainer>
      );

      const container = screen.getByTestId('adaptive-container');
      expect(container).toHaveStyle({
        contain: 'layout',
        willChange: 'contents'
      });
    });
  });

  describe('Accessibility', () => {
    it('should preserve content structure', () => {
      render(
        <AdaptiveContainer>
          <header>Header</header>
          <main>Main</main>
          <footer>Footer</footer>
        </AdaptiveContainer>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });
});
