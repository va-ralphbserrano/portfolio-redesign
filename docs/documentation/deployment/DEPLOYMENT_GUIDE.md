# Deployment Guide

## Overview

This guide covers the deployment process for the portfolio website, including build configuration, deployment environments, and monitoring.

## Build Process

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
  },
});
```

### Build Scripts
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## Deployment Environments

### Development
- Local development server
- Hot module replacement
- Source maps enabled
- Development tools

### Staging
- Preview deployments
- Integration testing
- Performance testing
- User acceptance testing

### Production
- Optimized builds
- CDN integration
- Error monitoring
- Analytics tracking

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Performance Optimization

### 1. Asset Optimization
```javascript
// Image optimization
import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import webp from 'imagemin-webp';

await imagemin(['src/assets/*.{jpg,png}'], {
  destination: 'dist/assets',
  plugins: [
    mozjpeg({ quality: 75 }),
    webp({ quality: 75 })
  ]
});
```

### 2. Caching Strategy
```typescript
// Service worker configuration
const CACHE_VERSION = 'v1';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

const CACHED_ASSETS = [
  '/',
  '/index.html',
  '/assets/main.js',
  '/assets/style.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHED_ASSETS);
    })
  );
});
```

## Monitoring

### 1. Error Tracking
```typescript
// Error monitoring setup
interface ErrorConfig {
  dsn: string;
  environment: 'development' | 'staging' | 'production';
  tracesSampleRate: number;
}

function setupErrorMonitoring(config: ErrorConfig): void {
  // Initialize error tracking
  // Set up error boundaries
  // Configure logging
}
```

### 2. Performance Monitoring
```typescript
// Performance monitoring
interface PerformanceMetrics {
  FCP: number;  // First Contentful Paint
  LCP: number;  // Largest Contentful Paint
  FID: number;  // First Input Delay
  CLS: number;  // Cumulative Layout Shift
  TTI: number;  // Time to Interactive
}

function trackPerformance(): PerformanceMetrics {
  // Collect performance metrics
  // Report to analytics
  // Monitor thresholds
}
```

## Security Measures

### Pre-deployment Security Checklist
- [ ] Run security vulnerability scan
- [ ] Check for exposed environment variables
- [ ] Verify access controls
- [ ] Run OWASP ZAP scan
- [ ] Review Docker security configuration
- [ ] Check SSL/TLS configuration
- [ ] Verify API endpoint security

### Performance Requirements
- Bundle size limits:
  - Main bundle: < 200KB
  - Vendor bundle: < 300KB
  - Total initial load: < 1MB
- Performance metrics:
  - FCP (First Contentful Paint): < 1.5s
  - TTI (Time to Interactive): < 2.5s
  - LCP (Largest Contentful Paint): < 2s
  - CLS (Cumulative Layout Shift): < 0.1

### Rollback Procedure
1. Keep previous deployment tagged
2. Maintain configuration version control
3. Database backup before deployment
4. Automated rollback triggers:
   - Health check failure
   - Error rate threshold
   - Performance degradation

## Security

### 1. Headers Configuration
```typescript
// Security headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
```

### 2. Environment Variables
```typescript
// Environment variable validation
interface EnvConfig {
  VITE_API_URL: string;
  VITE_GA_ID: string;
  VITE_EMAILJS_USER_ID: string;
  VITE_EMAILJS_SERVICE_ID: string;
  VITE_EMAILJS_TEMPLATE_ID: string;
}

function validateEnv(): EnvConfig {
  // Validate required variables
  // Check format and values
  // Provide defaults where appropriate
}
```

## Rollback Procedures

### 1. Version Management
```typescript
interface DeploymentVersion {
  version: string;
  timestamp: number;
  commit: string;
  artifacts: string[];
}

async function rollback(version: string): Promise<void> {
  // Verify version exists
  // Stop current deployment
  // Restore previous version
  // Verify deployment
}
```

### 2. Health Checks
```typescript
interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: {
    api: boolean;
    database: boolean;
    cache: boolean;
  };
  latency: number;
}

async function checkHealth(): Promise<HealthCheck> {
  // Check system components
  // Verify integrations
  // Monitor response times
}
