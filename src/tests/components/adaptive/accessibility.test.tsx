import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AdaptiveImage, AdaptiveContainer } from '@/components/adaptive';

expect.extend(toHaveNoViolations);

describe('Adaptive Components Accessibility', () => {
  describe('AdaptiveImage Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <AdaptiveImage
          src="/test-image.jpg"
          alt="Test image description"
          loading="lazy"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper alt text', () => {
      render(
        <AdaptiveImage
          src="/test-image.jpg"
          alt="Test image description"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Test image description');
    });

    it('should have proper ARIA attributes when loading', () => {
      render(
        <AdaptiveImage
          src="/test-image.jpg"
          alt="Test image description"
          loading="lazy"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('AdaptiveContainer Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <AdaptiveContainer>
          <div>Test content</div>
        </AdaptiveContainer>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should preserve heading hierarchy', () => {
      render(
        <AdaptiveContainer>
          <h1>Main Heading</h1>
          <section>
            <h2>Subheading</h2>
          </section>
        </AdaptiveContainer>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should maintain focus order', () => {
      render(
        <AdaptiveContainer>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </AdaptiveContainer>
      );
      
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveTextContent('First');
      expect(buttons[1]).toHaveTextContent('Second');
      expect(buttons[2]).toHaveTextContent('Third');
    });

    it('should support reduced motion preferences', () => {
      const mockMatchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }));
      
      window.matchMedia = mockMatchMedia;
      
      render(
        <AdaptiveContainer>
          <div>Test content</div>
        </AdaptiveContainer>
      );
      
      const container = screen.getByTestId('adaptive-container');
      const styles = window.getComputedStyle(container);
      expect(styles.transition).toBe('none');
    });
  });

  describe('Color Contrast', () => {
    it('should maintain proper contrast ratios', async () => {
      const { container } = render(
        <AdaptiveContainer>
          <h1 style={{ color: '#333', backgroundColor: '#fff' }}>
            Test Heading
          </h1>
          <p style={{ color: '#444', backgroundColor: '#fff' }}>
            Test paragraph
          </p>
        </AdaptiveContainer>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation', () => {
      render(
        <AdaptiveContainer>
          <button>First</button>
          <a href="#">Link</a>
          <button>Last</button>
        </AdaptiveContainer>
      );
      
      const elements = screen.getAllByRole('button');
      elements.forEach(element => {
        expect(element).toHaveAttribute('tabIndex', '0');
      });
    });
  });
});
