import { TestRunnerPlugin } from '@web/test-runner';
import { LighthouseMetrics, WebVitals, ResourceTiming } from '../types';
import { reportError, ErrorCategory, ErrorSeverity, reportPerformanceMetric } from '../utils/monitoring';

interface ExecuteCommandArgs<T = unknown> {
  command: string;
  payload?: T;
}

export function mockLighthousePlugin(): TestRunnerPlugin {
  return {
    name: 'mock-lighthouse-plugin',
    async executeCommand(args: ExecuteCommandArgs) {
      if (args.command === 'lighthouse') {
        const metrics = {
          categories: {
            performance: {
              score: 0.95
            }
          },
          audits: {
            'first-contentful-paint': {
              numericValue: 1500
            },
            'interactive': {
              numericValue: 2500
            },
            'largest-contentful-paint': {
              numericValue: 2000
            },
            'cumulative-layout-shift': {
              numericValue: 0.05
            },
            'total-blocking-time': {
              numericValue: 200
            }
          }
        } as LighthouseMetrics;

        // Report metrics to monitoring service
        Object.entries(metrics.audits).forEach(([name, { numericValue }]) => {
          reportPerformanceMetric({
            name: name as 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP',
            value: numericValue,
            rating: 'good',
            navigationType: 'navigate',
            entries: [],
            id: name,
            delta: 0
          });
        });

        return metrics;
      }
      return undefined;
    }
  };
}

export function mockWebVitalsPlugin(): TestRunnerPlugin {
  return {
    name: 'mock-web-vitals-plugin',
    async executeCommand(args: ExecuteCommandArgs) {
      if (args.command === 'web-vitals') {
        const metrics = {
          FCP: 1500,
          LCP: 2000,
          CLS: 0.05,
          FID: 50,
          TTFB: 300
        } as WebVitals;

        // Report metrics to monitoring service
        Object.entries(metrics).forEach(([name, value]) => {
          reportPerformanceMetric({
            name: name as 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP',
            value,
            rating: 'good',
            navigationType: 'navigate',
            entries: [],
            id: name,
            delta: 0
          });
        });

        return metrics;
      }
      return undefined;
    }
  };
}

export function mockResourceTimingPlugin(): TestRunnerPlugin {
  return {
    name: 'mock-resource-timing-plugin',
    async executeCommand(args: ExecuteCommandArgs) {
      if (args.command === 'resource-timing') {
        const timings = [
          { initiatorType: 'script', transferSize: 50000 },
          { initiatorType: 'script', transferSize: 30000 },
          { initiatorType: 'css', transferSize: 20000 },
          { initiatorType: 'img', transferSize: 100000 },
          { initiatorType: 'img', transferSize: 150000 }
        ] as ResourceTiming[];

        // Report resource metrics to monitoring service
        const totalSize = timings.reduce((sum, timing) => sum + timing.transferSize, 0);
        if (totalSize > 1024 * 1024) { // 1MB
          reportError(
            'Total resource size exceeds 1MB',
            ErrorSeverity.MEDIUM,
            ErrorCategory.PERFORMANCE,
            { totalSize, resources: timings }
          );
        }

        // Report individual large resources
        timings.forEach(timing => {
          if (timing.transferSize > 500 * 1024) { // 500KB
            reportError(
              `Large resource detected: ${timing.initiatorType}`,
              ErrorSeverity.LOW,
              ErrorCategory.PERFORMANCE,
              { size: timing.transferSize, type: timing.initiatorType }
            );
          }
        });

        return timings;
      }
      return undefined;
    }
  };
}
