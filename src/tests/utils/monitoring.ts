import type { Metric } from 'web-vitals';

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Error categories
export enum ErrorCategory {
  PERFORMANCE = 'performance',
  RESOURCE = 'resource',
  JAVASCRIPT = 'javascript',
  NETWORK = 'network',
  SECURITY = 'security'
}

// Error context interface
export interface ErrorContext {
  message: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: number;
  url: string;
  userAgent: string;
  stack?: string | undefined;
  metadata?: Record<string, unknown> | undefined;
}

// Performance metric interface
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  navigationType?: string;
}

class MonitoringService {
  private static instance: MonitoringService;
  private errorBuffer: ErrorContext[] = [];
  private metricBuffer: PerformanceMetric[] = [];
  private readonly bufferSize = 10;
  private readonly flushInterval = 5000; // 5 seconds

  private constructor() {
    this.setupErrorHandling();
    this.setupPerformanceMonitoring();
    this.startBufferFlush();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private setupErrorHandling(): void {
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.JAVASCRIPT,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        stack: event.error?.stack,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.JAVASCRIPT,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        stack: event.reason?.stack,
      });
    });
  }

  private setupPerformanceMonitoring(): void {
    // Monitor resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target instanceof HTMLElement) {
        this.reportError({
          message: `Failed to load resource: ${event.target.tagName.toLowerCase()}`,
          severity: ErrorSeverity.MEDIUM,
          category: ErrorCategory.RESOURCE,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          metadata: {
            resourceType: event.target.tagName.toLowerCase(),
            source: (event.target as HTMLImageElement | HTMLScriptElement).src || 
                   (event.target as HTMLLinkElement).href
          }
        });
      }
    }, true);

    // Monitor network errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          this.reportError({
            message: `HTTP Error: ${response.status} ${response.statusText}`,
            severity: ErrorSeverity.MEDIUM,
            category: ErrorCategory.NETWORK,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metadata: {
              status: response.status,
              statusText: response.statusText,
              url: args[0]
            }
          });
        }
        return response;
      } catch (error) {
        this.reportError({
          message: 'Network request failed',
          severity: ErrorSeverity.HIGH,
          category: ErrorCategory.NETWORK,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          stack: error instanceof Error ? error.stack : undefined,
          metadata: { url: args[0] }
        });
        throw error;
      }
    };
  }

  public reportError(context: ErrorContext): void {
    this.errorBuffer.push(context);
    if (this.errorBuffer.length >= this.bufferSize) {
      this.flushErrorBuffer();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Report]', context);
    }
  }

  public reportMetric(metric: Metric): void {
    const performanceMetric: PerformanceMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
      timestamp: Date.now(),
      navigationType: metric.navigationType
    };

    this.metricBuffer.push(performanceMetric);
    if (this.metricBuffer.length >= this.bufferSize) {
      this.flushMetricBuffer();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance Metric]', performanceMetric);
    }
  }

  private async flushErrorBuffer(): Promise<void> {
    if (this.errorBuffer.length === 0) return;

    try {
      // In production, send to error reporting service
      if (process.env.NODE_ENV === 'production') {
        // TODO: Replace with actual error reporting service
        // await fetch('/api/errors', {
        //   method: 'POST',
        //   body: JSON.stringify(this.errorBuffer)
        // });
      }
    } catch (error) {
      console.error('Failed to flush error buffer:', error);
    }

    this.errorBuffer = [];
  }

  private async flushMetricBuffer(): Promise<void> {
    if (this.metricBuffer.length === 0) return;

    try {
      // In production, send to monitoring service
      if (process.env.NODE_ENV === 'production') {
        // TODO: Replace with actual monitoring service
        // await fetch('/api/metrics', {
        //   method: 'POST',
        //   body: JSON.stringify(this.metricBuffer)
        // });
      }
    } catch (error) {
      console.error('Failed to flush metric buffer:', error);
    }

    this.metricBuffer = [];
  }

  private startBufferFlush(): void {
    setInterval(() => {
      this.flushErrorBuffer();
      this.flushMetricBuffer();
    }, this.flushInterval);
  }
}

export const monitoringService = MonitoringService.getInstance();

// Export a function to report errors from anywhere in the app
export function reportError(
  message: string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  category: ErrorCategory = ErrorCategory.JAVASCRIPT,
  metadata?: Record<string, unknown>
): void {
  monitoringService.reportError({
    message,
    severity,
    category,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    metadata
  });
}

// Export a function to report performance metrics
export function reportPerformanceMetric(metric: Metric): void {
  monitoringService.reportMetric(metric);
}
