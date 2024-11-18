import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the lazy-loaded components
vi.mock('@/components/sections/Hero', () => ({
  default: () => <div>Hero Section</div>
}));

vi.mock('@/components/sections/About', () => ({
  default: () => <div>About Section</div>
}));

vi.mock('@/components/sections/Services', () => ({
  default: () => <div>Services Section</div>
}));

vi.mock('@/components/sections/Portfolio', () => ({
  default: () => <div>Portfolio Section</div>
}));

vi.mock('@/components/sections/Certificates', () => ({
  default: () => <div>Certificates Section</div>
}));

vi.mock('@/components/sections/Contact', () => ({
  default: () => <div>Contact Section</div>
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('App Component', () => {
  it('renders navigation menu', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getAllByRole('link', { name: /home/i })[0];
    const aboutLink = screen.getAllByRole('link', { name: /about/i })[0];
    const servicesLink = screen.getAllByRole('link', { name: /services/i })[0];
    const portfolioLink = screen.getAllByRole('link', { name: /portfolio/i })[0];
    const contactLink = screen.getAllByRole('link', { name: /contact/i })[0];

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(servicesLink).toHaveAttribute('href', '/services');
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders logo text', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Ralph')).toBeInTheDocument();
    expect(screen.getByText('.dev')).toBeInTheDocument();
  });

  it('renders footer content', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText(/passionate Virtual Assistant/)).toBeInTheDocument();
  });

  it('renders with dark mode', () => {
    // Mock matchMedia for dark mode
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderWithRouter(<App />);
    const mainElement = document.querySelector('div.dark\\:bg-gray-900');
    expect(mainElement).toBeInTheDocument();
  });
});
