import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResponsiveImage } from './index';

describe('ResponsiveImage', () => {
  it('renders an image with the correct src and alt text', () => {
    const props = {
      src: '/test-image.jpg',
      alt: 'Test image',
    };

    render(<ResponsiveImage {...props} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  it('applies className correctly', () => {
    const props = {
      src: '/test-image.jpg',
      alt: 'Test image',
      className: 'test-class',
    };

    render(<ResponsiveImage {...props} />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('test-class');
  });

  it('handles loading prop correctly', () => {
    const props = {
      src: '/test-image.jpg',
      alt: 'Test image',
      loading: 'eager' as const,
    };

    render(<ResponsiveImage {...props} />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('handles error state', () => {
    const props = {
      src: '/invalid-image.jpg',
      alt: 'Test image',
    };

    render(<ResponsiveImage {...props} />);
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('error'));
    expect(screen.getByText(/Image failed to load/i)).toBeInTheDocument();
  });
});
