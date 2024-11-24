import { BaseMetricCollector } from './base';
import { PerformanceMetric, MetricType } from '../types';

export class PerformanceMetricCollector extends BaseMetricCollector<PerformanceMetric> {
  private isPerformanceMetric(metric: PerformanceMetric): metric is PerformanceMetric {
    return metric.type === MetricType.PERFORMANCE && 'duration' in metric;
  }

  public override collect(metric: PerformanceMetric): void {
    if (this.isPerformanceMetric(metric)) {
      this.metrics.push(metric);
    }
  }

  public collectPerformanceMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    this.collect({
      type: MetricType.PERFORMANCE,
      timestamp: Date.now(),
      name,
      value,
      duration: value,
      metadata
    });
  }
}
