import emailjs from '@emailjs/browser';
import { LRUCache } from 'lru-cache';
import { FormState } from '@/components/sections/contact/types';

// Rate limiting configuration
const rateLimitCache = new LRUCache<string, number>({
  max: 500, // Maximum number of items to store
  ttl: 1000 * 60 * 60, // 1 hour TTL
});

// Rate limit settings
const RATE_LIMITS = {
  MINUTE: 5,
  HOUR: 50,
  DAY: 500,
};

// Error types
export enum EmailErrorType {
  RATE_LIMIT = 'RATE_LIMIT',
  INVALID_INPUT = 'INVALID_INPUT',
  SERVICE_ERROR = 'SERVICE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

// Custom error class
export class EmailError extends Error {
  constructor(
    public type: EmailErrorType,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'EmailError';
  }
}

// Input validation
function validateEmailInput(data: FormState): void {
  const { name, email, subject, message } = data;

  if (!name || typeof name !== 'string' || name.length < 2) {
    throw new EmailError(
      EmailErrorType.INVALID_INPUT,
      'Name must be at least 2 characters long'
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new EmailError(
      EmailErrorType.INVALID_INPUT,
      'Please provide a valid email address'
    );
  }

  if (!subject || typeof subject !== 'string' || subject.length < 3) {
    throw new EmailError(
      EmailErrorType.INVALID_INPUT,
      'Subject must be at least 3 characters long'
    );
  }

  if (!message || typeof message !== 'string' || message.length < 10) {
    throw new EmailError(
      EmailErrorType.INVALID_INPUT,
      'Message must be at least 10 characters long'
    );
  }
}

// Rate limiting check
export function checkRateLimit(email: string): void {
  const currentCount = rateLimitCache.get(email) || 0;

  if (currentCount >= RATE_LIMITS.MINUTE) {
    throw new EmailError(
      EmailErrorType.RATE_LIMIT,
      'Too many requests. Please try again later.',
      { remainingTime: rateLimitCache.getRemainingTTL(email) }
    );
  }

  rateLimitCache.set(email, currentCount + 1);
}

// Send email
export async function sendEmail(data: FormState): Promise<void> {
  try {
    // Validate input
    validateEmailInput(data);

    // Check rate limit
    checkRateLimit(data.email);

    // Send email using EmailJS
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    // Re-throw custom errors
    if (error instanceof EmailError) {
      throw error;
    }

    // Handle other errors
    if (error instanceof Error) {
      // Log error for monitoring but don't expose details
      const errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };

      // Log error only in development
      if (import.meta.env.DEV) {
        console.error('Email service error:', errorDetails);
      }

      throw new EmailError(
        EmailErrorType.SERVICE_ERROR,
        'Failed to send email. Please try again later.'
      );
    }

    // Handle unknown errors
    throw new EmailError(
      EmailErrorType.SERVICE_ERROR,
      'An unexpected error occurred'
    );
  }
}
