import { ErrorReportingService } from '../ErrorReportingService';
import { MetricCollector } from './collectors/MetricCollector';
import { ResourceCollector } from './collectors/resources';
import { ErrorSeverity, ErrorCategory } from '../ErrorReportingService/types';

export interface MetricData {
  name: string;
  value: number;
  tags: Record<string, string>;
  timestamp: number;
}

export interface MetricCollectorConfig {
  enabled: boolean;
  interval: number;
  batchSize: number;
}

export class MonitoringService {
  private static instance: MonitoringService | null = null;
  private collectors: Map<string, MetricCollector>;
  private resourceCollector: ResourceCollector;
  private metricsQueue: MetricData[];
  private config: MetricCollectorConfig;
  private metrics: Map<string, number>;

  private constructor(config: Partial<MetricCollectorConfig> = {}) {
    this.config = {
      enabled: true,
      interval: 60000,
      batchSize: 100,
      ...config
    };

    this.collectors = new Map();
    this.resourceCollector = new ResourceCollector();
    this.metricsQueue = [];
    this.metrics = new Map();

    if (this.config.enabled) {
      this.startCollection();
    }
  }

  public static getInstance(config?: Partial<MetricCollectorConfig>): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService(config);
    }
    return MonitoringService.instance;
  }

  public trackMetric(name: string, value: number, tags: Record<string, string> = {}): void {
    try {
      const metric: MetricData = {
        name,
        value,
        tags,
        timestamp: Date.now()
      };
      this.metricsQueue.push(metric);

      if (this.metricsQueue.length >= this.config.batchSize) {
        this.flushMetrics();
      }
      this.metrics.set(name, value);
    } catch (error) {
      ErrorReportingService.getInstance().captureError(error, {
        severity: ErrorSeverity.ERROR,
        category: ErrorCategory.MONITORING
      });
    }
  }

  public getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }

  private addMetric(metric: MetricData): void {
    if (!this.config.enabled) return;
    this.metricsQueue.push(metric);
    if (this.metricsQueue.length >= this.config.batchSize) {
      this.flushMetrics();
    }
  }

  public track(metric: MetricData): void {
    try {
      this.metricsQueue.push(metric);

      if (this.metricsQueue.length >= this.config.batchSize) {
        this.flushMetrics();
      }
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to track metric'));
    }
  }

  private async flushMetrics(): Promise<void> {
    if (this.metricsQueue.length === 0) {
      return;
    }

    try {
      const metrics = [...this.metricsQueue];
      this.metricsQueue = [];

      for (const collector of this.collectors.values()) {
        try {
          await collector.collect(metrics);
        } catch (error) {
          ErrorReportingService.captureError({
            name: 'MetricCollectionError',
            message: `Failed to collect metrics for collector ${collector.name}`,
            severity: ErrorSeverity.ERROR,
            category: ErrorCategory.MONITORING,
            metadata: { collector: collector.name, metrics }
          });
        }
      }
    } catch (error) {
      ErrorReportingService.captureError({
        name: 'MetricFlushError',
        message: 'Failed to flush metrics',
        severity: ErrorSeverity.ERROR,
        category: ErrorCategory.MONITORING,
        metadata: { metrics: this.metricsQueue }
      });
      this.metricsQueue = [];
    }
  }

  private startCollection(): void {
    setInterval(() => {
      try {
        this.resourceCollector.collect().then(metrics => {
          metrics.forEach(metric => this.addMetric(metric));
        });
      } catch (error) {
        ErrorReportingService.captureError({
          name: 'ResourceCollectionError',
          message: 'Failed to collect resource metrics',
          severity: ErrorSeverity.ERROR,
          category: ErrorCategory.MONITORING,
          metadata: { error }
        });
      }
    }, this.config.interval);
  }

  public registerCollector(name: string, collector: MetricCollector): void {
    try {
      if (this.collectors.has(name)) {
        throw new Error(`Collector ${name} is already registered`);
      }

      this.collectors.set(name, collector);
    } catch (error) {
      ErrorReportingService.captureError({
        name: 'CollectorRegistrationError',
        message: 'Failed to register collector',
        severity: ErrorSeverity.ERROR,
        category: ErrorCategory.MONITORING,
        metadata: { name, collector }
      });
    }
  }

  public removeCollector(name: string): void {
    try {
      this.collectors.delete(name);
    } catch (error) {
      ErrorReportingService.captureError({
        name: 'CollectorRemovalError',
        message: 'Failed to remove collector',
        severity: ErrorSeverity.ERROR,
        category: ErrorCategory.MONITORING,
        metadata: { name }
      });
    }
  }
}
