import { ErrorContext, ErrorSeverity, ErrorCategory, PerformanceMetric } from '../utils/monitoring';

interface AlertConfig {
  apiEndpoint?: string;
  batchSize?: number;
  flushInterval?: number;
}

interface AlertPayload {
  errors: ErrorContext[];
  metrics: PerformanceMetric[];
  timestamp: number;
  environment: string;
}

interface MetricCondition {
  name: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  severity: ErrorSeverity;
}

/**
 * Service for monitoring and alerting on errors and performance metrics
 */
export class AlertingService {
  private static instance: AlertingService;
  private apiEndpoint: string;
  private batchSize: number;
  private flushInterval: number;
  private errorBuffer: ErrorContext[] = [];
  private metricBuffer: PerformanceMetric[] = [];
  private isInitialized = false;
  private flushIntervalId?: NodeJS.Timeout;

  private readonly metricConditions: MetricCondition[] = [
    {
      name: 'LCP',
      threshold: 2500,
      operator: 'gt',
      severity: ErrorSeverity.HIGH
    },
    {
      name: 'FID',
      threshold: 100,
      operator: 'gt',
      severity: ErrorSeverity.HIGH
    },
    {
      name: 'CLS',
      threshold: 0.1,
      operator: 'gt',
      severity: ErrorSeverity.MEDIUM
    },
    {
      name: 'TTFB',
      threshold: 600,
      operator: 'gt',
      severity: ErrorSeverity.MEDIUM
    }
  ];

  private constructor() {
    this.apiEndpoint = process.env.ALERT_API || '/api/alerts';
    this.batchSize = Number(process.env.ALERT_BATCH_SIZE) || 10;
    this.flushInterval = Number(process.env.ALERT_FLUSH_INTERVAL) || 5000;
    this.startBufferFlush();
  }

  public static getInstance(): AlertingService {
    if (!AlertingService.instance) {
      AlertingService.instance = new AlertingService();
    }
    return AlertingService.instance;
  }

  public static alert(message: string): void {
    console.warn(`[Alert] ${message}`);
    // In a real application, this would show a toast or notification
  }

  public initialize(config: AlertConfig = {}): void {
    if (this.isInitialized) {
      console.warn('AlertingService is already initialized');
      return;
    }

    if (config.apiEndpoint) {
      this.apiEndpoint = config.apiEndpoint;
    }
    if (config.batchSize) {
      this.batchSize = config.batchSize;
    }
    if (config.flushInterval) {
      this.flushInterval = config.flushInterval;
    }

    this.isInitialized = true;
  }

  public reportError(error: ErrorContext): void {
    this.errorBuffer.push(error);

    if (this.errorBuffer.length >= this.batchSize) {
      void this.flushBuffers();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Alert Service] Error:', error);
    }
  }

  public reportMetric(metric: PerformanceMetric): void {
    this.metricBuffer.push(metric);

    // Check for metric conditions
    const condition = this.metricConditions.find(c => c.name === metric.name);
    if (condition) {
      const isTriggered = this.evaluateCondition(metric.value, condition);
      if (isTriggered) {
        this.reportError({
          message: `Metric ${metric.name} exceeded threshold: ${metric.value}`,
          severity: condition.severity,
          category: ErrorCategory.PERFORMANCE,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          stack: '',
          metadata: {
            metricName: metric.name,
            value: metric.value,
            threshold: condition.threshold,
            operator: condition.operator
          }
        });
      }
    }

    // Check resource size for large resources
    if (metric.name === 'Resource' && metric.metadata && 'size' in metric.metadata && typeof metric.metadata.size === 'number' && metric.metadata.size > 5000000) {
      this.reportError({
        message: `Large resource detected: ${metric.metadata.url}`,
        severity: ErrorSeverity.MEDIUM,
        category: ErrorCategory.PERFORMANCE,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        stack: '',
        metadata: {
          resourceSize: metric.metadata.size,
          resourceUrl: metric.metadata.url,
          resourceType: metric.metadata.type
        }
      });
    }

    if (this.metricBuffer.length >= this.batchSize) {
      void this.flushBuffers();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Alert Service] Metric:', metric);
    }
  }

  private evaluateCondition(value: number, condition: MetricCondition): boolean {
    switch (condition.operator) {
      case 'gt':
        return value > condition.threshold;
      case 'lt':
        return value < condition.threshold;
      case 'eq':
        return value === condition.threshold;
      case 'gte':
        return value >= condition.threshold;
      case 'lte':
        return value <= condition.threshold;
      default:
        return false;
    }
  }

  private async flushBuffers(): Promise<void> {
    if (!this.isInitialized || (this.errorBuffer.length === 0 && this.metricBuffer.length === 0)) {
      return;
    }

    const errors = [...this.errorBuffer];
    const metrics = [...this.metricBuffer];
    this.errorBuffer = [];
    this.metricBuffer = [];

    try {
      const payload: AlertPayload = {
        errors,
        metrics,
        timestamp: Date.now(),
        environment: process.env.NODE_ENV || 'development'
      };

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('Failed to send alerts:', response.statusText);
        // Add back to buffers
        this.errorBuffer.unshift(...errors);
        this.metricBuffer.unshift(...metrics);
      }
    } catch (error) {
      console.error('Failed to send alerts:', error);
      // Add back to buffers
      this.errorBuffer.unshift(...errors);
      this.metricBuffer.unshift(...metrics);
    }
  }

  private startBufferFlush(): void {
    this.flushIntervalId = setInterval(() => {
      void this.flushBuffers();
    }, this.flushInterval);
  }

  public dispose(): void {
    if (this.flushIntervalId) {
      clearInterval(this.flushIntervalId);
    }
    this.errorBuffer = [];
    this.metricBuffer = [];
  }
}

export default AlertingService;
