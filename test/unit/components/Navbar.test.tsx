import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@/shared/components/layout/Navbar';

describe('Navbar', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    renderNavbar();
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes mobile menu when clicking outside', () => {
    renderNavbar();
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);
    const overlay = screen.getByTestId('mobile-menu-overlay');
    fireEvent.click(overlay);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies scroll styles when scrolling', () => {
    renderNavbar();
    global.scrollY = 50;
    fireEvent.scroll(window);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('bg-white/80');
  });
});
