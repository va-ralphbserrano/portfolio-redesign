# AdaptiveImage Component

## Overview
The AdaptiveImage component provides an optimized, responsive image loading solution with built-in performance optimizations and error handling capabilities.

## Technical Specifications

### Component Interface
```typescript
interface AdaptiveImageProps {
  src: string;                    // Source URL of the image
  alt: string;                    // Alt text for accessibility
  sizes?: string;                // Sizes attribute for responsive images
  loading?: 'lazy' | 'eager';    // Loading strategy
  quality?: number;              // Image quality (1-100)
  placeholder?: string;          // Placeholder image URL
  formats?: ('webp' | 'avif' | 'jpeg' | 'png')[]; // Supported formats in order of preference
  onLoad?: () => void;           // Callback when image loads successfully
  onError?: (error: Error) => void; // Callback when image fails to load
  className?: string;            // Custom CSS class
}
```

### Features
1. **Responsive Loading**
   - Automatic viewport-based image sizing
   - Responsive srcset generation
   - Dynamic sizes attribute handling

2. **Format Optimization**
   - WebP/AVIF format detection and delivery
   - Fallback format support
   - Quality optimization

3. **Performance**
   - Lazy loading implementation
   - Progressive image loading
   - Blur-up placeholder technique
   - Browser cache optimization

4. **Error Handling**
   - Graceful fallback on load failure
   - Custom error states
   - Retry mechanism

## Usage Examples

### Basic Usage
```tsx
<AdaptiveImage
  src="/images/hero.jpg"
  alt="Hero section image"
  loading="lazy"
/>
```

### With All Options
```tsx
<AdaptiveImage
  src="/images/hero.jpg"
  alt="Hero section image"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  quality={85}
  placeholder="/images/hero-placeholder.jpg"
  formats={['webp', 'avif', 'jpeg']}
  onLoad={() => console.log('Image loaded')}
  onError={(error) => console.error('Image failed to load:', error)}
  className="hero-image"
/>
```

## Performance Considerations
- Implements automatic lazy loading for images below the fold
- Uses modern image formats (WebP/AVIF) with fallbacks
- Implements progressive loading with placeholders
- Optimizes cache usage with appropriate headers
- Monitors and reports loading performance metrics

## Accessibility
- Requires alt text for screen readers
- Maintains color contrast for placeholder states
- Supports reduced motion preferences
- Implements ARIA attributes for loading states

## Testing Requirements
1. **Unit Tests**
   - Props validation
   - Format detection
   - Loading state management
   - Error handling
   - Placeholder behavior

2. **Integration Tests**
   - Format fallback chain
   - Lazy loading behavior
   - Performance metrics
   - Cache behavior

3. **E2E Tests**
   - Loading behavior in different viewports
   - Network condition handling
   - Error state recovery

## Security Considerations
- Validates image URLs
- Implements CSP directives
- Sanitizes user inputs
- Handles CORS configurations

## Metrics & Monitoring
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cache hit ratio
- Error rate
- Format adoption rate
