import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AlertingService } from '../services/AlertingService';
import { PerformanceMetric, ErrorContext, ErrorSeverity } from '../utils/monitoring';
import { mockFetch } from './setup';

describe('AlertingService', () => {
  let service: AlertingService;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    AlertingService.resetInstance();
    service = AlertingService.getInstance();
    service.initialize({
      apiEndpoint: '/test/alerts',
      webhooks: []
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('triggers alert for high LCP', async () => {
    const metric: PerformanceMetric = {
      name: 'LCP',
      value: 5000,
      rating: 'poor',
      navigationType: 'navigate',
      timestamp: Date.now()
    };

    await service.checkMetric(metric);

    expect(mockFetch).toHaveBeenCalledWith(
      '/test/alerts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('LCP')
      })
    );
  });

  it('triggers alert for critical error', async () => {
    const error: ErrorContext = {
      message: 'Critical error',
      severity: ErrorSeverity.CRITICAL,
      category: 'JAVASCRIPT',
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent'
    };

    await service.checkError(error);

    expect(mockFetch).toHaveBeenCalledWith(
      '/test/alerts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Critical error')
      })
    );
  });

  it('respects cooldown period', async () => {
    const metric: PerformanceMetric = {
      name: 'LCP',
      value: 5000,
      rating: 'poor',
      navigationType: 'navigate',
      timestamp: Date.now()
    };

    // First alert
    await service.checkMetric(metric);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Second alert within cooldown
    await service.checkMetric(metric);
    expect(mockFetch).toHaveBeenCalledTimes(1); // Should not trigger again

    // Advance time past cooldown
    vi.advanceTimersByTime(300000); // 5 minutes
    vi.runAllTimers();
    vi.advanceTimersByTime(1000); // Extra second to be safe

    // Third alert after cooldown
    await service.checkMetric(metric);
    expect(mockFetch).toHaveBeenCalledTimes(2); // Should trigger again
  });

  it('sends alerts to webhooks', async () => {
    const webhookUrl = 'http://test-webhook.com';
    service = AlertingService.getInstance(); // Get fresh instance
    service.initialize({
      apiEndpoint: '/test/alerts',
      webhooks: [webhookUrl]
    });

    const error: ErrorContext = {
      message: 'Critical error',
      severity: ErrorSeverity.CRITICAL,
      category: 'JAVASCRIPT',
      timestamp: Date.now(),
      url: 'http://test.com',
      userAgent: 'test-agent'
    };

    await service.checkError(error);

    // Should call both the API endpoint and webhook
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // Check API endpoint call
    expect(mockFetch).toHaveBeenCalledWith(
      '/test/alerts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Critical error')
      })
    );

    // Check webhook call
    expect(mockFetch).toHaveBeenCalledWith(
      webhookUrl,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('Critical error')
      })
    );
  });

  it('tracks error rate', async () => {
    // Generate multiple errors
    for (let i = 0; i < 10; i++) {
      const error: ErrorContext = {
        message: `Error ${i}`,
        severity: ErrorSeverity.HIGH,
        category: 'JAVASCRIPT',
        timestamp: Date.now(),
        url: 'http://test.com',
        userAgent: 'test-agent'
      };

      await service.checkError(error);
      vi.advanceTimersByTime(1000); // Space out errors
    }

    // Should trigger high error rate alert
    expect(mockFetch).toHaveBeenCalledWith(
      '/test/alerts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('High error rate')
      })
    );
  });
});
