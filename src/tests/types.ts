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

// Test context interface
export interface TestContext {
  container: HTMLElement;
  debug: boolean;
  timeout: number;
}

// Test config interface
export interface TestConfig {
  name: string;
  description?: string;
  timeout?: number;
  skip?: boolean;
  only?: boolean;
}

// Test result interface
export interface TestResult {
  passed: boolean;
  message?: string;
  error?: Error;
  duration: number;
}

// Test suite interface
export interface TestSuite {
  name: string;
  tests: TestConfig[];
  beforeAll?: () => Promise<void>;
  afterAll?: () => Promise<void>;
  beforeEach?: () => Promise<void>;
  afterEach?: () => Promise<void>;
}

// Test report interface
export interface TestReport {
  suiteName: string;
  passed: boolean;
  total: number;
  passed_count: number;
  failed_count: number;
  skipped_count: number;
  duration: number;
  results: TestResult[];
}

// Type guard for checking if an error is an Error object
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// Type guard for checking if a value is a TestConfig
export function isTestConfig(value: unknown): value is TestConfig {
  return typeof value === 'object' && value !== null && 'name' in value;
}

// Type guard for checking if a value is a TestResult
export function isTestResult(value: unknown): value is TestResult {
  return typeof value === 'object' && value !== null && 'passed' in value && 'duration' in value;
}
