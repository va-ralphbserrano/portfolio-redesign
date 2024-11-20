# Vite Configuration Documentation

## Overview
The project uses Vite as its build tool and development server. The configuration is optimized for React development with TypeScript, including various plugins for performance optimization and development experience.

## Configuration Structure

### Base Configuration
```typescript
base: process.env.NODE_ENV === 'production' ? '/va-rb-portfolio/' : '/'
```
- Configures the base public path
- Adjusts based on environment for production deployments

### Plugins

#### Core Plugins
1. **@vitejs/plugin-react**
   - Enables React refresh
   - Handles JSX transformation
   - Optimizes development experience

2. **splitVendorChunkPlugin**
   - Splits vendor chunks for better caching
   - Improves build performance
   - Optimizes chunk distribution

#### Image Optimization
**vite-plugin-image-optimizer**
```typescript
ViteImageOptimizer({
  jpg: {
    quality: 80,
    progressive: true
  },
  jpeg: {
    quality: 80,
    progressive: true
  },
  png: {
    quality: 80,
    progressive: true
  },
  webp: {
    lossless: true
  }
})
```
- Optimizes image assets during build
- Supports multiple formats (jpg, jpeg, png, webp)
- Configurable quality settings
- Progressive loading for better UX

#### Compression
**vite-plugin-compression2**
```typescript
compression({
  algorithm: 'brotliCompress',
  exclude: [/\.(br)$/, /\.(gz)$/],
  deleteOriginalAssets: false
})
```
- Compresses build output
- Uses Brotli compression
- Preserves original assets
- Excludes already compressed files

#### Bundle Analysis
**rollup-plugin-visualizer**
```typescript
visualizer({
  filename: 'dist/stats.html',
  gzipSize: true,
  brotliSize: true,
  open: false
})
```
- Generates bundle analysis reports
- Shows gzip and brotli sizes
- Helps identify bundle size issues
- Output in dist/stats.html

### Path Resolution
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```
- Configures path aliases
- Matches TypeScript path configuration
- Simplifies import statements

### Build Optimization

#### Dependency Optimization
```typescript
optimizeDeps: {
  include: [],
  exclude: []
}
```
- Controls dependency pre-bundling
- Configurable inclusion/exclusion
- Optimizes development server startup

#### Build Configuration
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        pdfWorker: ['pdfjs-dist/build/pdf.worker.entry']
      },
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js'
    }
  },
  chunkSizeWarningLimit: 1000
}
```
- Configures output file structure
- Manages chunk splitting
- Sets size warning thresholds
- Handles PDF worker separately

## Development Features

### Hot Module Replacement (HMR)
- Enabled by default
- Fast refresh for React components
- Preserves state during updates

### Development Server
- Optimized for fast startup
- Supports HTTPS
- Configurable port and host

## Production Optimization

### Code Splitting
- Automatic vendor chunk splitting
- Manual chunk configuration
- Optimized for caching

### Asset Handling
- Automatic file hashing
- Organized output structure
- Image optimization
- Compression support

## Best Practices

### 1. Development
- Use path aliases consistently
- Leverage HMR capabilities
- Monitor bundle analyzer reports

### 2. Build Optimization
- Configure appropriate chunk sizes
- Use manual chunks for large dependencies
- Monitor and adjust compression settings

### 3. Asset Management
- Optimize images appropriately
- Use proper asset organization
- Leverage automatic asset handling

## Troubleshooting

### Common Issues

1. **Build Performance**
   - Check dependency pre-bundling
   - Review chunk splitting configuration
   - Monitor bundle analyzer reports

2. **Development Server**
   - Verify port availability
   - Check for conflicting processes
   - Review HMR connectivity

3. **Asset Loading**
   - Verify path configurations
   - Check image optimization settings
   - Review compression exclusions

### Solutions

1. **Slow Builds**
   ```typescript
   // Optimize dependency inclusion
   optimizeDeps: {
     include: ['frequently-used-dep']
   }
   ```

2. **Large Chunks**
   ```typescript
   // Configure manual chunks
   manualChunks: {
     vendor: ['react', 'react-dom'],
     utils: ['lodash', 'date-fns']
   }
   ```

3. **Asset Optimization**
   ```typescript
   // Adjust image optimization
   ViteImageOptimizer({
     jpg: { quality: 75 }, // Balance quality vs size
     png: { quality: 75 }
   })
   ```
