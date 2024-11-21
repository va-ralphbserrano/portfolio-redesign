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

export type MetricType = 'counter' | 'gauge' | 'histogram';
export type MetricValue = number | { value: number; timestamp: number };

export interface MetricCollector {
  collect(): Promise<MetricData[]>;
  start(): void;
  stop(): void;
}
