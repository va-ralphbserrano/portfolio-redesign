# Bundle Size Optimization Strategy

## Overview
This document outlines the strategy for optimizing bundle sizes in the portfolio redesign project.

## Performance Budgets
- Main bundle: < 100KB (gzipped)
- Initial route bundle: < 50KB (gzipped)
- Image assets: < 200KB per image
- Total initial load: < 250KB

## Implementation Strategy

### Code Splitting
1. Route-based splitting
   - Each route gets its own chunk
   - Lazy loading for routes using React.lazy()
   - Preload for likely navigation paths

2. Component-based splitting
   - Heavy components (e.g., 3D previews) are split
   - Dynamic imports for modal content
   - Conditional loading for below-fold content

3. Vendor chunk optimization
   - Separate vendor chunks for:
     - React core (react, react-dom)
     - UI libraries
     - Animation libraries
     - Utility functions

### Tree Shaking
- Use ES modules for better tree shaking
- Mark packages as side-effect-free
- Configure babel-plugin-transform-imports

### Module Federation
- Share common dependencies between pages
- Configure module federation in Vite config
- Set up shared scope for React components

## Monitoring
- Bundle analyzer integration
- Size limit checks in CI/CD
- Regular bundle audits

## Tooling
- Vite for development and building
- rollup-plugin-visualizer for analysis
- compression-webpack-plugin for gzip
- @size-limit/preset-app for CI checks
