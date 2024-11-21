import { MetricType, MetricValue, ResourceMetric, PerformanceMetric } from '../types';

// Base collector interface
export interface Collector {
  collect(): Promise<MetricValue[]>;
}

// Performance metrics collection
export class PerformanceCollector implements Collector {
  async collect(): Promise<MetricValue[]> {
    const metrics: PerformanceMetric[] = [];

    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      // Navigation timing metrics
      metrics.push({
        type: MetricType.PERFORMANCE,
        name: 'page_load',
        value: navigation.loadEventEnd - navigation.startTime,
        timestamp: Date.now()
      });

      metrics.push({
        type: MetricType.PERFORMANCE,
        name: 'ttfb',
        value: navigation.responseStart - navigation.requestStart,
        timestamp: Date.now()
      });

      // Paint timing metrics
      paint.forEach(entry => {
        metrics.push({
          type: MetricType.PERFORMANCE,
          name: entry.name,
          value: entry.startTime,
          timestamp: Date.now()
        });
      });

      // Memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        metrics.push({
          type: MetricType.PERFORMANCE,
          name: 'heap_size',
          value: memory.usedJSHeapSize,
          timestamp: Date.now()
        });
      }
    }

    return metrics;
  }
}

// Resource usage collection
export class ResourceCollector implements Collector {
  async collect(): Promise<MetricValue[]> {
    const metrics: ResourceMetric[] = [];

    if (typeof window !== 'undefined') {
      // Network requests
      const resources = performance.getEntriesByType('resource');
      
      resources.forEach(resource => {
        metrics.push({
          type: MetricType.RESOURCE,
          name: 'resource_load',
          value: resource.duration,
          resourceType: resource.initiatorType,
          url: resource.name,
          timestamp: Date.now()
        });
      });

      // Connection information
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        if (connection) {
          metrics.push({
            type: MetricType.RESOURCE,
            name: 'network_type',
            value: 1,
            metadata: {
              effectiveType: connection.effectiveType,
              downlink: connection.downlink,
              rtt: connection.rtt
            },
            timestamp: Date.now()
          });
        }
      }
    }

    return metrics;
  }
}

// Generic metric collection
export class MetricCollector implements Collector {
  private metrics: Map<string, number> = new Map();

  increment(name: string, value: number = 1): void {
    const currentValue = this.metrics.get(name) || 0;
    this.metrics.set(name, currentValue + value);
  }

  gauge(name: string, value: number): void {
    this.metrics.set(name, value);
  }

  async collect(): Promise<MetricValue[]> {
    const metrics: MetricValue[] = [];

    this.metrics.forEach((value, name) => {
      metrics.push({
        type: MetricType.CUSTOM,
        name,
        value,
        timestamp: Date.now()
      });
    });

    // Clear metrics after collection
    this.metrics.clear();

    return metrics;
  }
}
