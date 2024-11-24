import { MetricCollector } from './MetricCollector';
import { MetricType, ResourceMetric } from '../types';

export class ResourceMetricCollector extends MetricCollector<ResourceMetric> {
  constructor(metricType: MetricType = MetricType.RESOURCE) {
    super(metricType);
  }

  protected override validateMetric(metric: ResourceMetric): boolean {
    return (
      typeof metric.name === 'string' &&
      typeof metric.value === 'number' &&
      typeof metric.timestamp === 'number' &&
      metric.type === MetricType.RESOURCE &&
      typeof metric.resourceType === 'string' &&
      (metric.duration === undefined || typeof metric.duration === 'number') &&
      (metric.initiatorType === undefined || typeof metric.initiatorType === 'string')
    );
  }

  public collectResourceMetric(
    name: string,
    value: number,
    resourceType: string,
    duration?: number,
    initiatorType?: string
  ): void {
    const metric: ResourceMetric = {
      type: MetricType.RESOURCE,
      name,
      value,
      timestamp: Date.now(),
      resourceType,
      duration,
      initiatorType
    };
    this.collect(metric);
  }

  public override getMetrics(): ResourceMetric[] {
    return super.getMetrics();
  }

  public collectNavigationTiming(): void {
    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!timing) return;

    this.collectResourceMetric(
      'navigation_complete',
      timing.loadEventEnd - timing.startTime,
      'navigation',
      timing.duration,
      'navigation'
    );
  }

  public collectResourceTiming(): void {
    const resources = performance.getEntriesByType('resource');
    resources.forEach(resource => {
      const entry = resource as PerformanceResourceTiming;
      this.collectResourceMetric(
        entry.name,
        entry.duration,
        'resource',
        entry.duration,
        entry.initiatorType
      );
    });
  }

  public collectPaintTiming(): void {
    const paints = performance.getEntriesByType('paint');
    paints.forEach(paint => {
      const entry = paint as PerformancePaintTiming;
      this.collectResourceMetric(
        entry.name,
        entry.startTime,
        'paint',
        0,
        'paint'
      );
    });
  }
}
