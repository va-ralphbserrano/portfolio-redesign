# Test Configuration and Setup

## Overview
This document details the test configuration and setup for the portfolio website.

## Test Framework Setup

### Vitest Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/tests/']
    }
  }
});
```

### Test Setup File
```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }))
});
```

## Test Utilities

### Custom Renders
```typescript
// src/tests/test-utils.tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/context/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AllTheProviders = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Mock Data
```typescript
// src/tests/mocks/data.ts
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com'
};

export const mockProjects = [
  { id: '1', title: 'Project 1' },
  { id: '2', title: 'Project 2' }
];
```

## Running Tests

### NPM Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### Test Commands
```bash
# Run tests once
npm test

# Watch mode
npm run test:watch

# Generate coverage
npm run test:coverage

# Open UI
npm run test:ui
```

## E2E Testing Setup

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## Performance Testing

### Lighthouse CI Configuration
```javascript
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run preview",
      "url": ["http://localhost:4173"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "interactive": ["error", {"maxNumericValue": 4000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}]
      }
    }
  }
}
```

## CI/CD Testing Workflow

### GitHub Actions Configuration
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test
      
      - name: Run E2E tests
        run: |
          npm run build
          npm run test:e2e
      
      - name: Run Lighthouse CI
        run: npm run test:lighthouse
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## CI Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
```

## Best Practices

### Test Organization
- Group tests by feature
- Use descriptive test names
- Follow AAA pattern

### Mock Strategy
- Mock external dependencies
- Use MSW for API mocks
- Maintain mock data files

### Coverage Goals
- Maintain 80% coverage
- Focus on critical paths
- Include edge cases
