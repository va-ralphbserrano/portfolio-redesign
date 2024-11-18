export function lighthousePlugin() {
  return {
    name: 'lighthouse-plugin',
    commands: {
      lighthouse({ url, options }) {
        return new Promise((resolve) => {
          // Mock Lighthouse results for development
          resolve({
            categories: {
              performance: { score: 0.95 }
            },
            audits: {
              'first-contentful-paint': { numericValue: 1500 },
              'interactive': { numericValue: 2500 },
              'largest-contentful-paint': { numericValue: 2000 },
              'cumulative-layout-shift': { numericValue: 0.05 },
              'total-blocking-time': { numericValue: 200 }
            }
          });
        });
      }
    }
  };
}

export function webVitalsPlugin() {
  return {
    name: 'web-vitals-plugin',
    commands: {
      'web-vitals'({ url }) {
        return new Promise((resolve) => {
          // Mock Web Vitals results for development
          resolve({
            FCP: 1500,
            LCP: 2000,
            CLS: 0.05,
            FID: 50,
            TTFB: 300
          });
        });
      }
    }
  };
}

export function resourceTimingPlugin() {
  return {
    name: 'resource-timing-plugin',
    commands: {
      'resource-timing'({ url }) {
        return new Promise((resolve) => {
          // Mock Resource Timing results for development
          resolve([
            { initiatorType: 'script', transferSize: 50000 },
            { initiatorType: 'script', transferSize: 30000 },
            { initiatorType: 'css', transferSize: 20000 },
            { initiatorType: 'img', transferSize: 100000 },
            { initiatorType: 'img', transferSize: 150000 }
          ]);
        });
      }
    }
  };
}
