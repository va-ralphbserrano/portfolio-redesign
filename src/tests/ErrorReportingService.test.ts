import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorReportingService } from '../services/ErrorReportingService';
import { ErrorContext, ErrorSeverity, ErrorCategory } from '../utils/monitoring';

describe('ErrorReportingService', () => {
  let errorReportingService: ErrorReportingService;
  let fetchMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Reset fetch mock
    fetchMock = vi.spyOn(global, 'fetch').mockImplementation(async () =>
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    ) as unknown as ReturnType<typeof vi.spyOn>;

    // Get a fresh instance
    errorReportingService = ErrorReportingService.getInstance();
    errorReportingService.initialize({
      apiEndpoint: '/test/errors'
    });
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('should report errors', async () => {
    const error: ErrorContext = {
      message: 'Test error',
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.NETWORK,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Test error',
      metadata: {}
    };

    errorReportingService.reportError(error);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual(error);
    }
  });

  it('should batch errors', async () => {
    const error1: ErrorContext = {
      message: 'Test error 1',
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.NETWORK,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Test error 1',
      metadata: {}
    };

    const error2: ErrorContext = {
      message: 'Test error 2',
      severity: ErrorSeverity.MEDIUM,
      category: ErrorCategory.JAVASCRIPT,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Test error 2',
      metadata: {}
    };

    errorReportingService.reportError(error1);
    errorReportingService.reportError(error2);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual(error1);
      expect(payload.errors).toContainEqual(error2);
    }
  });

  it('should handle API errors gracefully', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response)
    );

    const error: ErrorContext = {
      message: 'Test error',
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.NETWORK,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Test error',
      metadata: {}
    };

    const consoleErrorSpy = vi.spyOn(console, 'error');

    errorReportingService.reportError(error);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to send errors:',
      'Internal Server Error'
    );

    consoleErrorSpy.mockRestore();
  });

  it('batches errors', async () => {
    const errors = Array.from({ length: 3 }, (_, i) => ({
      message: `Test error ${i}`,
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.NETWORK,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: `Error: Test error ${i}`,
      metadata: {}
    }));

    // Report errors
    for (const error of errors) {
      errorReportingService.reportError(error);
    }

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual(errors[0]);
      expect(payload.errors).toContainEqual(errors[1]);
      expect(payload.errors).toContainEqual(errors[2]);
    }
  });

  it('handles network errors', async () => {
    const error: ErrorContext = {
      message: 'Network error',
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.NETWORK,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Network error',
      metadata: {}
    };

    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    errorReportingService.reportError(error);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual(error);
    }
  });

  it('captures unhandled rejections', async () => {
    const error = new Error('Unhandled rejection');
    const event = new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.reject(error).catch(() => {}),
      reason: error,
      cancelable: true
    });

    window.dispatchEvent(event);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual({
        message: 'Unhandled rejection',
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.JAVASCRIPT,
        timestamp: expect.any(Number),
        url: 'http://test.com',
        userAgent: 'test-agent',
        stack: expect.stringContaining('Unhandled rejection'),
        metadata: {}
      });
    }
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

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual({
        message: 'Failed to load resource',
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.NETWORK,
        timestamp: expect.any(Number),
        url: 'http://test.com',
        userAgent: 'test-agent',
        stack: expect.stringContaining('Failed to load image'),
        metadata: {}
      });
    }

    document.body.removeChild(img);
  });

  it('respects batch size', async () => {
    // Generate errors up to batch size
    const errors = Array.from({ length: 5 }, (_, i) => ({
      message: `Error ${i}`,
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.NETWORK,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: `Error: Error ${i}`,
      metadata: {}
    }));

    // Report errors in sequence
    for (const error of errors) {
      errorReportingService.reportError(error);
    }

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should have been called once with all errors
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.errors).toContainEqual(errors[0]);
      expect(payload.errors).toContainEqual(errors[1]);
      expect(payload.errors).toContainEqual(errors[2]);
      expect(payload.errors).toContainEqual(errors[3]);
      expect(payload.errors).toContainEqual(errors[4]);
    }
  });
});
