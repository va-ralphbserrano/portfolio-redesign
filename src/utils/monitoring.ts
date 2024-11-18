import { Metric } from 'web-vitals';
import { AlertingService } from '@/services/AlertingService';
import { ErrorReportingService } from '@/services/ErrorReportingService';

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Error categories
export enum ErrorCategory {
  JAVASCRIPT = 'javascript',
  NETWORK = 'network',
  RESOURCE = 'resource',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  BUSINESS = 'business'
}

// Metric rating types
export enum MetricRating {
  GOOD = 'good',
  NEEDS_IMPROVEMENT = 'needs-improvement',
  POOR = 'poor'
}

// Navigation types
export enum NavigationType {
  NAVIGATE = 'navigate',
  RELOAD = 'reload',
  BACK_FORWARD = 'back-forward',
  PRERENDER = 'prerender'
}

// Error context interface
export interface ErrorContext {
  message: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: number;
  url: string;
  userAgent: string;
  stack: string;
  metadata: Record<string, unknown>;
}

// Performance metric interface
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: MetricRating;
  timestamp: number;
  navigationType: NavigationType;
  metadata: Record<string, unknown>;
}

// Resource metadata interface
export interface ResourceMetadata {
  type: string;
  size: number;
  duration: number;
  protocol: string;
  status?: number;
}

// Navigation metadata interface
export interface NavigationMetadata {
  type: NavigationType;
  duration: number;
  redirectCount: number;
  size: number;
}

// Metric metadata type
export type MetricMetadata = ResourceMetadata | NavigationMetadata;

// Error reporter interface
export interface ErrorReporter {
  reportError(error: ErrorContext): void;
  dispose(): void;
}

// Metric collector interface
export interface MetricCollector {
  reportMetric(metric: PerformanceMetric): void;
  dispose(): void;
}

// Monitoring config interface
export interface MonitoringConfig {
  errorEndpoint: string;
  metricEndpoint: string;
  batchSize?: number;
  flushInterval?: number;
  environment?: string;
  alertThreshold?: number;
  errorThreshold?: number;
  performanceThreshold?: number;
}

// Function to create error context
export function createErrorContext(
  message: string,
  severity: ErrorSeverity,
  category: ErrorCategory,
  stack: string,
  metadata: Record<string, unknown> = {}
): ErrorContext {
  return {
    message,
    severity,
    category,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    stack,
    metadata
  };
}

// Function to create metric context
export function createMetricContext(
  name: string,
  value: number,
  rating: MetricRating,
  navigationType: NavigationType,
  metadata: Record<string, unknown> = {}
): PerformanceMetric {
  return {
    name,
    value,
    rating,
    timestamp: Date.now(),
    navigationType,
    metadata
  };
}

class MonitoringService implements ErrorReporter, MetricCollector {
  private static instance: MonitoringService;
  private errorHandler: (error: ErrorContext) => void;
  private metricHandler: (metric: PerformanceMetric) => void;
  private errorBuffer: ErrorContext[] = [];
  private metricBuffer: PerformanceMetric[] = [];
  private readonly bufferSize = 10;
  private readonly flushInterval = 5000; // 5 seconds
  private config: MonitoringConfig;

  private constructor(config: MonitoringConfig) {
    this.config = config;
    this.errorHandler = () => {};
    this.metricHandler = () => {};
    this.setupErrorHandling();
    this.setupPerformanceMonitoring();
    this.startBufferFlush();
  }

