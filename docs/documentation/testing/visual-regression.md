# Visual Regression Testing

## Overview
This document outlines the visual regression testing strategy for the portfolio redesign project. Visual regression testing ensures that UI changes are intentional and do not introduce unexpected visual regressions.

## Technology Stack
- **Testing Framework**: Playwright
- **Visual Comparison Tool**: playwright-visual-comparison
- **CI Integration**: GitHub Actions

## Test Coverage Requirements
1. **Component Level**
   - Individual component rendering
   - Component states (hover, active, disabled)
   - Responsive breakpoints
   - Theme variations

2. **Page Level**
   - Full page screenshots
   - Dynamic content areas
   - Navigation flows
   - Loading states

3. **Cross-browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

## Implementation Guidelines
1. **Snapshot Creation**
   - Base snapshots stored in `/src/tests/visual/__snapshots__`
   - Naming convention: `[component]-[state]-[viewport].png`
   - Update process documented in update-snapshots.md

2. **Test Configuration**
   - Viewport sizes: 320px, 768px, 1024px, 1440px
   - Pixel-perfect comparison enabled
   - Threshold tolerance: 0.1%

3. **CI/CD Integration**
   - Runs on every PR
   - Blocks merge on failure
   - Results uploaded as artifacts

## Performance Considerations
- Snapshot compression enabled
- Parallel test execution
- Caching strategy for base images

## Maintenance
- Weekly baseline updates
- Monthly full review
- Automated cleanup of old snapshots
