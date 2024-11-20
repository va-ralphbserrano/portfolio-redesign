# Testing Guide

## Overview

The portfolio uses a comprehensive testing strategy including unit tests, integration tests, performance tests, and end-to-end tests.

## Test Infrastructure

### Test Tools
- Vitest: Unit and integration testing
- Playwright: End-to-end testing
- Lighthouse CI: Performance testing
- Web Test Runner: Component testing

### Test Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/tests/'],
    },
    globals: true,
  },
});
```

## Unit Testing

### Component Testing
```typescript
// Example component test
describe('Button', () => {
  it('renders correctly', () => {
    const { getByRole } = render(
      <Button variant="primary">Click me</Button>
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={onClick}>Click me</Button>
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Hook Testing
```typescript
// Example hook test
describe('useTheme', () => {
  it('provides theme context', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
  });
});
```

## Integration Testing

### API Integration
```typescript
// Example API test
describe('EmailService', () => {
  it('sends email successfully', async () => {
    const payload = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test',
      message: 'Test message'
    };
    
    const response = await sendEmail(payload);
    expect(response.status).toBe(200);
  });
});
```

### Component Integration
```typescript
// Example component integration test
describe('ProjectGrid', () => {
  it('filters projects by category', async () => {
    const { getByRole, findAllByTestId } = render(
      <ProjectGrid initialCategory="Web" />
    );
    
    const projects = await findAllByTestId('project-card');
    expect(projects.length).toBeGreaterThan(0);
  });
});
```

## End-to-End Testing

### Setup
```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
};

export default config;
```

### Test Examples
```typescript
// Example E2E test
test('navigates through portfolio', async ({ page }) => {
  await page.goto('/');
  
  // Test navigation
  await page.click('nav >> text=Projects');
  await expect(page).toHaveURL('/projects');
  
  // Test project interaction
  await page.click('[data-testid="project-card"]');
  await expect(page.locator('h1')).toBeVisible();
});
```

## Performance Testing

### Lighthouse CI
```javascript
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npm run preview',
      url: ['http://localhost:3000'],
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### Performance Metrics
```typescript
// Example performance test
describe('Performance', () => {
  it('loads within performance budget', async () => {
    const metrics = await measurePageLoad('/');
    expect(metrics.FCP).toBeLessThan(1000);
    expect(metrics.LCP).toBeLessThan(2500);
    expect(metrics.CLS).toBeLessThan(0.1);
  });
});
```

## Test Best Practices

### 1. Component Testing
- Test component rendering
- Test user interactions
- Test prop variations
- Test error states

### 2. Integration Testing
- Test component combinations
- Test data flow
- Test side effects
- Test error handling

### 3. E2E Testing
- Test critical user paths
- Test form submissions
- Test navigation
- Test responsive behavior

### 4. Performance Testing
- Test load times
- Test resource usage
- Test animation performance
- Test network handling

## Continuous Integration

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
      - run: npm run test:lighthouse
```

### Test Reports
- Coverage reports
- Performance reports
- E2E test videos
- Error screenshots
