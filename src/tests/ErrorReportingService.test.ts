import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorReportingService } from '../services/ErrorReportingService';
import { ErrorContext } from '../utils/monitoring';
import { mockFetch } from './setup';

describe('ErrorReportingService', () => {
  let service: ErrorReportingService;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    ErrorReportingService.resetInstance();
    service = ErrorReportingService.getInstance();
    service.initialize({
      apiEndpoint: '/test/errors',
      batchSize: 5,
      flushInterval: 5000
    });
  });

  it('batches errors', async () => {
    const errors = Array.from({ length: 3 }, (_, i) => ({
      message: `Test error ${i}`,
      severity: 'high',
      category: 'TEST',
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent'
    }));

    // Report errors
    for (const error of errors) {
      await service.reportError(error);
    }

    // Manually flush errors since we're in test environment
    await vi.runAllTimersAsync();

    expect(mockFetch).toHaveBeenCalledWith(
      '/test/errors',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Test error')
      })
    );
  });

  it('handles network errors', async () => {
    const error: ErrorContext = {
      message: 'Network error',
      severity: 'high',
      category: 'NETWORK',
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent'
    };

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await service.reportError(error);
    await vi.runAllTimersAsync();

    expect(mockFetch).toHaveBeenCalledWith(
      '/test/errors',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Network error')
      })
    );
  });

  it('captures unhandled rejections', async () => {
    const error = new Error('Unhandled rejection');
    const event = new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.reject(error).catch(() => {}),
      reason: error,
      cancelable: true
    });

    window.dispatchEvent(event);
    await vi.runAllTimersAsync();

    expect(mockFetch).toHaveBeenCalledWith(
      '/test/errors',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Unhandled rejection')
      })
    );
  });

  it('captures resource loading errors', async () => {
    const img = document.createElement('img');
    img.src = 'test.jpg';
    document.body.appendChild(img);

    const event = new ErrorEvent('error', {
      error: new Error('Failed to load image'),
      message: 'Failed to load image',
      filename: 'test.jpg'
    });

    img.dispatchEvent(event);
    await vi.runAllTimersAsync();

    expect(mockFetch).toHaveBeenCalledWith(
      '/test/errors',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Failed to load resource')
      })
    );

    document.body.removeChild(img);
  });

  it('respects batch size', async () => {
    // Generate errors up to batch size
    const errors = Array.from({ length: 5 }, (_, i) => ({
      message: `Error ${i}`,
      severity: 'high',
      category: 'TEST',
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent'
    }));

    // Report errors in sequence
    for (const error of errors) {
      service.reportError(error);
    }

    // Wait for final flush
    await vi.runAllTimersAsync();

    // Should have been called once with all errors
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      '/test/errors',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Error 0')
      })
    );
  });
});
