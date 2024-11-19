# Portfolio Website Architecture

## System Overview

The portfolio website is built using a modern React architecture with TypeScript, emphasizing performance, accessibility, and user experience. The system follows a modular, component-based architecture with comprehensive monitoring, error handling, and media optimization capabilities.

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ErrorBoundary/
│   │   ├── Loading/
│   │   ├── OptimizedImage/
│   │   ├── OptimizedVideo/
│   │   ├── RouteWrapper/
│   │   └── ...
│   ├── layout/
│   └── sections/
│       ├── About/
│       ├── Certificates/
│       ├── Contact/
│       ├── Hero/
│       ├── Portfolio/
│       └── Services/
├── utils/
│   ├── mediaOptimization.ts
│   ├── helpers.ts
│   └── ...
├── types/
│   ├── component.ts
│   ├── media.ts
│   ├── route.ts
│   └── ...
├── routes/
│   └── index.ts
└── ...
```

## Media Optimization System

### Network Quality Detection
```typescript
// utils/mediaOptimization.ts
export type NetworkQuality = 'slow' | 'medium' | 'fast';

const NETWORK_THRESHOLDS = {
  slow: 1,  // Mbps
  medium: 5 // Mbps
};

export const useNetworkQuality = (): NetworkQuality => {
  // Network quality detection logic
};
```

### Image Format Support
```typescript
// utils/mediaOptimization.ts
export const supportsWebP = async (): Promise<boolean> => {
  // WebP support detection
};

export const supportsAVIF = async (): Promise<boolean> => {
  // AVIF support detection
};
```

### Progressive Image Loading
```typescript
export interface ProgressiveImageProps {
  src: string;
  lowResSrc: string;
  alt: string;
  className?: string;
}

export const useProgressiveImage = (
  highResSrc: string,
  lowResSrc: string
): {
  src: string;
  isLoading: boolean;
} => {
  // Progressive loading logic
};
```

### Video Quality Optimization
```typescript
export interface VideoQualityOptions {
  src: string;
  quality: 'low' | 'medium' | 'high';
  type?: string;
}

export const getOptimalVideoQuality = (
  options: VideoQualityOptions[],
  networkQuality: NetworkQuality
): VideoQualityOptions => {
  // Video quality selection logic
};

export const useOptimalVideoQuality = (
  options: VideoQualityOptions[]
): VideoQualityOptions => {
  // Hook for component usage
};
```

## Optimized Media Components

### OptimizedImage Component
- Network-aware image loading
- Progressive loading with blur effect
- Automatic format switching (WebP/AVIF)
- Quality adjustment based on network speed
- Loading states and animations
- Error handling with fallbacks

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}
```

### OptimizedVideo Component
- Dynamic video quality selection
- Network-aware preloading
- Adaptive playback quality
- Error handling with fallbacks
- Loading states
- Network quality monitoring

```typescript
interface OptimizedVideoProps {
  sources: VideoQualityOptions[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}
```

## Component Organization

Each section component follows a standardized structure:

```
ComponentName/
├── index.ts          # Exports
├── types.ts          # Type definitions
├── Component.tsx     # Main component
├── components/       # Sub-components
└── tests/           # Component tests
```

## Routing Architecture

The routing system is built with React Router and includes:

1. **Route Configuration**
   - Centralized route definitions
   - Type-safe route parameters
   - Lazy loading support

2. **Route Wrapper**
   - Error boundaries
   - Loading states
   - Page transitions
   - Suspense handling

3. **Navigation Features**
   - Smooth transitions
   - Loading indicators
   - Error recovery
   - 404 handling

4. **Performance Optimizations**
   - Code splitting
   - Lazy loading
   - Route prefetching
   - Transition animations

## Type System

### Route Configuration
```typescript
// types/route.ts
import { LazyExoticComponent } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<any>;
}
```

### Component Types
```typescript
// types/component.ts
export interface WithClassName {
  className?: string;
}
```

## Routing

Routes are configured using lazy loading for optimal performance:

```typescript
// routes/index.ts
const routes: RouteConfig[] = [
  { 
    path: '/about',
    component: lazy(() => import('@/components/sections/About'))
  },
  // ...
];
```

## Application Flow

1. **Initialization**
   - Application bootstraps from `main.tsx`
   - Wraps the app with essential providers:
     - `ErrorBoundary` for error handling
     - `ThemeProvider` for dark/light mode
     - `BrowserRouter` for routing
   - Loads global styles (Tailwind, animations, Swiper)

2. **Theme Management**
   - Persists theme preference in localStorage
   - Syncs with system preferences using `prefers-color-scheme`
   - Provides theme context throughout the application
   - Dynamically updates document root classes

3. **Performance Monitoring**
   - Comprehensive monitoring dashboard
   - Services:
     - `AlertingService`: Real-time alerts
     - `ErrorReportingService`: Error tracking
     - `MetricCollectionService`: Performance metrics
     - `MonitoringService`: System monitoring

