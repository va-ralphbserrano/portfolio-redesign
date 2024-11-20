# Testing Configuration Documentation

## Overview
The project uses Vitest as its testing framework, configured to work seamlessly with React, TypeScript, and the project's module resolution system. The testing environment is set up to handle modern web APIs and includes comprehensive mocking of browser APIs.

## Configuration Structure

### Vitest Configuration (vitest.config.ts)

#### Core Setup
```typescript
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true
  }
})
```

#### Key Components
1. **Plugins**
   - `@vitejs/plugin-react`: React support
   - `vite-tsconfig-paths`: TypeScript path resolution

2. **Test Environment**
   - Uses `jsdom` for DOM simulation
   - Global test access without imports
   - Custom setup file for environment configuration

3. **Coverage Settings**
```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    'coverage/**',
    'dist/**',
    '**/[.]**',
    'packages/*/test?(s)/**',
    '**/*.d.ts',
    '**/virtual:*',
    '**/__mocks__/*',
    '**/node_modules/**'
  ]
}
```

### Path Resolution
```typescript
resolve: {
  alias: {
    '@': './src',
    '@components': './src/components',
    '@utils': './src/utils',
    '@services': './src/services',
    '@assets': './src/assets',
    '@styles': './src/styles',
    '@hooks': './src/hooks',
    '@types': './src/types',
    '@tests': './src/tests'
  }
}
```
- Matches project's module resolution
- Enables clean imports in tests
- Consistent with TypeScript paths

## Test Environment Setup (setup.ts)

### Global Mocks

#### 1. Fetch API
```typescript
const mockFetch = vi.fn();
global.fetch = mockFetch;
```
- Enables API call mocking
- Customizable response simulation

#### 2. Performance API
```typescript
global.performance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn()
};
```
- Complete performance API simulation
- Timing and measurement support

#### 3. Browser APIs
- **ResizeObserver**
- **IntersectionObserver**
- **PromiseRejectionEvent**
- **Computed Styles**
- **Animation Functions**

### Testing Library Setup
- Integration with `@testing-library/jest-dom`
- Enhanced DOM assertions
- Accessibility testing support

## Best Practices

### 1. Test Organization
- Group tests by feature/component
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Mocking
```typescript
// API Mocking
mockFetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'test' })
});

// Observer Mocking
const mockIntersectionObserver = new IntersectionObserver((callback) => {
  callback([{ isIntersecting: true }]);
});
```

### 3. Coverage
- Aim for comprehensive coverage
- Focus on critical paths
- Include edge cases
- Document uncovered scenarios

## Testing Workflows

### 1. Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 2. Hook Testing
```typescript
import { renderHook } from '@testing-library/react';
import { useMyHook } from '@hooks/useMyHook';

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBeDefined();
  });
});
```

### 3. API Testing
```typescript
import { testApiCall } from '@services/api';

describe('API', () => {
  it('handles successful response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'success' })
    });
    const result = await testApiCall();
    expect(result.data).toBe('success');
  });
});
```

## Troubleshooting

### Common Issues

1. **Test Environment**
   - Check jsdom setup
   - Verify global mocks
   - Ensure proper cleanup

2. **Async Tests**
   - Use proper async/await
   - Handle promises correctly
   - Set appropriate timeouts

3. **Coverage Issues**
   - Review exclude patterns
   - Check file inclusion
   - Verify reporter configuration

### Solutions

1. **Environment Setup**
```typescript
beforeEach(() => {
  // Reset mocks
  vi.clearAllMocks();
  // Clear DOM
  document.body.innerHTML = '';
});
```

2. **Async Testing**
```typescript
it('handles async operations', async () => {
  await vi.dynamicImportSettled();
  expect(await screen.findByText('loaded')).toBeInTheDocument();
});
```

3. **Mock Reset**
```typescript
afterEach(() => {
  mockFetch.mockReset();
  vi.clearAllTimers();
});
```

## Additional Resources

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Jest DOM](https://github.com/testing-library/jest-dom)

### Project-Specific
- Test examples in `/src/tests`
- Component test templates
- Mock data utilities
