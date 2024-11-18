import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('renders with default size', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass('border-4', 'border-gray-300', 'border-t-primary', 'rounded-full', 'w-8', 'h-8');
  });

  it('renders with small size', () => {
    render(<Loading size="small" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveClass('border-4', 'border-gray-300', 'border-t-primary', 'rounded-full', 'w-4', 'h-4');
  });

  it('renders with large size', () => {
    render(<Loading size="large" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveClass('border-4', 'border-gray-300', 'border-t-primary', 'rounded-full', 'w-12', 'h-12');
  });

  it('applies custom className', () => {
    const customClass = 'custom-test-class';
    render(<Loading className={customClass} />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement.parentElement).toHaveClass(customClass);
  });

  it('has proper ARIA attributes', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveAttribute('aria-label', 'Loading');
  });
});
