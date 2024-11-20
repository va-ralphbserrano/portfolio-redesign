import { test as base } from '@playwright/test';
import { toMatchSnapshot } from 'jest-snapshot';
import type { Page } from '@playwright/test';

// Extend basic test with snapshot capabilities
export const test = base.extend({
  page: async ({ page }, use) => {
    // Configure viewport sizes for testing
    const viewports = [
      { width: 320, height: 568 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 }
    ];

    // Add custom snapshot matcher
    expect.extend({ toMatchSnapshot });

    // Configure page for visual testing
    await page.setViewportSize(viewports[0]);
    await use(page);
  }
});

// Helper functions for visual testing
export const compareScreenshot = async (
  page: Page,
  name: string,
  options = {}
) => {
  const screenshot = await page.screenshot({
    fullPage: true,
    ...options
  });

  expect(screenshot).toMatchSnapshot(name);
};

// Custom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSnapshot(): R;
    }
  }
}
