import { BaseMetric, MetricType } from '../types';
import type { IMetricCollector } from '../types';
import { errorReportingService } from '../../ErrorReportingService';
import { ErrorSeverity, ErrorCategory } from '@/core/services/ErrorReportingService/types';

export abstract class BaseMetricCollector<T extends BaseMetric> implements IMetricCollector<T> {
  protected metrics: T[] = [];

  protected abstract validateMetric(metric: T): boolean;

  public collect(metric: T): void {
    if (!this.validateMetric(metric)) {
      throw new Error(`Invalid metric: ${JSON.stringify(metric)}`);
    }
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    });
  }

  public getMetrics(): T[] {
    return [...this.metrics];
  }

  public clearMetrics(): void {
    this.metrics = [];
  }

  protected createMetric(
    name: string,
    value: number,
    type: MetricType,
    timestamp: number = Date.now()
  ): T {
    return {
      name,
      value,
      type,
      timestamp
    } as T;
  }
}

export abstract class MetricCollector<T extends BaseMetric> extends BaseMetricCollector<T> {
  protected type: MetricType;

  constructor(type: MetricType) {
    super();
    this.type = type;
  }

  protected handleError(error: Error): void {
    errorReportingService.reportError(error, {
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.RUNTIME,
      metadata: {
        collectorType: this.type
      }
    });
  }

  protected validateMetric(metric: T): boolean {
    return metric.type === this.type;
  }

  override collect(metric: T): void {
    try {
      super.collect(metric);
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  override getMetrics(): T[] {
    try {
      return super.getMetrics();
    } catch (error) {
      this.handleError(error as Error);
      return [];
    }
  }

  override clearMetrics(): void {
    try {
      super.clearMetrics();
    } catch (error) {
      this.handleError(error as Error);
    }
  }
}
