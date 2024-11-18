import { Metric } from 'web-vitals';
import { PerformanceMetric, MetricRating, NavigationType, createMetricContext } from '../utils/monitoring';

interface MetricCollectionConfig {
  apiEndpoint: string;
  batchSize?: number;
  flushInterval?: number;
}

interface MetricPayload {
  metrics: PerformanceMetric[];
  timestamp: number;
  environment: string;
}

/**
 * Real-time metric collection service that tracks and reports performance metrics
 */
export class MetricCollectionService {
  private static instance: MetricCollectionService;
  private apiEndpoint: string;
  private batchSize: number;
  private flushInterval: number;
  private metricBuffer: PerformanceMetric[] = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private isInitialized = false;
  private observers: Set<(metrics: PerformanceMetric[]) => void> = new Set();

  private constructor() {
    this.apiEndpoint = '';
    this.batchSize = 10;
    this.flushInterval = 5000;
  }

  public static getInstance(): MetricCollectionService {
    if (!MetricCollectionService.instance) {
      MetricCollectionService.instance = new MetricCollectionService();
    }
    return MetricCollectionService.instance;
  }

  public initialize(config: MetricCollectionConfig): void {
    if (this.isInitialized) {
      console.warn('MetricCollectionService is already initialized');
      return;
    }

    this.apiEndpoint = config.apiEndpoint;
    if (config.batchSize !== undefined) this.batchSize = config.batchSize;
    if (config.flushInterval !== undefined) this.flushInterval = config.flushInterval;
    this.setupPerformanceMonitoring();
    this.startBufferFlush();
    this.isInitialized = true;
  }

  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const { onLCP, onFID, onCLS, onTTFB, onFCP } = require('web-vitals');

    onLCP((metric: Metric) => {
      this.reportMetric(createMetricContext(
        'LCP',
        metric.value,
        metric.rating as MetricRating,
        NavigationType.NAVIGATE,
        {
          entryType: metric.entries[0]?.entryType,
          startTime: metric.entries[0]?.startTime
        }
      ));
    });

    onFID((metric: Metric) => {
      this.reportMetric(createMetricContext(
        'FID',
        metric.value,
        metric.rating as MetricRating,
        NavigationType.NAVIGATE,
        {
          entryType: metric.entries[0]?.entryType,
          startTime: metric.entries[0]?.startTime
        }
      ));
    });

    onCLS((metric: Metric) => {
      this.reportMetric(createMetricContext(
        'CLS',
        metric.value,
        metric.rating as MetricRating,
        NavigationType.NAVIGATE,
        {
          entryType: metric.entries[0]?.entryType,
          startTime: metric.entries[0]?.startTime
        }
      ));
    });

    onTTFB((metric: Metric) => {
      this.reportMetric(createMetricContext(
        'TTFB',
        metric.value,
        metric.rating as MetricRating,
        NavigationType.NAVIGATE,
        {
          entryType: metric.entries[0]?.entryType,
          startTime: metric.entries[0]?.startTime
        }
      ));
    });

    onFCP((metric: Metric) => {
      this.reportMetric(createMetricContext(
        'FCP',
        metric.value,
        metric.rating as MetricRating,
        NavigationType.NAVIGATE,
        {
          entryType: metric.entries[0]?.entryType,
          startTime: metric.entries[0]?.startTime
        }
      ));
    });

    // Resource timing
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          this.reportMetric(createMetricContext(
            'Resource Timing',
            resourceEntry.duration,
            resourceEntry.duration < 100 ? MetricRating.GOOD :
              resourceEntry.duration < 300 ? MetricRating.NEEDS_IMPROVEMENT :
                MetricRating.POOR,
            NavigationType.NAVIGATE,
            {
              name: resourceEntry.name,
              type: resourceEntry.initiatorType,
              size: resourceEntry.transferSize,
              protocol: resourceEntry.nextHopProtocol
            }
          ));
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    // Navigation timing
    const navigationObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const metadata = {
            type: navEntry.type,
            redirectCount: navEntry.redirectCount,
            domInteractive: navEntry.domInteractive,
            domComplete: navEntry.domComplete
          };

          this.reportMetric(createMetricContext(
            'Navigation',
            navEntry.duration,
            navEntry.duration < 1000 ? MetricRating.GOOD :
              navEntry.duration < 3000 ? MetricRating.NEEDS_IMPROVEMENT :
                MetricRating.POOR,
            NavigationType.NAVIGATE,
            metadata
          ));
        }
      });
    });

    navigationObserver.observe({ entryTypes: ['navigation'] });
  }

  public reportMetric(metric: PerformanceMetric): void {
    this.metricBuffer.push(metric);
    // Notify observers
    this.observers.forEach(observer => observer([metric]));
    if (this.metricBuffer.length >= this.batchSize) {
      void this.flushMetricBuffer();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance Metric]', metric);
    }
  }

  public subscribe(callback: (metrics: PerformanceMetric[]) => void): () => void {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  private async flushMetricBuffer(): Promise<void> {
    if (!this.isInitialized || this.metricBuffer.length === 0) return;

    const metrics = [...this.metricBuffer];
    this.metricBuffer = [];

    try {
      const payload: MetricPayload = {
        metrics,
        timestamp: Date.now(),
        environment: process.env.NODE_ENV || 'development'
      };

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('Failed to send metrics:', response.statusText);
        // Add metrics back to buffer
        this.metricBuffer.unshift(...metrics);
      }
    } catch (error) {
      console.error('Failed to send metrics:', error);
      // Add metrics back to buffer
      this.metricBuffer.unshift(...metrics);
    }
  }

  public startBufferFlush(): void {
    if (this.flushTimer === null) {
      this.flushTimer = setInterval(() => {
        void this.flushMetricBuffer();
      }, this.flushInterval);
    }
  }

  public stopBufferFlush(): void {
    if (this.flushTimer !== null) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  public dispose(): void {
    this.stopBufferFlush();
    this.observers.clear();
    this.metricBuffer = [];
  }
}

export const metricCollectionService = MetricCollectionService.getInstance();
