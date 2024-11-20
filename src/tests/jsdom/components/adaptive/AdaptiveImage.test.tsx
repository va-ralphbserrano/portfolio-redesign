import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AdaptiveImage } from '../../../../components/adaptive/AdaptiveImage';
import '../../../setup/adaptive-image.setup';

describe('AdaptiveImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with basic props', async () => {
    const onLoad = vi.fn();
    render(
      <AdaptiveImage
        src="test-image.jpg"
        alt="Test image"
        onLoad={onLoad}
      />
    );

    const image = screen.getByTestId('adaptive-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Test image');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('handles loading state correctly', async () => {
    const { container } = render(
      <AdaptiveImage
        src="test-image.jpg"
        alt="Test image"
        placeholder="placeholder.jpg"
      />
    );

    const image = screen.getByTestId('adaptive-image');
    expect(image).toHaveStyleRule('filter', 'blur(20px)');

    // Simulate image load
    image.dispatchEvent(new Event('load'));

    await waitFor(() => {
      expect(image).toHaveStyleRule('filter', 'none');
    });
  });

  it('uses placeholder on error', async () => {
    const onError = vi.fn();
    render(
      <AdaptiveImage
        src="invalid-image.jpg"
        alt="Test image"
        placeholder="placeholder.jpg"
        onError={onError}
      />
    );

    const image = screen.getByTestId('adaptive-image');
    
    // Simulate image error
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(image).toHaveAttribute('src', 'placeholder.jpg');
      expect(onError).toHaveBeenCalled();
    });
  });

  it('generates correct srcSet', async () => {
    render(
      <AdaptiveImage
        src="test-image.jpg"
        alt="Test image"
        formats={['webp']}
        quality={90}
      />
    );

    const image = screen.getByTestId('adaptive-image');
    await waitFor(() => {
      const srcSet = image.getAttribute('srcset');
      expect(srcSet).toContain('w=640');
      expect(srcSet).toContain('q=90');
      expect(srcSet).toContain('fm=webp');
    });
  });

  it('respects loading prop', () => {
    render(
      <AdaptiveImage
        src="test-image.jpg"
        alt="Test image"
        loading="eager"
      />
    );

    const image = screen.getByTestId('adaptive-image');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('handles intersection observer', async () => {
    const onLoad = vi.fn();
    render(
      <AdaptiveImage
        src="test-image.jpg"
        alt="Test image"
        onLoad={onLoad}
      />
    );

    // IntersectionObserver mock will trigger after a tick
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });
});
