import type { ResourceMetrics } from '../types';
import { ErrorReportingService } from '../../ErrorReportingService';

export class ResourceCollector {
  private metrics: ResourceMetrics = {
    memoryUsage: 0,
    cpuUsage: 0,
    networkRequests: 0
  };

  private requestCount = 0;

  constructor() {
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    try {
      // Track memory usage
      if ('memory' in performance) {
        setInterval(() => {
          this.metrics.memoryUsage = (performance as any).memory.usedJSHeapSize;
        }, 1000);
      }

      // Track network requests
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource') {
              this.requestCount++;
              this.metrics.networkRequests = this.requestCount;
            }
          }
        });

        observer.observe({ entryTypes: ['resource'] });
      }

      // Estimate CPU usage through task timing
      let lastTime = performance.now();
      const measureCPU = () => {
        const currentTime = performance.now();
        const timeDiff = currentTime - lastTime;
        const usage = Math.min(timeDiff / 16.67, 1); // 16.67ms is one frame at 60fps
        this.metrics.cpuUsage = usage;
        lastTime = currentTime;
        requestAnimationFrame(measureCPU);
      };

      requestAnimationFrame(measureCPU);
    } catch (error) {
      ErrorReportingService.captureError(error);
    }
  }

  public getMetrics(): ResourceMetrics {
    return { ...this.metrics };
  }

  public reset(): void {
    this.metrics = {
      memoryUsage: 0,
      cpuUsage: 0,
      networkRequests: 0
    };
    this.requestCount = 0;
  }
}
