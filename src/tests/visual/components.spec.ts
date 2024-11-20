import { test, compareScreenshot } from './setup';

test.describe('Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('header component renders correctly', async ({ page }) => {
    await compareScreenshot(page, 'header-default');
    
    // Test hover state
    await page.hover('nav a:first-child');
    await compareScreenshot(page, 'header-hover');
  });

  test('project card renders correctly', async ({ page }) => {
    const card = page.locator('.project-card').first();
    await card.scrollIntoViewIfNeeded();
    await compareScreenshot(page, 'project-card-default');
    
    // Test interaction state
    await card.hover();
    await compareScreenshot(page, 'project-card-hover');
  });

  test('responsive layout at different breakpoints', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await compareScreenshot(page, `layout-${viewport.width}`);
    }
  });
});
