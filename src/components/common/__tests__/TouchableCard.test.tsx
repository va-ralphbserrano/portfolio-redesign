// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TouchableCard from '../TouchableCard';

describe('TouchableCard', () => {
  it('renders children correctly', () => {
    render(
      <TouchableCard>
        <div>Test Content</div>
      </TouchableCard>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(
      <TouchableCard onClick={handleClick}>
        <div>Clickable Content</div>
      </TouchableCard>
    );
    
    fireEvent.click(screen.getByText('Clickable Content'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles', () => {
    render(
      <TouchableCard>
        <div>Hover Content</div>
      </TouchableCard>
    );
    
    const card = screen.getByText('Hover Content').parentElement;
    expect(card).toHaveClass('hover:scale-[1.02]');
  });

  it('applies custom className', () => {
    render(
      <TouchableCard className="custom-class">
        <div>Custom Content</div>
      </TouchableCard>
    );
    
    const card = screen.getByText('Custom Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    render(
      <TouchableCard onClick={handleClick}>
        <div>Keyboard Content</div>
      </TouchableCard>
    );
    
    const card = screen.getByText('Keyboard Content').parentElement;
    if (card) {
      card.focus();
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      fireEvent.keyDown(card, { key: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    }
  });
});
