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
