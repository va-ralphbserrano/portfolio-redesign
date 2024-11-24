import { render, screen } from '@testing-library/react';
import { ServiceCard } from '@/modules/services/components/ServiceCard';
import { FaCode } from 'react-icons/fa';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const mockService = {
  id: '1',
  title: 'Test Service',
  description: 'Test Description',
  icon: FaCode
};

describe('ServiceCard Component', () => {
  it('renders service information', () => {
    render(<ServiceCard {...mockService} />);
    
    expect(screen.getByText(mockService.title)).toBeInTheDocument();
    expect(screen.getByText(mockService.description)).toBeInTheDocument();
  });
});
