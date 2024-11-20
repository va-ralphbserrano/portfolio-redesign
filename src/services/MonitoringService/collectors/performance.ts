import { onFCP, onLCP, onTTI, onCLS } from 'web-vitals';
import type { PerformanceMetrics } from '../types';
import { ErrorReportingService } from '../../ErrorReportingService';

export class PerformanceCollector {
  private metrics: PerformanceMetrics = {
    fcp: 0,
    lcp: 0,
    tti: 0,
    cls: 0
  };

  constructor() {
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    try {
      onFCP(({ value }) => {
        this.metrics.fcp = value;
      });

      onLCP(({ value }) => {
        this.metrics.lcp = value;
      });

      onTTI(({ value }) => {
        this.metrics.tti = value;
      });

      onCLS(({ value }) => {
        this.metrics.cls = value;
      });
    } catch (error) {
      ErrorReportingService.captureError(error);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public reset(): void {
    this.metrics = {
      fcp: 0,
      lcp: 0,
      tti: 0,
      cls: 0
    };
  }
}
