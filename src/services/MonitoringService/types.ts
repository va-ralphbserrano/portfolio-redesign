export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  tti: number;
  cls: number;
}

export interface ResourceMetrics {
  memoryUsage: number;
  cpuUsage: number;
  networkRequests: number;
}

export interface PerformanceThresholds {
  fcp: number;
  lcp: number;
  tti: number;
  cls: number;
}

export interface MonitoringConfig {
  sampleRate: number;
  reportingEndpoint: string;
  errorThreshold: number;
  performanceThreshold: PerformanceThresholds;
}

export interface MetricEvent {
  name: string;
  value: number;
  timestamp: number;
  tags: string[];
}

export interface MetricData {
  id: string;
  name: string;
  value: number;
  timestamp: number;
  tags: Record<string, string | number>;
}

export interface MetricCollector {
  collect(): Promise<MetricData[]>;
}

export interface MetricOptions {
  maxSize?: number;
  ttl?: number;
}
