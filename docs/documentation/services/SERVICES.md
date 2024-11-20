# Services Documentation

## Overview
This document outlines the core services used in the portfolio website for monitoring, metrics collection, error reporting, and alerting.

## Service Architecture

### MetricCollectionService
```typescript
import { PerformanceMetric } from '../utils/monitoring';

interface MetricCollectionConfig {
  apiEndpoint: string;
  batchSize?: number;
  flushInterval?: number;
}

interface MetricPayload {
  metrics: PerformanceMetric[];
  timestamp: number;
  environment: string;
}

class MetricCollectionService {
  private static instance: MetricCollectionService;
  
  public static getInstance(): MetricCollectionService;
  public initialize(config: MetricCollectionConfig): void;
  public trackMetric(metric: PerformanceMetric): void;
  public subscribe(observer: (metrics: PerformanceMetric[]) => void): () => void;
  private setupPerformanceMonitoring(): void;
  private startBufferFlush(): void;
  private flushMetrics(): Promise<void>;
}
```

**Purpose**: Real-time collection and reporting of performance metrics
- Implements Singleton pattern for global metric collection
- Batches metrics for efficient reporting
- Supports observer pattern for real-time monitoring
- Configurable batch size and flush intervals
- Automatic performance metric collection
- Buffer management for metric batching

### AlertingService
```typescript
import { ErrorContext, ErrorSeverity } from '../utils/monitoring';

interface AlertConfig {
  apiEndpoint?: string;
  batchSize?: number;
  flushInterval?: number;
}

interface AlertPayload {
  errors: ErrorContext[];
  metrics: PerformanceMetric[];
  timestamp: number;
  environment: string;
}

interface MetricCondition {
  name: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  severity: ErrorSeverity;
}

class AlertingService {
  private static instance: AlertingService;
  
  public static getInstance(): AlertingService;
  public initialize(config: AlertConfig): void;
  public addError(error: ErrorContext): void;
  public addMetric(metric: PerformanceMetric): void;
  private checkMetricConditions(metric: PerformanceMetric): void;
  private flushAlerts(): Promise<void>;
}
```

**Purpose**: Proactive monitoring and alerting system
- Monitors both errors and performance metrics
- Configurable alert thresholds
- Severity-based alerting
- Metric condition checking
- Batched alert reporting
- Real-time condition evaluation

### ErrorReportingService
```typescript
interface ErrorReportingConfig {
  apiEndpoint: string;
  batchSize?: number;
  flushInterval?: number;
}

class ErrorReportingService {
  private static instance: ErrorReportingService;
  
  public static getInstance(): ErrorReportingService;
  public static reportError(error: Error): void;
  public initialize(config: ErrorReportingConfig): void;
  private setupErrorHandling(): void;
  private handleError(event: ErrorEvent): void;
  private handleUnhandledRejection(event: PromiseRejectionEvent): void;
  private flushErrors(): Promise<void>;
}
```

**Purpose**: Centralized error reporting and tracking
- Global error handling
- Unhandled rejection catching
- Error context enrichment
- Batched error reporting
- Automatic error collection
- Runtime error monitoring

### MonitoringService
```typescript
interface MonitoringMetrics {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

class MonitoringService {
  async getMetrics(): Promise<MonitoringMetrics>;
}
```

**Purpose**: High-level application monitoring
- Performance scoring
- Accessibility compliance
- SEO metrics tracking
- Best practices monitoring

## Service Integration

### Initialization
```typescript
// Initialize services
const metricService = MetricCollectionService.getInstance();
metricService.initialize({
  apiEndpoint: '/api/metrics',
  batchSize: 10,
  flushInterval: 5000
});

const alertingService = AlertingService.getInstance();
alertingService.initialize({
  apiEndpoint: '/api/alerts',
  batchSize: 5,
  flushInterval: 3000
});

const errorReporting = ErrorReportingService.getInstance();
errorReporting.initialize({
  apiEndpoint: '/api/errors',
  batchSize: 10,
  flushInterval: 5000
});
```

### Error Handling Pattern
```typescript
try {
  // Operation that might fail
  await riskyOperation();
} catch (error) {
  // Report error with context
  ErrorReportingService.getInstance().reportError(error);
  // Add to alerting system if critical
  AlertingService.getInstance().addError({
    message: error.message,
    severity: ErrorSeverity.HIGH,
    timestamp: Date.now()
  });
}
```

### Metric Collection Pattern
```typescript
// Track custom metric
MetricCollectionService.getInstance().trackMetric({
  name: 'custom-operation',
  value: 150,
  timestamp: Date.now(),
  context: {
    operation: 'data-processing',
    environment: 'production'
  }
});

// Subscribe to metrics
const unsubscribe = MetricCollectionService.getInstance().subscribe(
  (metrics) => {
    console.log('New metrics:', metrics);
    // Check for concerning patterns
    AlertingService.getInstance().addMetrics(metrics);
  }
);
```

## Best Practices

### Error Handling
- Always provide error context
- Use appropriate severity levels
- Include stack traces in development
- Sanitize sensitive information

### Performance Monitoring
- Track core web vitals
- Monitor custom operations
- Set appropriate thresholds
- Use batching for efficiency

### Alert Management
- Configure meaningful thresholds
- Avoid alert fatigue
- Implement proper retry logic
- Handle alert priority

### Service Health
- Monitor service state
- Implement circuit breakers
- Handle service degradation
- Maintain error budgets
