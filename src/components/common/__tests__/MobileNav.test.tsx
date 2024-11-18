import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MobileNav from '../MobileNav';
import { navLinks } from '@/data/navigation';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MobileNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderWithRouter(<MobileNav isOpen={true} onClose={() => {}} navLinks={navLinks} />);
    
    navLinks.forEach(link => {
      const linkElement = screen.getByText(link.label);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('does not render when closed', () => {
    const { container } = renderWithRouter(<MobileNav isOpen={false} onClose={() => {}} navLinks={navLinks} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when clicking close button', () => {
    const onClose = vi.fn();
    renderWithRouter(<MobileNav isOpen={true} onClose={onClose} navLinks={navLinks} />);
    
    const closeButton = screen.getByLabelText('Close menu');
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when clicking a link', () => {
    const onClose = vi.fn();
    renderWithRouter(<MobileNav isOpen={true} onClose={onClose} navLinks={navLinks} />);
    
    const firstLink = screen.getByText(navLinks[0]?.label || '');
    if (firstLink) {
      fireEvent.click(firstLink);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('traps focus when open', () => {
    renderWithRouter(<MobileNav isOpen={true} onClose={() => {}} navLinks={navLinks} />);
    
    const closeButton = screen.getByLabelText('Close menu');
    const lastLink = screen.getByText(navLinks[navLinks.length - 1]?.label || '');
    
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
