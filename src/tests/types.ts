// Lighthouse metrics interface
export interface LighthouseMetrics {
  categories: {
    performance: {
      score: number;
    };
  };
  audits: {
    'first-contentful-paint': {
      numericValue: number;
    };
    'interactive': {
      numericValue: number;
    };
    'largest-contentful-paint': {
      numericValue: number;
    };
    'cumulative-layout-shift': {
      numericValue: number;
    };
    'total-blocking-time': {
      numericValue: number;
    };
  };
}

// Web Vitals interface
export interface WebVitals {
  FCP: number;
  LCP: number;
  CLS: number;
  FID: number;
  TTFB: number;
}

// Resource timing interface
export interface ResourceTiming {
  initiatorType: string;
  transferSize: number;
}

// Monitoring interfaces
export interface MonitoringMetric {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
  entries: unknown[];
  id: string;
  delta: number;
}
