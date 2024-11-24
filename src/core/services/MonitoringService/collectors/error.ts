import { MetricCollector } from './MetricCollector';
import { ErrorMetric, MetricType } from '../types';
import { ErrorSeverity, ErrorCategory } from '../../ErrorReportingService/types';

export class ErrorMetricCollector extends MetricCollector<ErrorMetric> {
  protected override validateMetric(metric: ErrorMetric): boolean {
    return (
      typeof metric.name === 'string' &&
      typeof metric.value === 'number' &&
      typeof metric.timestamp === 'number' &&
      metric.type === MetricType.ERROR &&
      typeof metric.errorType === 'string' &&
      typeof metric.severity === 'string' &&
      typeof metric.category === 'string'
    );
  }

  public collectErrorMetric(error: Error, metadata: { severity: ErrorSeverity; category: ErrorCategory }): void {
    const metric: ErrorMetric = {
      type: MetricType.ERROR,
      timestamp: Date.now(),
      name: `error_${error.name}`,
      value: 1,
      errorType: error.name,
      severity: metadata.severity,
      category: metadata.category
    };
    this.collect(metric);
  }
}
