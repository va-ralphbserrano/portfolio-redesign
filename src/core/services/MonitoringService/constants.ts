export const DEFAULT_CONFIG = {
  sampleRate: 0.1,
  reportingEndpoint: '/api/metrics',
  errorThreshold: 0.05,
  performanceThreshold: {
    fcp: 1000, // 1s
    lcp: 2500, // 2.5s
    tti: 3500, // 3.5s
    cls: 0.1   // 0.1 score
  }
};

export const COLLECTOR_INTERVALS = {
  performance: 5000,  // 5s
  resources: 10000,   // 10s
  errors: 1000        // 1s
};

export const BATCH_SIZE = 100;
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1s
