import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from '@/components/layout/Navbar';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    renderWithRouter(<Navbar />);
    const menuButton = screen.getByLabelText('Toggle menu');
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles scroll events', () => {
    renderWithRouter(<Navbar />);
    const navbar = screen.getByRole('navigation');
    
    // Simulate scroll
    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(navbar.classList.contains('bg-white/80')).toBe(true);
    
    // Reset scroll
    window.scrollY = 0;
    fireEvent.scroll(window);
    expect(navbar.classList.contains('bg-white/80')).toBe(false);
  });

  it('handles theme toggle', () => {
    renderWithRouter(<Navbar />);
    const themeButton = screen.getByLabelText('Toggle theme');
    
    // Initial state (light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Toggle to dark
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Toggle back to light
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
