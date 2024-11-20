import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate through main sections', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Portfolio/);

    // Test navigation to Projects section
    await page.click('text=Projects');
    await expect(page).toHaveURL(/.*#projects/);
    await expect(page.locator('h2:has-text("Projects")')).toBeVisible();

    // Test navigation to About section
    await page.click('text=About');
    await expect(page).toHaveURL(/.*#about/);
    await expect(page.locator('h2:has-text("About")')).toBeVisible();

    // Test navigation to Contact section
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*#contact/);
    await expect(page.locator('h2:has-text("Contact")')).toBeVisible();
  });

  test('should handle mobile navigation menu', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Open mobile menu
    await page.click('[aria-label="Toggle navigation menu"]');
    
    // Verify menu items are visible
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('text=Projects')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });
});
