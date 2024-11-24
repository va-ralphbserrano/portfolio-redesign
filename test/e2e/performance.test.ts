import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

async function measurePerformanceMetrics(page: Page) {
  const metrics = await page.evaluate(() => {
    const { loadEventEnd, navigationStart } = performance.timing;
    const paintEntries = performance.getEntriesByType('paint');
    const layoutShiftEntries = performance.getEntriesByType('layout-shift');

    const getFCP = () => {
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp ? fcp.startTime : 0;
    };

    const getTotalLayoutShift = () => {
      return layoutShiftEntries.reduce((total: number, entry: any) => total + entry.value, 0);
    };

    return {
      loadTime: loadEventEnd - navigationStart,
      firstContentfulPaint: getFCP(),
      cumulativeLayoutShift: getTotalLayoutShift(),
    };
  });

  return metrics;
}

test.describe('Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cache and cookies before each test
    await page.context().clearCookies();
    const client = await page.context().newCDPSession(page);
    await client.send('Network.clearBrowserCache');
  });

  test('should meet performance thresholds for homepage', async ({ page }) => {
    await page.goto('/');
    const metrics = await measurePerformanceMetrics(page);

    // Assert performance metrics based on our standards
    expect(metrics.loadTime).toBeLessThan(2500); // 2.5s max load time
    expect(metrics.firstContentfulPaint).toBeLessThan(1500); // 1.5s FCP threshold
    expect(metrics.cumulativeLayoutShift).toBeLessThan(0.1); // 0.1 CLS threshold
  });

  test('should meet performance thresholds for projects section', async ({ page }) => {
    await page.goto('/#projects');
    const metrics = await measurePerformanceMetrics(page);

    expect(metrics.loadTime).toBeLessThan(2500);
    expect(metrics.firstContentfulPaint).toBeLessThan(1500);
    expect(metrics.cumulativeLayoutShift).toBeLessThan(0.1);
  });

  test('should meet image optimization standards', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.evaluate(() => {
      return Array.from(document.images).map(img => ({
        src: img.src,
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
    });

    for (const img of images) {
      // Check if images are properly sized (not significantly larger than displayed size)
      const oversizedRatio = (img.naturalWidth * img.naturalHeight) / (img.width * img.height);
      expect(oversizedRatio).toBeLessThan(4); // Max 4x the displayed size
    }
  });

  test('should meet bundle size requirements', async ({ page }) => {
    const client = await page.context().newCDPSession(page);
    await page.goto('/');

    const resources = await client.send('Network.getResponseBodyForInterception');
    const jsResources = Object.values(resources).filter((r: any) => 
      r.mimeType === 'application/javascript' || r.mimeType === 'text/javascript'
    );

    // Total JS bundle size should be less than 300KB
    const totalJSSize = jsResources.reduce((total: number, r: any) => total + r.body.length, 0);
    expect(totalJSSize).toBeLessThan(300 * 1024);
  });
});
