import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useFocusTrap } from '../useFocusTrap';

const TestComponent: React.FC = () => {
  const ref = useFocusTrap();

  return (
    <div ref={ref}>
      <button>First</button>
      <button>Second</button>
      <button>Third</button>
    </div>
  );
};

describe('useFocusTrap', () => {
  it('should trap focus within the container', () => {
    const { getByText } = render(<TestComponent />);
    const firstButton = getByText('First');
    const secondButton = getByText('Second');
    const thirdButton = getByText('Third');

    // Focus first button
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    // Tab forward
    fireEvent.keyDown(firstButton, { key: 'Tab' });
    expect(document.activeElement).toBe(secondButton);

    fireEvent.keyDown(secondButton, { key: 'Tab' });
    expect(document.activeElement).toBe(thirdButton);

    // Tab forward from last element should focus first element
    fireEvent.keyDown(thirdButton, { key: 'Tab' });
    expect(document.activeElement).toBe(firstButton);

    // Tab backward
    fireEvent.keyDown(firstButton, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(thirdButton);

    fireEvent.keyDown(thirdButton, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(secondButton);

    fireEvent.keyDown(secondButton, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(firstButton);
  });
});
