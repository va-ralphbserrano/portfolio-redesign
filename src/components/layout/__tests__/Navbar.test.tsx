import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar Component', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders without crashing', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('handles scroll events', () => {
    renderWithRouter(<Navbar />);
    fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    expect(screen.getByRole('banner')).toHaveClass('bg-white/75');
  });
});