## Portfolio Section Architecture

### Component Structure
```
src/
├── components/
│   └── sections/
│       └── portfolio/
│           ├── Portfolio.tsx         # Main portfolio component
│           ├── ProjectCard.tsx       # Individual project display
│           ├── CategoryTabs.tsx      # Category navigation
│           ├── SubcategoryTabs.tsx   # Subcategory filtering
│           └── types.ts             # Type definitions
└── data/
    └── projects.ts                  # Project data structure
```

### Data Model
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  subcategory: string;
  technologies: string[];
  images: {
    main: string;
    gallery?: string[];
  };
  details?: {
    specs?: string[];
    features?: string[];
    timeline?: string;
  };
}

enum ProjectCategory {
  KITCHEN = 'Kitchen & Restaurant Equipment',
  INDUSTRIAL = 'Industrial Equipment',
  STORAGE = 'Storage Solutions',
  FABRICATION = 'Metal Fabrication',
  CONSTRUCTION = 'Construction & Installation',
  COMMERCIAL = 'Commercial Spaces'
}
```

### State Management
- Project filtering using React context
- Category/subcategory state with useState
- Animation states managed by Framer Motion

### Animation System
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
```

### Responsive Design
- Grid system:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- Dynamic padding and spacing
- Flexible image sizing
- Adaptive typography

### Performance Considerations
- Lazy loading for project images
- Optimized animation performance
- Efficient filtering algorithms
- Minimal re-renders

## Core Components

### Media Components
1. **OptimizedImage**
   - Network-aware quality selection
   - Progressive loading with blur effect
   - Format optimization (AVIF/WebP)
   - Adaptive quality based on network speed
   - Error handling with fallbacks
   - Loading states and animations
   - Responsive image support
   - Lazy loading capabilities

2. **OptimizedVideo**
   - Dynamic video quality selection
   - Network-aware preloading
   - Adaptive playback quality
   - Error handling with fallbacks
   - Loading states
   - Format compatibility checks
   - Buffering management
   - Performance monitoring

3. **ResponsiveImage**
   - Breakpoint-based source selection
   - Progressive enhancement
   - Blur placeholder support
   - Device-specific quality
   - Intersection observer integration
   - Error boundary integration
   - Adaptive dimensions
   - Performance optimization

### Layout Components
1. **Layout**
   - Theme context management
   - Navigation state handling
   - Layout structure control
   - Error boundary integration
   - Performance monitoring
   - Accessibility features

2. **Navbar**
   - Responsive design
   - Theme toggle integration
   - Active route highlighting
   - Mobile menu management
   - Navigation state sync
   - Accessibility compliance

### Page Sections
1. **Hero**
   - Landing page content
   - Network-aware media
   - Progressive loading
   - Optimized playback
   - Animation sequences
   - Call-to-action elements

2. **Portfolio**
   - Project showcases
   - Media optimization
   - Interactive elements
   - Performance monitoring
   - Error handling
   - Loading states

## Services Layer

### Core Services
1. **MonitoringService**
   ```typescript
   class MonitoringService {
     private metricBuffer: PerformanceMetric[];
     private errorBuffer: ErrorContext[];
     private config: MonitoringConfig;

     constructor(config: MonitoringConfig) {
       this.setupErrorHandling();
       this.setupPerformanceMonitoring();
       this.startBufferFlush();
     }

     public reportMetric(metric: PerformanceMetric): void;
     public reportError(error: ErrorContext): void;
     private flushMetricBuffer(): Promise<void>;
     private flushErrorBuffer(): Promise<void>;
   }
   ```

2. **MetricCollectionService**
   ```typescript
   class MetricCollectionService {
     private metricBuffer: PerformanceMetric[];
     private observers: Set<MetricObserver>;

     public reportMetric(metric: PerformanceMetric): void;
     public subscribe(callback: MetricObserver): () => void;
     private flushMetricBuffer(): Promise<void>;
     private setupPerformanceMonitoring(): void;
   }
   ```

3. **ErrorReportingService**
   ```typescript
   class ErrorReportingService {
     private errorBuffer: ErrorContext[];
     private config: ErrorConfig;

     public reportError(error: Error, context?: string): void;
     private processError(error: Error): ErrorContext;
     private flushErrorBuffer(): Promise<void>;
   }
   ```

4. **AlertingService**
   ```typescript
   class AlertingService {
     private alertConfig: AlertConfig;
     private subscribers: Set<AlertSubscriber>;

     public alert(message: string, severity?: AlertSeverity): void;
     public subscribe(callback: AlertSubscriber): () => void;
     private notifySubscribers(alert: Alert): void;
   }
   ```

## Utility Layer

