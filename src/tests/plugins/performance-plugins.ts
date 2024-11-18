import { TestRunnerPlugin } from '@web/test-runner';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals';
import { LighthouseMetrics, WebVitals, ResourceTiming } from '../types';

interface ExecuteCommandArgs<T> {
  command: string;
  payload?: T;
}

interface LighthouseResults {
  categories: {
    performance: {
      score: number;
    };
  };
  audits: {
    'first-contentful-paint': { numericValue: number };
    'interactive': { numericValue: number };
    'largest-contentful-paint': { numericValue: number };
    'cumulative-layout-shift': { numericValue: number };
    'total-blocking-time': { numericValue: number };
  };
}

async function launchChromeAndRunLighthouse(url: string, opts: any): Promise<LighthouseResults> {
  const chrome = await launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const options = {
    ...opts,
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
  };

  const runnerResult = await lighthouse(url, options);
  if (!runnerResult || !runnerResult.lhr) {
    throw new Error('Lighthouse audit failed to return results');
  }

  await chrome.kill();
  return runnerResult.lhr as unknown as LighthouseResults;
}

export function realLighthousePlugin(): TestRunnerPlugin {
  return {
    name: 'real-lighthouse-plugin',
    async executeCommand(args: ExecuteCommandArgs<unknown>) {
      if (args.command === 'lighthouse' && args.payload && typeof args.payload === 'object') {
        const { url, options } = args.payload as { url: string; options: any };
        
        try {
          const results = await launchChromeAndRunLighthouse(url, options);
          
          if (!results.categories.performance || !results.audits) {
            throw new Error('Invalid Lighthouse results structure');
          }

          return {
            categories: {
              performance: {
                score: results.categories.performance.score
              }
            },
            audits: {
              'first-contentful-paint': {
                numericValue: results.audits['first-contentful-paint'].numericValue
              },
              'interactive': {
                numericValue: results.audits['interactive'].numericValue
              },
              'largest-contentful-paint': {
                numericValue: results.audits['largest-contentful-paint'].numericValue
              },
              'cumulative-layout-shift': {
                numericValue: results.audits['cumulative-layout-shift'].numericValue
              },
              'total-blocking-time': {
                numericValue: results.audits['total-blocking-time'].numericValue
              }
            }
          } as LighthouseMetrics;
        } catch (error) {
          console.error('Lighthouse measurement failed:', error);
          throw error;
        }
      }
      return undefined;
    }
  };
}

export function realWebVitalsPlugin(): TestRunnerPlugin {
  return {
    name: 'real-web-vitals-plugin',
    async executeCommand(args: ExecuteCommandArgs<unknown>) {
      if (args.command === 'web-vitals' && args.payload && typeof args.payload === 'object') {
        try {
          const metrics: Partial<WebVitals> = {};
          
          // Create promises for each metric
          const promises = [
            new Promise<void>(resolve => {
              onLCP(metric => {
                metrics.LCP = metric.value;
                resolve();
              });
            }),
            new Promise<void>(resolve => {
              onFID(metric => {
                metrics.FID = metric.value;
                resolve();
              });
            }),
            new Promise<void>(resolve => {
              onCLS(metric => {
                metrics.CLS = metric.value;
                resolve();
              });
            }),
            new Promise<void>(resolve => {
              onFCP(metric => {
                metrics.FCP = metric.value;
                resolve();
              });
            }),
            new Promise<void>(resolve => {
              onTTFB(metric => {
                metrics.TTFB = metric.value;
                resolve();
              });
            })
          ];

          // Wait for all metrics to be collected with a timeout
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Web Vitals collection timed out')), 10000);
          });

          await Promise.race([Promise.all(promises), timeoutPromise]);

          if (!metrics.LCP || !metrics.FID || !metrics.CLS || !metrics.FCP || !metrics.TTFB) {
            throw new Error('Not all Web Vitals metrics were collected');
          }

          return metrics as WebVitals;
        } catch (error) {
          console.error('Web Vitals measurement failed:', error);
          throw error;
        }
      }
      return undefined;
    }
  };
}

export function realResourceTimingPlugin(): TestRunnerPlugin {
  return {
    name: 'real-resource-timing-plugin',
    async executeCommand(args: ExecuteCommandArgs<unknown>) {
      if (args.command === 'resource-timing' && args.payload && typeof args.payload === 'object') {
        try {
          // Use Performance API to get resource timing data
          const entries = performance.getEntriesByType('resource');
          
          return entries.map(entry => {
            const resourceTiming = entry as PerformanceResourceTiming;
            return {
              initiatorType: resourceTiming.initiatorType,
              transferSize: resourceTiming.transferSize || 0
            };
          }) as ResourceTiming[];
        } catch (error) {
          console.error('Resource timing measurement failed:', error);
          throw error;
        }
      }
      return undefined;
    }
  };
}
