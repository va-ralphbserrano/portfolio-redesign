import { ErrorSeverity, ErrorCategory } from '../ErrorReportingService/types';

export { ErrorSeverity, ErrorCategory };

export enum MetricType {
  CUSTOM = 'custom',
  ERROR = 'error',
  PERFORMANCE = 'performance',
  RESOURCE = 'resource'
}

export interface BaseMetric {
  name: string;
  value: number;
  type: MetricType;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface CustomMetric extends BaseMetric {
  type: MetricType.CUSTOM;
  category?: string;
}

export interface ErrorMetric extends BaseMetric {
  type: MetricType.ERROR;
  errorType: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
}

export interface PerformanceMetric extends BaseMetric {
  type: MetricType.PERFORMANCE;
  duration: number;
}

export interface ResourceMetric extends BaseMetric {
  type: MetricType.RESOURCE;
  resourceType: string;
  duration?: number;
  initiatorType?: string;
}

export type Metric = ErrorMetric | PerformanceMetric | ResourceMetric | CustomMetric;

export interface IMetricCollector<T extends BaseMetric> {
  collect(metric: T): void;
  getMetrics(): T[];
  clearMetrics(): void;
}

export interface IMonitoringService {
  trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void;
  trackErrorMetric(name: string, value: number, errorType: string, severity: ErrorSeverity, category: ErrorCategory): void;
  trackPerformanceMetric(name: string, duration: number): void;
  trackResourceMetric(name: string, value: number, resourceType: string, duration?: number, initiatorType?: string): void;
  getMetrics(): BaseMetric[];
  clearMetrics(): void;
}
