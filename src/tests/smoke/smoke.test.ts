import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('critical path - homepage loads', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/);
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('critical path - projects page', async ({ page }) => {
    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL(/.*projects/);
    await expect(page.locator('[data-testid="projects-grid"]')).toBeVisible();
  });

  test('critical path - about page', async ({ page }) => {
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('[data-testid="about-content"]')).toBeVisible();
  });

  test('critical path - contact form', async ({ page }) => {
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    const submitButton = form.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('critical path - responsive layout', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });

  test('critical path - dark mode toggle', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible();
    
    await themeToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    await themeToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});
