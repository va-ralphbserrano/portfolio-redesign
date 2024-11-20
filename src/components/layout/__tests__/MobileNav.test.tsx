import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import MobileNav from '../MobileNav';

const mockNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MobileNav Component', () => {
  it('renders mobile menu button', () => {
    renderWithRouter(<MobileNav navLinks={mockNavLinks} />);
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('opens menu when button is clicked', () => {
    renderWithRouter(<MobileNav navLinks={mockNavLinks} />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays all navigation links when menu is open', () => {
    renderWithRouter(<MobileNav navLinks={mockNavLinks} />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    
    mockNavLinks.forEach(link => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it('closes menu when a link is clicked', () => {
    renderWithRouter(<MobileNav navLinks={mockNavLinks} />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    expect(screen.queryByRole('navigation')).not.toBeVisible();
  });
});
