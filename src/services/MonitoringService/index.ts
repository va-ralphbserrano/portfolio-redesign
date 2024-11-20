import type { MonitoringConfig, MetricEvent, PerformanceMetrics, ResourceMetrics } from './types';
import { DEFAULT_CONFIG, BATCH_SIZE, MAX_RETRY_ATTEMPTS, RETRY_DELAY } from './constants';
import { PerformanceCollector } from './collectors/performance';
import { ResourceCollector } from './collectors/resources';
import { ErrorReportingService } from '../ErrorReportingService';

export class MonitoringService {
  private static instance: MonitoringService;
  private config: MonitoringConfig;
  private performanceCollector: PerformanceCollector;
  private resourceCollector: ResourceCollector;
  private metricQueue: MetricEvent[] = [];
  private isInitialized = false;

  private constructor() {
    this.config = DEFAULT_CONFIG;
    this.performanceCollector = new PerformanceCollector();
    this.resourceCollector = new ResourceCollector();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public async initialize(config?: Partial<MonitoringConfig>): Promise<void> {
    try {
      if (this.isInitialized) {
        return;
      }

      this.config = { ...DEFAULT_CONFIG, ...config };
      this.startMetricCollection();
      this.isInitialized = true;
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw new Error('Failed to initialize MonitoringService');
    }
  }

  public trackMetric(name: string, value: number, tags: string[] = []): void {
    if (!this.isInitialized) {
      return;
    }

    const event: MetricEvent = {
      name,
      value,
      timestamp: Date.now(),
      tags
    };

    this.metricQueue.push(event);

    if (this.metricQueue.length >= BATCH_SIZE) {
      this.flushMetrics();
    }
  }

  private startMetricCollection(): void {
    setInterval(() => {
      const performanceMetrics = this.performanceCollector.getMetrics();
      const resourceMetrics = this.resourceCollector.getMetrics();

      this.checkThresholds(performanceMetrics);
      this.trackResourceMetrics(resourceMetrics);
    }, 5000);
  }

  private checkThresholds(metrics: PerformanceMetrics): void {
    const { performanceThreshold } = this.config;

    if (metrics.fcp > performanceThreshold.fcp) {
      this.trackMetric('fcp_threshold_exceeded', metrics.fcp, ['performance']);
    }

    if (metrics.lcp > performanceThreshold.lcp) {
      this.trackMetric('lcp_threshold_exceeded', metrics.lcp, ['performance']);
    }

    if (metrics.tti > performanceThreshold.tti) {
      this.trackMetric('tti_threshold_exceeded', metrics.tti, ['performance']);
    }

    if (metrics.cls > performanceThreshold.cls) {
      this.trackMetric('cls_threshold_exceeded', metrics.cls, ['performance']);
    }
  }

  private trackResourceMetrics(metrics: ResourceMetrics): void {
    this.trackMetric('memory_usage', metrics.memoryUsage, ['resource']);
    this.trackMetric('cpu_usage', metrics.cpuUsage, ['resource']);
    this.trackMetric('network_requests', metrics.networkRequests, ['resource']);
  }

  private async flushMetrics(retryCount = 0): Promise<void> {
    if (this.metricQueue.length === 0) {
      return;
    }

    const metrics = [...this.metricQueue];
    this.metricQueue = [];

    try {
      const response = await fetch(this.config.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metrics),
      });

      if (!response.ok) {
        throw new Error(`Failed to send metrics: ${response.statusText}`);
      }
    } catch (error) {
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setTimeout(() => {
          this.metricQueue.push(...metrics);
          this.flushMetrics(retryCount + 1);
        }, RETRY_DELAY);
      } else {
        ErrorReportingService.captureError(error);
      }
    }
  }

  public reset(): void {
    this.performanceCollector.reset();
    this.resourceCollector.reset();
    this.metricQueue = [];
  }
}

export default MonitoringService.getInstance();
