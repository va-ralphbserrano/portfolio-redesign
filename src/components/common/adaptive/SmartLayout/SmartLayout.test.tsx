import { render, screen } from '@testing-library/react';
import { SmartLayout } from './SmartLayout';
import { vi } from 'vitest';

// Mock the hooks
vi.mock('@/hooks/useWindowSize', () => ({
  useWindowSize: () => ({ width: 1024, height: 768 }),
}));

vi.mock('react-intersection-observer', () => ({
  useInView: () => [null, true],
}));

describe('SmartLayout', () => {
  it('renders children correctly', () => {
    render(
      <SmartLayout>
        <div data-testid="test-child">Test Content</div>
      </SmartLayout>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct spacing classes', () => {
    const { container } = render(
      <SmartLayout spacing="compact">
        <div>Test Content</div>
      </SmartLayout>
    );

    expect(container.firstChild).toHaveClass('gap-2', 'p-2');
  });

  it('applies custom className', () => {
    const { container } = render(
      <SmartLayout className="custom-class">
        <div>Test Content</div>
      </SmartLayout>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles animation prop correctly', () => {
    const { container } = render(
      <SmartLayout animate={false}>
        <div>Test Content</div>
      </SmartLayout>
    );

    expect(container.firstChild).not.toHaveStyle({ opacity: 0 });
  });
});
