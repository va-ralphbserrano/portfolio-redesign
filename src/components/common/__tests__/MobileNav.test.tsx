import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileNav } from '@/components/layout/MobileNav';
import { NavLink } from '@/types';

const mockNavLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MobileNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderWithRouter(<MobileNav isOpen={true} onClose={() => {}} navLinks={mockNavLinks} />);
    
    mockNavLinks.forEach(link => {
      const linkElement = screen.getByText(link.name);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('does not render when closed', () => {
    const { container } = renderWithRouter(<MobileNav isOpen={false} onClose={() => {}} navLinks={mockNavLinks} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when clicking close button', () => {
    const onClose = vi.fn();
    renderWithRouter(<MobileNav isOpen={true} onClose={onClose} navLinks={mockNavLinks} />);
    
    const closeButton = screen.getByLabelText('Close menu');
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when clicking a link', () => {
    const onClose = vi.fn();
    renderWithRouter(<MobileNav isOpen={true} onClose={onClose} navLinks={mockNavLinks} />);
    
    const firstLink = screen.getByText(mockNavLinks[0]?.name || '');
    if (firstLink) {
      fireEvent.click(firstLink);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('traps focus when open', () => {
    renderWithRouter(<MobileNav isOpen={true} onClose={() => {}} navLinks={mockNavLinks} />);
    
    const closeButton = screen.getByLabelText('Close menu');
    const lastLink = screen.getByText(mockNavLinks[mockNavLinks.length - 1]?.name || '');
    
    if (closeButton && lastLink) {
      // Focus should move to close button when tabbing from last link
      lastLink.focus();
      fireEvent.keyDown(lastLink, { key: 'Tab' });
      expect(document.activeElement).toBe(closeButton);
      
      // Focus should move to last link when shift+tabbing from close button
      closeButton.focus();
      fireEvent.keyDown(closeButton, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(lastLink);
    }
  });
});
