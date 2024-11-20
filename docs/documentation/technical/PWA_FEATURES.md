# Progressive Web App Features

## Overview
This document details the Progressive Web App (PWA) implementation in the portfolio website.

## Core Features

### Service Worker
The service worker (`src/sw.js`) provides:
- Offline functionality
- Resource caching
- Background sync
- Push notifications

### Web App Manifest
The manifest (`manifest.json`) configures:
- App name and description
- Icons and themes
- Display preferences
- Scope and start URL

## Implementation

### Service Worker Registration
```typescript
// src/main.tsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
```

### Caching Strategy
- Static assets: Cache-first
- API requests: Network-first
- Images: Cache with network fallback

### Offline Support
- Cached pages available offline
- Fallback UI for unavailable content
- Background sync for form submissions

## Configuration

### Manifest Settings
```json
{
  "name": "Portfolio",
  "short_name": "Portfolio",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### Service Worker Features
- Pre-caching of critical assets
- Runtime caching configuration
- Update flow management
- Error handling

## Testing
- Lighthouse PWA audit
- Offline functionality testing
- Installation flow testing
- Update mechanism testing
