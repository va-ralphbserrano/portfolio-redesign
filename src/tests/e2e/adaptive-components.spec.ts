import { test, expect } from '@playwright/test';

test.describe('Adaptive Components E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('AdaptiveImage', () => {
    test('should load images progressively', async ({ page }) => {
      // Wait for image to start loading
      const image = page.locator('[data-testid="adaptive-image"]').first();
      await expect(image).toBeVisible();

      // Check initial blur state
      const initialFilter = await image.evaluate((el) => 
        window.getComputedStyle(el).filter
      );
      expect(initialFilter).toContain('blur');

      // Wait for full image load
      await image.evaluate((el) => {
        return new Promise((resolve) => {
          if ((el as HTMLImageElement).complete) {
            resolve(true);
          } else {
            el.addEventListener('load', () => resolve(true), { once: true });
          }
        });
      });

      // Check final state
      const finalFilter = await image.evaluate((el) => 
        window.getComputedStyle(el).filter
      );
      expect(finalFilter).toBe('none');
    });

    test('should handle image errors gracefully', async ({ page }) => {
      // Force image to fail
      await page.route('**/*.{png,jpg,jpeg,webp,avif}', route => route.abort());
      
      const image = page.locator('[data-testid="adaptive-image"]').first();
      await expect(image).toBeVisible();
      
      // Should show fallback/placeholder
      const src = await image.getAttribute('src');
      expect(src).toContain('placeholder');
    });

    test('should use correct image format based on browser support', async ({ page }) => {
      const image = page.locator('[data-testid="adaptive-image"]').first();
      const srcset = await image.getAttribute('srcset');
      
      // Check if WebP or AVIF is being used when supported
      expect(srcset).toMatch(/\.(webp|avif)/);
    });
  });

  test.describe('AdaptiveContainer', () => {
    test('should adapt to viewport changes', async ({ page }) => {
      const container = page.locator('[data-testid="adaptive-container"]').first();
      
      // Check initial size
      const initialWidth = await container.evaluate((el) => el.clientWidth);
      
      // Resize viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(200); // Wait for resize debounce
      
      // Check responsive behavior
      const mobileWidth = await container.evaluate((el) => el.clientWidth);
      expect(mobileWidth).toBeLessThan(initialWidth);
      
      // Check padding changes
      const mobilePadding = await container.evaluate((el) => 
        window.getComputedStyle(el).padding
      );
      expect(mobilePadding).toBe('1rem'); // Base padding for mobile
    });

    test('should maintain layout stability during content changes', async ({ page }) => {
      const container = page.locator('[data-testid="adaptive-container"]').first();
      
      // Record initial position
      const initialBounds = await container.boundingBox();
      
      // Trigger content change (e.g., image load)
      await page.evaluate(() => {
        const img = document.createElement('img');
        img.src = '/test-image.jpg';
        document.querySelector('[data-testid="adaptive-container"]')?.appendChild(img);
      });
      
      // Check position after content change
      const finalBounds = await container.boundingBox();
      expect(finalBounds?.x).toBe(initialBounds?.x);
      expect(finalBounds?.y).toBe(initialBounds?.y);
    });

    test('should handle user interactions smoothly', async ({ page }) => {
      const container = page.locator('[data-testid="adaptive-container"]').first();
      
      // Record performance metrics
      const metrics = await page.evaluate(async () => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          return entries.map(entry => ({
            name: entry.name,
            duration: entry.duration
          }));
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Simulate user interaction
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        document.querySelector('[data-testid="adaptive-container"]')?.dispatchEvent(event);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        return observer.takeRecords();
      });
      
      // Check for minimal layout shifts
      const totalLayoutShift = metrics.reduce((acc, m) => acc + m.duration, 0);
      expect(totalLayoutShift).toBeLessThan(0.1); // Should meet CLS threshold
    });
  });

  test.describe('Performance', () => {
    test('should meet performance budgets', async ({ page }) => {
      // Enable performance metrics
      await page.evaluate(() => {
        window.performance.mark('test-start');
      });
      
      // Load the page with components
      await page.reload();
      
      // Get performance metrics
      const metrics = await page.evaluate(() => {
        window.performance.mark('test-end');
        window.performance.measure('test-duration', 'test-start', 'test-end');
        
        const [measure] = performance.getEntriesByName('test-duration');
        const [fcp] = performance.getEntriesByType('paint');
        const [lcp] = performance.getEntriesByType('largest-contentful-paint');
        
        return {
          duration: measure.duration,
          fcp: fcp?.startTime,
          lcp: lcp?.startTime,
        };
      });
      
      // Assert performance budgets
      expect(metrics.duration).toBeLessThan(3000); // Total load time
      expect(metrics.fcp).toBeLessThan(1000); // First Contentful Paint
      expect(metrics.lcp).toBeLessThan(2500); // Largest Contentful Paint
    });
  });
});
