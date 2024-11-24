import { render, screen } from '@testing-library/react';
import Services from '@/modules/services/components/Services';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Services Component', () => {
  it('renders services section', () => {
    render(<Services />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('displays section title', () => {
    render(<Services />);
    expect(screen.getByText(/services/i)).toBeInTheDocument();
  });

  it('renders service cards', () => {
    render(<Services />);
    const serviceCards = screen.getAllByRole('article');
    expect(serviceCards.length).toBeGreaterThan(0);
  });

  it('applies animation classes', () => {
    render(<Services />);
    const container = screen.getByTestId('services-container');
    expect(container).toHaveAttribute('data-animate');
  });
});
