export interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

export interface ResourceMetrics {
  cpu: number;
  memory: number;
  networkLatency: number;
  timestamp: number;
}

export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  timestamp: number;
}

export const enum MetricType {
  COUNTER = 'counter',
  GAUGE = 'gauge',
  HISTOGRAM = 'histogram'
}

export interface BaseMetric {
  name: string;
  type: MetricType;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

export interface ResourceMetric extends BaseMetric {
  resourceType: string;
  metadata?: Record<string, unknown>;
}

export interface PerformanceMetric extends BaseMetric {
  performanceType: string;
}

export interface CustomMetric extends BaseMetric {
  customType: string;
}

export type MetricValue = number | { value: number; timestamp: number };

export interface MetricCollector<T extends BaseMetric = BaseMetric> {
  name: string;
  collect(): Promise<T[]>;
  start(): void;
  stop(): void;
  validate(metric: T): boolean;
}
