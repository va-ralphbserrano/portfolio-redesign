// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TouchableCard from '../TouchableCard';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('TouchableCard', () => {
  it('renders children correctly', () => {
    renderWithRouter(
      <TouchableCard>
        <div>Test Content</div>
      </TouchableCard>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    renderWithRouter(
      <TouchableCard onClick={handleClick}>
        <div>Clickable Content</div>
      </TouchableCard>
    );
    
    fireEvent.click(screen.getByText('Clickable Content'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles', () => {
    renderWithRouter(
      <TouchableCard>
        <div>Hover Content</div>
      </TouchableCard>
    );
    
    const card = screen.getByText('Hover Content').closest('div');
    expect(card).toHaveClass('transition-shadow');
    expect(card).toHaveClass('hover:shadow-xl');
  });

  it('renders as a link when href is provided', () => {
    renderWithRouter(
      <TouchableCard href="/test">
        <div>Link Content</div>
      </TouchableCard>
    );
    
    const link = screen.getByText('Link Content').closest('a');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    renderWithRouter(
      <TouchableCard onClick={handleClick}>
        <div>Interactive Content</div>
      </TouchableCard>
    );
    
    const card = screen.getByText('Interactive Content').closest('div');
    if (card) {
      card.focus();
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    }
  });
});
