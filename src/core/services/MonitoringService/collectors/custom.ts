import { MetricCollector } from './MetricCollector';
import { CustomMetric, MetricType } from '../types';

export class CustomMetricCollector extends MetricCollector<CustomMetric> {
  protected override validateMetric(metric: CustomMetric): boolean {
    return (
      typeof metric.name === 'string' &&
      typeof metric.value === 'number' &&
      typeof metric.timestamp === 'number' &&
      metric.type === MetricType.CUSTOM &&
      (!metric.metadata || typeof metric.metadata === 'object')
    );
  }

  public collectCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    const metric: CustomMetric = {
      type: MetricType.CUSTOM,
      name,
      value,
      timestamp: Date.now(),
      metadata
    };
    this.collect(metric);
  }
}
