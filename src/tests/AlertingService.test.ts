import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AlertingService } from '../services/AlertingService';
import { ErrorContext, ErrorSeverity, ErrorCategory, PerformanceMetric, MetricRating, NavigationType } from '../utils/monitoring';

describe('AlertingService', () => {
  let alertingService: AlertingService;
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
    alertingService = AlertingService.getInstance();
    alertingService.initialize({
      apiEndpoint: '/test/alerts'
    });
  });

  afterEach(() => {
    fetchMock.mockRestore();
    alertingService.dispose();
  });

  it('should report metrics and trigger alerts', async () => {
    const metric: PerformanceMetric = {
      name: 'LCP',
      value: 3000,
      rating: MetricRating.NEEDS_IMPROVEMENT,
      timestamp: Date.now(),
      navigationType: NavigationType.NAVIGATE,
      metadata: {}
    };

    alertingService.reportMetric(metric);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.metrics).toContainEqual(metric);
    }
  });

  it('should report errors', async () => {
    const error: ErrorContext = {
      message: 'Test error',
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.JAVASCRIPT,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Test error',
      metadata: {}
    };

    alertingService.reportError(error);

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

  it('should batch metrics and errors', async () => {
    const metric1: PerformanceMetric = {
      name: 'LCP',
      value: 3000,
      rating: MetricRating.NEEDS_IMPROVEMENT,
      timestamp: Date.now(),
      navigationType: NavigationType.NAVIGATE,
      metadata: {}
    };

    const metric2: PerformanceMetric = {
      name: 'FID',
      value: 150,
      rating: MetricRating.NEEDS_IMPROVEMENT,
      timestamp: Date.now(),
      navigationType: NavigationType.NAVIGATE,
      metadata: {}
    };

    alertingService.reportMetric(metric1);
    alertingService.reportMetric(metric2);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls;
    if (calls?.[0]?.[1]) {
      const requestInit = calls[0][1] as { body: string };
      const payload = JSON.parse(requestInit.body);
      expect(payload.metrics).toContainEqual(metric1);
      expect(payload.metrics).toContainEqual(metric2);
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
      category: ErrorCategory.JAVASCRIPT,
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent',
      stack: 'Error: Test error',
      metadata: {}
    };

    const consoleErrorSpy = vi.spyOn(console, 'error');

    alertingService.reportError(error);

    // Wait for flush interval
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to send alerts:',
      'Internal Server Error'
    );

    consoleErrorSpy.mockRestore();
  });
});
