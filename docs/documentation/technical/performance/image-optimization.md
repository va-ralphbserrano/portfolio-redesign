# Image Optimization Standards

## Overview
Standards and implementation guide for image optimization in the portfolio redesign project.

## Image Format Standards
1. Modern Formats
   - WebP for all images with PNG/JPEG fallback
   - AVIF for supporting browsers
   - SVG for icons and logos

2. Resolution Standards
   - Maximum dimensions: 1920x1080
   - Responsive breakpoints: 320, 640, 960, 1280, 1920
   - Pixel density support: 1x, 2x

3. Quality Standards
   - JPEG/WebP quality: 80-85%
   - PNG compression level: 7-9
   - AVIF quality: 65-75%

## Implementation Guidelines

### Responsive Images
```html
<picture>
  <source
    type="image/avif"
    srcset="img-320.avif 320w, img-640.avif 640w"
    sizes="(max-width: 640px) 100vw"
  />
  <source
    type="image/webp"
    srcset="img-320.webp 320w, img-640.webp 640w"
    sizes="(max-width: 640px) 100vw"
  />
  <img
    src="img-fallback.jpg"
    alt="Description"
    loading="lazy"
    decoding="async"
  />
</picture>
```

### Optimization Process
1. Pre-processing
   - Remove metadata
   - Correct orientation
   - Strip color profile if unnecessary

2. Compression
   - Lossy compression for photos
   - Lossless for logos and UI elements
   - Progressive loading for large images

3. Delivery
   - CDN with image optimization
   - Browser caching headers
   - Preload critical images

## Tools and Services
- Sharp for Node.js image processing
- ImageMagick for build-time optimization
- Cloudinary/Imgix for CDN delivery
- next/image or @astro/image components

## Performance Metrics
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.0s
- Cumulative Layout Shift (CLS): < 0.1
