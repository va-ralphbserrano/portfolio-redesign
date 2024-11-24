import { render, screen } from '@testing-library/react';
import { About } from '@/modules/about/components/About';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('About Component', () => {
  it('renders about section with correct content', () => {
    render(<About />);
    
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/tools/i)).toBeInTheDocument();
  });
});