  public static getInstance(config: MonitoringConfig): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService(config);
    }
    return MonitoringService.instance;
  }

  public setErrorHandler(handler: (error: ErrorContext) => void): void {
    this.errorHandler = handler;
  }

  public setMetricHandler(handler: (metric: PerformanceMetric) => void): void {
    this.metricHandler = handler;
  }

  private setupErrorHandling(): void {
    window.addEventListener('error', (event) => {
      const formattedMessage = event.message || '';
      this.reportError(createErrorContext(
        formattedMessage,
        ErrorSeverity.HIGH,
        ErrorCategory.JAVASCRIPT,
        event.error?.stack || new Error().stack || 'No stack trace available'
      ));
    });

    window.addEventListener('unhandledrejection', (event) => {
      const formattedReason = event.reason?.message || '';
      this.handleUnhandledRejection(event, formattedReason);
    });

    window.addEventListener('error', (event) => {
      if (event.target instanceof HTMLElement) {
        const formattedMessage = event.message || '';
        this.handleResourceError(event, formattedMessage);
      }
    }, true);
  }

  private setupPerformanceMonitoring(): void {
    // Monitor resource loading errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          const formattedStatusText = response.statusText || '';
          this.reportError(createErrorContext(
            `HTTP Error: ${response.status} ${formattedStatusText}`,
            ErrorSeverity.MEDIUM,
            ErrorCategory.NETWORK,
            `${response.status} ${formattedStatusText}`
          ));
        }
        return response;
      } catch (error: unknown) {
        const formattedErrorMessage = error instanceof Error ? error.message : 'Unknown error';
        this.reportError(createErrorContext(
          formattedErrorMessage,
          ErrorSeverity.HIGH,
          ErrorCategory.NETWORK,
          error instanceof Error ? error.stack || 'No stack trace' : 'No stack trace'
        ));
        throw error;
      }
    };
  }

  public reportError(error: ErrorContext): void {
    this.errorBuffer.push(error);
    this.errorHandler(error);
    if (this.errorBuffer.length >= this.bufferSize) {
      void this.flushErrorBuffer();
    }
  }

  public reportMetric(metric: PerformanceMetric): void {
    this.metricBuffer.push(metric);
    this.metricHandler(metric);
    if (this.metricBuffer.length >= this.bufferSize) {
      void this.flushMetricBuffer();
    }
  }

  public handleUnhandledRejection = (event: PromiseRejectionEvent, reason: string): void => {
    this.reportError(createErrorContext(
      reason,
      ErrorSeverity.HIGH,
      ErrorCategory.JAVASCRIPT,
      event.reason?.stack || new Error().stack || 'No stack trace available'
    ));
  };

  public handleResourceError = (event: ErrorEvent, message: string): void => {
    this.reportError(createErrorContext(
      message,
      ErrorSeverity.HIGH,
      ErrorCategory.NETWORK,
      `${message}\nResource: ${event.filename}`
    ));
  };

  private async flushErrorBuffer(): Promise<void> {
    if (this.errorBuffer.length === 0) return;

    try {
      // In production, send to error reporting service
      if (this.config.environment === 'production') {
        await fetch(this.config.errorEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            errors: this.errorBuffer,
            timestamp: Date.now(),
            environment: this.config.environment
          })
        });
      }
    } catch (error: unknown) {
      console.error('Failed to flush error buffer:', error);
    }

    this.errorBuffer = [];
  }

  private async flushMetricBuffer(): Promise<void> {
    if (this.metricBuffer.length === 0) return;

    try {
      // In production, send to monitoring service
      if (this.config.environment === 'production') {
        await fetch(this.config.metricEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            metrics: this.metricBuffer,
            timestamp: Date.now(),
            environment: this.config.environment
          })
        });
      }
    } catch (error: unknown) {
      console.error('Failed to flush metric buffer:', error);
    }

    this.metricBuffer = [];
  }

  private startBufferFlush(): void {
    setInterval(() => {
      void this.flushErrorBuffer();
      void this.flushMetricBuffer();
    }, this.flushInterval);
  }

  public async checkMetrics(): Promise<void> {
    try {
      const metrics = await this.getMetrics();

      if (metrics.performance < this.config.performanceThreshold!) {
        AlertingService.alert(`Performance score (${metrics.performance}) is below threshold (${this.config.performanceThreshold})`);
      }

      if (metrics.accessibility < this.config.alertThreshold!) {
        AlertingService.alert(`Accessibility score (${metrics.accessibility}) is below threshold (${this.config.alertThreshold})`);
      }

      if (metrics.bestPractices < this.config.errorThreshold!) {
        ErrorReportingService.reportError(new Error(`Best practices score (${metrics.bestPractices}) is below threshold (${this.config.errorThreshold})`));
      }
    } catch (error: unknown) {
      ErrorReportingService.reportError(error as Error);
    }
  }

  public async getMetrics(): Promise<{ performance: number; accessibility: number; bestPractices: number }> {
    // Implement logic to get metrics
    return { performance: 90, accessibility: 95, bestPractices: 85 };
  }

  public dispose(): void {
    // Dispose of any resources
  }
}

export const monitoringService = MonitoringService.getInstance({
  errorEndpoint: '/api/errors',
  metricEndpoint: '/api/metrics',
  environment: process.env.NODE_ENV
});

// Export a function to report errors from anywhere in the app
export function reportError(
  message: string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  category: ErrorCategory = ErrorCategory.JAVASCRIPT,
  metadata?: Record<string, unknown>
): void {
  monitoringService.reportError(createErrorContext(
    message,
    severity,
    category,
    new Error().stack || 'No stack trace available',
    metadata
  ));
}

// Export a function to report performance metrics
export function reportPerformanceMetric(metric: Metric): void {
  monitoringService.reportMetric(createMetricContext(
    metric.name,
    metric.value,
    metric.rating as MetricRating,
    metric.navigationType as NavigationType
  ));
}

// Export a function to log errors with context
export const logError = (error: Error, context?: string) => {
  const errorContext = context || 'Unknown Context';
  console.error(`[${errorContext}]:`, error);
  
  // Add your error reporting service call here
  // Example: errorReportingService.report(error, errorContext);
};
