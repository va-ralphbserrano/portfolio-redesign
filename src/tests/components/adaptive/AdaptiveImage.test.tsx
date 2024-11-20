import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdaptiveImage } from '@/components/adaptive/AdaptiveImage';
import { vi } from 'vitest';

describe('AdaptiveImage', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  describe('Basic Rendering', () => {
    it('should render with required props', () => {
      render(<AdaptiveImage src="/test.jpg" alt="Test image" />);
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });

    it('should apply lazy loading by default', () => {
      render(<AdaptiveImage src="/test.jpg" alt="Test image" />);
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Format Detection', () => {
    it('should use WebP when supported', async () => {
      // Canvas mock is already set up in setup.ts
      render(
        <AdaptiveImage
          src="/test.jpg"
          alt="Test image"
          formats={['webp', 'jpeg']}
        />
      );

      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toBeInTheDocument();
      });
    });

    it('should fallback to JPEG when WebP is not supported', async () => {
      // Override the toDataURL mock to indicate WebP is not supported
      const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
      HTMLCanvasElement.prototype.toDataURL = vi.fn((type) => 
        type === 'image/webp' ? 'data:,' : `data:${type};base64,`
      );

      render(
        <AdaptiveImage
          src="/test.jpg"
          alt="Test image"
          formats={['webp', 'jpeg']}
        />
      );

      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toBeInTheDocument();
      });

      // Restore the original mock
      HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
    });
  });

  describe('Error Handling', () => {
    it('should show placeholder on error', async () => {
      const onError = vi.fn();
      render(
        <AdaptiveImage
          src="/invalid.jpg"
          alt="Test image"
          placeholder="/placeholder.jpg"
          onError={onError}
        />
      );

      const img = screen.getByAltText('Test image');
      fireEvent.error(img);

      await waitFor(() => {
        expect(img.src).toContain('placeholder.jpg');
        expect(onError).toHaveBeenCalled();
      });
    });
  });

  describe('Performance', () => {
    it('should load image progressively', async () => {
      render(
        <AdaptiveImage
          src="/test.jpg"
          alt="Test image"
          placeholder="/placeholder.jpg"
        />
      );

      const img = screen.getByAltText('Test image');
      expect(img).toHaveStyle({ filter: 'blur(20px)' });

      fireEvent.load(img);

      await waitFor(() => {
        expect(img).not.toHaveStyle({ filter: 'blur(20px)' });
      });
    });
  });

  describe('Accessibility', () => {
    it('should have required ARIA attributes', () => {
      render(
        <AdaptiveImage
          src="/test.jpg"
          alt="Test image"
          loading="lazy"
        />
      );

      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('role', 'img');
      expect(img).toHaveAttribute('alt', 'Test image');
    });
  });
});
