import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';
import type { MetricData } from '../types';

export class PerformanceCollector {
  private metrics: MetricData[] = [];

  constructor() {
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    try {
      // Core Web Vitals
      onCLS(({ value }) => {
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'cls',
          value,
          timestamp: Date.now(),
          tags: {
            type: 'web_vital',
            metric: 'cls'
          }
        });
      });

      onFID(({ value }) => {
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'fid',
          value,
          timestamp: Date.now(),
          tags: {
            type: 'web_vital',
            metric: 'fid'
          }
        });
      });

      onLCP(({ value }) => {
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'lcp',
          value,
          timestamp: Date.now(),
          tags: {
            type: 'web_vital',
            metric: 'lcp'
          }
        });
      });

      onFCP(({ value }) => {
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'fcp',
          value,
          timestamp: Date.now(),
          tags: {
            type: 'web_vital',
            metric: 'fcp'
          }
        });
      });

      onTTFB(({ value }) => {
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'ttfb',
          value,
          timestamp: Date.now(),
          tags: {
            type: 'web_vital',
            metric: 'ttfb'
          }
        });
      });

      if (typeof window !== 'undefined' && 'performance' in window) {
        const timing = performance.timing;
        const navigation = performance.navigation;

        // Navigation timing metrics
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'page_load_time',
          value: timing.loadEventEnd - timing.navigationStart,
          timestamp: Date.now(),
          tags: {
            type: 'performance',
            metric: 'page_load'
          }
        });

        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'dom_interactive_time',
          value: timing.domInteractive - timing.navigationStart,
          timestamp: Date.now(),
          tags: {
            type: 'performance',
            metric: 'dom_interactive'
          }
        });

        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'first_paint_time',
          value: timing.responseStart - timing.navigationStart,
          timestamp: Date.now(),
          tags: {
            type: 'performance',
            metric: 'first_paint'
          }
        });

        // Navigation type
        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'navigation_type',
          value: navigation.type,
          timestamp: Date.now(),
          tags: {
            type: 'performance',
            metric: 'navigation',
            navigationType: navigation.type === 0 ? 'navigate' :
                           navigation.type === 1 ? 'reload' :
                           navigation.type === 2 ? 'back_forward' : 'reserved'
          }
        });

        // Resource timing
        const resources = performance.getEntriesByType('resource');
        let totalResourceTime = 0;
        resources.forEach(resource => {
          totalResourceTime += (resource as PerformanceResourceTiming).duration;
        });

        this.metrics.push({
          id: crypto.randomUUID(),
          name: 'total_resource_time',
          value: totalResourceTime,
          timestamp: Date.now(),
          tags: {
            type: 'performance',
            metric: 'resources'
          }
        });
      }
    } catch (error) {
      console.error('Error collecting performance metrics:', error instanceof Error ? error : new Error('Unknown error'));
    }
  }

  public getMetrics(): MetricData[] {
    return [...this.metrics];
  }

  public reset(): void {
    this.metrics = [];
  }
}
