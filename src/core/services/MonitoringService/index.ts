import { ErrorMetricCollector } from './collectors/error';
import { PerformanceMetricCollector } from './collectors/performance';
import { ResourceMetricCollector } from './collectors/resource';
import { CustomMetricCollector } from './collectors/custom';
import { 
  IMonitoringService,
  MetricType,
  Metric,
  ErrorMetric,
  ErrorSeverity,
  ErrorCategory
} from './types';

export class MonitoringService implements IMonitoringService {
  private static instance: MonitoringService;
  private errorCollector: ErrorMetricCollector;
  private performanceCollector: PerformanceMetricCollector;
  private resourceCollector: ResourceMetricCollector;
  private customCollector: CustomMetricCollector;

  private constructor() {
    // Initialize collectors with their respective metric types
    this.errorCollector = new ErrorMetricCollector(MetricType.ERROR);
    this.performanceCollector = new PerformanceMetricCollector();
    this.resourceCollector = new ResourceMetricCollector();
    this.customCollector = new CustomMetricCollector(MetricType.CUSTOM);
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    this.customCollector.collect({
      name,
      value,
      type: MetricType.CUSTOM,
      timestamp: Date.now(),
      metadata
    });
  }

  public trackErrorMetric(
    name: string,
    value: number,
    errorType: string,
    severity: ErrorSeverity,
    category: ErrorCategory = ErrorCategory.UNKNOWN
  ): void {
    this.errorCollector.collect({
      name,
      value,
      type: MetricType.ERROR,
      timestamp: Date.now(),
      errorType,
      severity,
      category
    });
  }

  public trackPerformanceMetric(name: string, duration: number, metadata?: Record<string, unknown>): void {
    this.performanceCollector.collect({
      name,
      value: duration,
      type: MetricType.PERFORMANCE,
      timestamp: Date.now(),
      duration,
      metadata
    });
  }

  public trackResourceMetric(
    name: string,
    value: number,
    resourceType: string,
    duration?: number,
    initiatorType?: string,
    metadata?: Record<string, unknown>
  ): void {
    this.resourceCollector.collect({
      name,
      value,
      type: MetricType.RESOURCE,
      timestamp: Date.now(),
      resourceType,
      duration,
      initiatorType,
      metadata
    });
  }

  public trackMetric(name: string, value: number, labels: string[]): void {
    this.customCollector.collect({
      type: MetricType.CUSTOM,
      name,
      value,
      timestamp: Date.now(),
      metadata: { labels }
    });
  }

  public trackError(error: Error, metadata: { severity: ErrorSeverity; category: ErrorCategory }): void {
    const metric: ErrorMetric = {
      type: MetricType.ERROR,
      name: `error_${error.name}`,
      value: 1,
      timestamp: Date.now(),
      errorType: error.name,
      severity: metadata.severity,
      category: metadata.category
    };
    this.errorCollector.collect(metric);
  }

  public getMetrics(): Metric[] {
    return [
      ...this.errorCollector.getMetrics(),
      ...this.performanceCollector.getMetrics(),
      ...this.resourceCollector.getMetrics(),
      ...this.customCollector.getMetrics()
    ];
  }

  public clearMetrics(): void {
    this.errorCollector.clearMetrics();
    this.performanceCollector.clearMetrics();
    this.resourceCollector.clearMetrics();
    this.customCollector.clearMetrics();
  }
}

export const monitoringService = MonitoringService.getInstance();
