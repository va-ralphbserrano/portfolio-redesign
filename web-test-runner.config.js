import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';

// Mock Lighthouse Plugin
function mockLighthousePlugin() {
  return {
    name: 'mock-lighthouse-plugin',
    async executeCommand({ command }) {
      if (command === 'lighthouse') {
        const metrics = {
          categories: {
            performance: {
              score: 0.95
            }
          },
          audits: {
            'first-contentful-paint': {
              numericValue: 1500
            },
            'interactive': {
              numericValue: 2500
            },
            'largest-contentful-paint': {
              numericValue: 2000
            },
            'cumulative-layout-shift': {
              numericValue: 0.05
            },
            'total-blocking-time': {
              numericValue: 200
            }
          }
        };

        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Lighthouse Metrics]', metrics);
        }

        return metrics;
      }
      return undefined;
    }
  };
}

// Mock Web Vitals Plugin
function mockWebVitalsPlugin() {
  return {
    name: 'mock-web-vitals-plugin',
    async executeCommand({ command }) {
      if (command === 'web-vitals') {
        const metrics = {
          FCP: 1500,
          LCP: 2000,
          CLS: 0.05,
          FID: 50,
          TTFB: 300
        };

        // Log web vitals in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Web Vitals]', metrics);
        }

        return metrics;
      }
      return undefined;
    }
  };
}

// Mock Resource Timing Plugin
function mockResourceTimingPlugin() {
  return {
    name: 'mock-resource-timing-plugin',
    async executeCommand({ command }) {
      if (command === 'resource-timing') {
        const timings = [
          { initiatorType: 'script', transferSize: 50000 },
          { initiatorType: 'script', transferSize: 30000 },
          { initiatorType: 'css', transferSize: 20000 },
          { initiatorType: 'img', transferSize: 100000 },
          { initiatorType: 'img', transferSize: 150000 }
        ];

        // Log resource timings in development
        if (process.env.NODE_ENV === 'development') {
          const totalSize = timings.reduce((sum, timing) => sum + timing.transferSize, 0);
          console.log('[Resource Timings]', {
            resources: timings,
            totalSize,
            resourceCounts: {
              scripts: timings.filter(t => t.initiatorType === 'script').length,
              styles: timings.filter(t => t.initiatorType === 'css').length,
              images: timings.filter(t => t.initiatorType === 'img').length
            }
          });

          // Log warnings for large resources
          timings.forEach(timing => {
            if (timing.transferSize > 500 * 1024) { // 500KB
              console.warn(`[Resource Warning] Large ${timing.initiatorType} detected: ${timing.transferSize / 1024}KB`);
            }
          });

          if (totalSize > 1024 * 1024) { // 1MB
            console.warn(`[Resource Warning] Total resource size exceeds 1MB: ${totalSize / 1024 / 1024}MB`);
          }
        }

        return timings;
      }
      return undefined;
    }
  };
}

export default {
  files: 'src/tests/**/*.test.ts',
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ 
      product: 'chromium',
      launchOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }),
  ],
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
  ],
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    mockLighthousePlugin(),
    mockWebVitalsPlugin(),
    mockResourceTimingPlugin(),
  ],
  testFramework: {
    config: {
      timeout: 30000,
      ui: 'bdd',
      retries: 2
    },
  },
  testRunnerHtml: testFramework => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>Web Test Runner</title>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  middleware: [
    function rewriteBase(context, next) {
      if (context.url.startsWith('/va-rb-portfolio/')) {
        context.url = context.url.replace('/va-rb-portfolio/', '/');
      }
      return next();
    },
  ],
  testsStartTimeout: 60000,
  browserStartTimeout: 60000,
  sessionStartTimeout: 60000,
  staticLogging: true,
};
