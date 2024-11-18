import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Mock section components
vi.mock('@/components/sections/About', () => ({
  default: () => <div data-testid="about-section">About Section</div>
}));

vi.mock('@/components/sections/Portfolio', () => ({
  default: () => <div data-testid="portfolio-section">Portfolio Section</div>
}));

vi.mock('@/components/sections/Services', () => ({
  default: () => <div data-testid="services-section">Services Section</div>
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}));

describe('App Component', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  it('renders navigation menu', () => {
    renderApp();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders logo text', () => {
    renderApp();
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
  });

  it('renders footer content', () => {
    renderApp();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders with dark mode', () => {
    renderApp();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
