import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '@/modules/contact/components/Contact';
import { vi, describe, it, beforeEach, expect } from 'vitest';

// Mock validateForm function
vi.mock('@/shared/utils/helpers', () => ({
  validateForm: vi.fn(() => ({})),
  getAnimationVariant: vi.fn(),
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form correctly', () => {
    render(<Contact />);
    
    // Check for form elements
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(<Contact />);
    
    // Fill out form
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Test message' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for form submission
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  it('displays validation errors', async () => {
    const mockValidateForm = vi.importActual('@/shared/utils/helpers').validateForm;
    mockValidateForm.mockReturnValue({
      name: 'Name is required',
      email: 'Invalid email format',
    });

    render(<Contact />);
    
    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Check for error messages
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it('applies correct animation variants', () => {
    render(<Contact />);
    const form = screen.getByTestId('contact-form');
    expect(form).toHaveAttribute('data-motion', 'fade-up');
  });
});
