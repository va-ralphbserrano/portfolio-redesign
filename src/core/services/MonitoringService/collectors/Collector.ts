import type { BaseMetric, IMetricCollector } from '../types';

export abstract class BaseMetricCollector<T extends BaseMetric> implements IMetricCollector<T> {
  protected metrics: T[] = [];

  public collect(metric: T): void {
    this.metrics.push(metric);
  }

  public getMetrics(): T[] {
    return [...this.metrics];
  }

  public clearMetrics(): void {
    this.metrics = [];
  }
}