### Media Optimization
```typescript
// Network quality detection
const useNetworkQuality = (): NetworkQuality => {
  // Implementation
};

// Format detection
const supportsAVIF = async (): Promise<boolean> => {
  // Implementation
};

const supportsWebP = async (): Promise<boolean> => {
  // Implementation
};

// Progressive loading
const useProgressiveImage = (
  highResSrc: string,
  lowResSrc: string
): ProgressiveImageResult => {
  // Implementation
};

// Quality optimization
const optimizeImage = (
  url: string,
  options: ImageOptimizationOptions
): string => {
  // Implementation
};
```

### Performance Monitoring
```typescript
// Metric collection
const setupPerformanceMonitoring = (): void => {
  // Core Web Vitals monitoring
  onLCP((metric) => handleMetric(metric));
  onFID((metric) => handleMetric(metric));
  onCLS((metric) => handleMetric(metric));
  onTTFB((metric) => handleMetric(metric));
  onFCP((metric) => handleMetric(metric));

  // Resource timing
  new PerformanceObserver((list) => {
    // Resource timing monitoring
  }).observe({ entryTypes: ['resource'] });

  // Navigation timing
  new PerformanceObserver((list) => {
    // Navigation timing monitoring
  }).observe({ entryTypes: ['navigation'] });
};
```

## Type System

### Performance Types
```typescript
enum MetricRating {
  GOOD = 'good',
  NEEDS_IMPROVEMENT = 'needs-improvement',
  POOR = 'poor'
}

enum NavigationType {
  NAVIGATE = 'navigate',
  RELOAD = 'reload',
  BACK_FORWARD = 'back-forward',
  PRERENDER = 'prerender'
}

interface PerformanceMetric {
  name: string;
  value: number;
  rating: MetricRating;
  timestamp: number;
  navigationType: NavigationType;
  metadata?: Record<string, unknown>;
}
```

### Error Types
```typescript
enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

enum ErrorCategory {
  JAVASCRIPT = 'javascript',
  NETWORK = 'network',
  RESOURCE = 'resource',
  SECURITY = 'security',
  PERFORMANCE = 'performance'
}

interface ErrorContext {
  message: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  stack?: string;
  metadata?: Record<string, unknown>;
}
```

## Security Measures

1. **Content Security**
   - CSP implementation
   - XSS prevention
   - CORS configuration
   - Frame protection

2. **Resource Integrity**
   - Subresource integrity
   - Asset verification
   - Secure loading patterns

3. **Error Handling**
   - Sanitized error messages
   - Secure error reporting
   - Rate limiting
   - Error categorization

## Performance Optimization

1. **Media Loading**
   - Network-aware quality
   - Progressive enhancement
   - Format optimization
   - Lazy loading
   - Preloading strategy

2. **Resource Management**
   - Code splitting
   - Route-based chunking
   - Asset optimization
   - Cache management
   - Bundle optimization

3. **Monitoring & Analytics**
   - Core Web Vitals
   - Custom metrics
   - Error tracking
   - Performance monitoring
   - User experience metrics

## Development Tools

1. **Testing Infrastructure**
   - Unit testing setup
   - Integration testing
   - Performance testing
   - Accessibility testing
   - Visual regression

2. **Build System**
   - Vite configuration
   - TypeScript compilation
   - Asset optimization
   - Development tools
   - Production builds

## Asset Management

### Path Resolution System

The application uses a centralized path resolution system for handling assets in different environments:

```typescript
// Base configuration
const BASE_PATH = '/va-rb-portfolio';  // For GitHub Pages deployment

// Asset URL resolution
getImageUrl(path: string) => `${BASE_PATH}/images${path}`
getPdfUrl(path: string) => `${BASE_PATH}/pdfs${path}`
```

This system ensures:
- Consistent path resolution across environments
- Proper asset loading in GitHub Pages deployment
- Centralized path management for maintainability

### Known Issues and Solutions

1. **Image Path Inconsistency**
   - **Issue**: Some image paths were using direct paths while others used the path resolution system
   - **Impact**: Images not loading in production (GitHub Pages) environment
   - **Solution**: Standardized all image paths to use `getImageUrl()` helper function
   - **Prevention**: Automated path validation in build process

2. **PDF Path Resolution**
   - Similar standardization using `getPdfUrl()` helper function
   - Ensures consistent PDF loading across environments

### Best Practices

1. **Always use helper functions**
   ```typescript
   // Correct
   thumbnail: getImageUrl('/projects/thumbnails/image.jpg')
   
   // Incorrect
   thumbnail: '/images/projects/thumbnails/image.jpg'
   ```

2. **Path Structure**
   - Keep all project thumbnails in `/public/images/projects/thumbnails/`
   - Use consistent naming conventions for files
   - Maintain organized directory structure

## Future Enhancements

1. **Performance**
   - Enhanced code splitting
   - Advanced caching strategies
   - Further image optimizations

2. **Monitoring**
   - Extended metrics collection
   - Advanced error tracking
   - User behavior analytics

3. **Features**
   - PWA support
   - Offline capabilities
   - Advanced animations
   - Internationalization
