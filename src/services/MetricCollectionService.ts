import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals';
import { PerformanceMetric } from '../utils/monitoring';

/**
 * Real-time metric collection service that tracks and reports performance metrics
 */
class MetricCollectionService {
  private static instance: MetricCollectionService;
  private readonly apiEndpoint: string;
  private readonly batchSize: number;
  private readonly flushInterval: number;
  private metricBuffer: PerformanceMetric[] = [];
  private isInitialized = false;
  private observers: Set<(metrics: PerformanceMetric[]) => void> = new Set();

  private constructor() {
    this.apiEndpoint = process.env.METRIC_API || '/api/metrics';
    this.batchSize = Number(process.env.METRIC_BATCH_SIZE) || 10;
    this.flushInterval = Number(process.env.METRIC_FLUSH_INTERVAL) || 5000;
    this.setupMetricCollection();
    this.startBufferFlush();
  }

  public static getInstance(): MetricCollectionService {
    if (!MetricCollectionService.instance) {
      MetricCollectionService.instance = new MetricCollectionService();
    }
    return MetricCollectionService.instance;
  }

  public initialize(config: {
    apiEndpoint?: string;
    batchSize?: number;
    flushInterval?: number;
  } = {}): void {
    if (this.isInitialized) {
      console.warn('MetricCollectionService is already initialized');
      return;
    }

    if (config.apiEndpoint) this.apiEndpoint = config.apiEndpoint;
    if (config.batchSize) this.batchSize = config.batchSize;
    if (config.flushInterval) this.flushInterval = config.flushInterval;

    this.isInitialized = true;
  }

  private setupMetricCollection(): void {
    // Core Web Vitals
    onLCP(metric => this.reportMetric({
      name: 'LCP',
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      navigationType: metric.navigationType
    }));

    onFID(metric => this.reportMetric({
      name: 'FID',
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      navigationType: metric.navigationType
    }));

    onCLS(metric => this.reportMetric({
      name: 'CLS',
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      navigationType: metric.navigationType
    }));

    onFCP(metric => this.reportMetric({
      name: 'FCP',
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      navigationType: metric.navigationType
    }));

    onTTFB(metric => this.reportMetric({
      name: 'TTFB',
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      navigationType: metric.navigationType
    }));

    // Resource timing
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          this.reportMetric({
            name: 'Resource',
            value: resourceEntry.duration,
            rating: this.getRating(resourceEntry.duration),
            timestamp: Date.now(),
            navigationType: 'resource',
            metadata: {
              type: resourceEntry.initiatorType,
              size: resourceEntry.transferSize,
              url: resourceEntry.name
            }
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    // Navigation timing
    const navigationObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.reportMetric({
            name: 'Navigation',
            value: navEntry.duration,
            rating: this.getRating(navEntry.duration),
            timestamp: Date.now(),
            navigationType: 'navigate',
            metadata: {
              type: navEntry.type,
              redirectCount: navEntry.redirectCount,
              domInteractive: navEntry.domInteractive,
              domComplete: navEntry.domComplete
            }
          });
        }
      });
    });

    navigationObserver.observe({ entryTypes: ['navigation'] });
  }

  private getRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    // Customize these thresholds based on your requirements
    if (value <= 1000) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  public reportMetric(metric: PerformanceMetric): void {
    this.metricBuffer.push(metric);
    
    // Notify observers
    this.observers.forEach(observer => observer([metric]));

    if (this.metricBuffer.length >= this.batchSize) {
      this.flushMetricBuffer();
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
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics,
          timestamp: Date.now(),
          environment: process.env.NODE_ENV,
          version: process.env.npm_package_version
        })
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

  private startBufferFlush(): void {
    setInterval(() => {
      this.flushMetricBuffer();
    }, this.flushInterval);
  }
}

export const metricCollectionService = MetricCollectionService.getInstance();
