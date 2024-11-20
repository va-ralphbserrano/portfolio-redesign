# Context Management

## Overview
This document outlines the context management strategy in the portfolio website.

## Directory Structure

```
src/
├── context/           # Core context implementations
│   ├── PDFContext    # PDF handling and state
│   ├── ThemeContext  # Theme management
│   └── MetricsContext # Performance metrics
└── contexts/         # Feature-specific contexts
    └── ProjectContext # Project data management
```

## Core Contexts

### PDF Context
```typescript
interface PDFContextType {
  isWorkerReady: boolean;
  currentPage: number;
  totalPages: number;
  scale: number;
  setCurrentPage: (page: number) => void;
  setScale: (scale: number) => void;
}
```
- PDF.js worker initialization state
- PDF rendering capability management
- Worker lifecycle handling
- Page navigation
- Zoom control

### Theme Context
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  systemPreference: 'light' | 'dark';
}
```
- Theme state management
- System preference detection
- Theme persistence
- Dynamic theme switching

### Metrics Context
```typescript
interface MetricsContextType {
  performance: PerformanceMetrics;
  errors: ErrorMetrics;
  usage: UsageMetrics;
  addMetric: (metric: Metric) => void;
  clearMetrics: () => void;
}
```
- Performance tracking
- Error monitoring
- Usage analytics
- Metric collection

## Provider Implementation

### Context Composition
```typescript
function AppProviders({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <PDFProvider>
        <MetricsProvider>
          {children}
        </MetricsProvider>
      </PDFProvider>
    </ThemeProvider>
  );
}
```

### Usage Examples

#### PDF Context
```typescript
function PDFViewer() {
  const { 
    isWorkerReady, 
    currentPage,
    totalPages,
    scale,
    setCurrentPage,
    setScale 
  } = usePDF();
  
  if (!isWorkerReady) {
    return <div>Loading PDF capabilities...</div>;
  }
  
  return (
    <div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <button onClick={() => setScale(scale + 0.1)}>
        Zoom In
      </button>
    </div>
  );
}
```

#### Theme Context
```typescript
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

#### Metrics Context
```typescript
function PerformanceMonitor() {
  const { performance, addMetric } = useMetrics();
  
  useEffect(() => {
    const metric = measurePerformance();
    addMetric(metric);
  }, []);
  
  return (
    <div>
      <h3>Performance Metrics</h3>
      <pre>{JSON.stringify(performance, null, 2)}</pre>
    </div>
  );
}
```

## Best Practices

### State Management
- Keep contexts focused and minimal
- Split complex state into multiple contexts
- Use local state when possible
- Implement proper memoization

### Performance
- Avoid unnecessary re-renders
- Use context selectors
- Split context providers
- Implement proper error boundaries

### Error Handling
- Provide fallback values
- Handle loading states
- Implement error boundaries
- Log context errors

### Testing
- Mock context providers
- Test context updates
- Verify error states
- Check performance impact
