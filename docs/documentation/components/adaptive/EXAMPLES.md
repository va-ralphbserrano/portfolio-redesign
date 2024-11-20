# Adaptive Components Examples

## AdaptiveImage Examples

### Basic Usage
```tsx
import { AdaptiveImage } from '@/components/adaptive';

// Simple responsive image
<AdaptiveImage
  src="/images/hero.jpg"
  alt="Hero section"
/>

// With placeholder and quality settings
<AdaptiveImage
  src="/images/project-preview.jpg"
  alt="Project preview"
  placeholder="/images/project-preview-low.jpg"
  quality={85}
  loading="lazy"
/>

// With format preferences
<AdaptiveImage
  src="/images/profile.jpg"
  alt="Profile picture"
  formats={['webp', 'avif', 'jpeg']}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Error Handling
```tsx
<AdaptiveImage
  src="/images/dynamic-content.jpg"
  alt="Dynamic content"
  placeholder="/images/fallback.jpg"
  onError={(error) => {
    console.error('Image failed to load:', error);
    // Show user-friendly error message
  }}
/>
```

### Performance Optimized
```tsx
<AdaptiveImage
  src="/images/large-hero.jpg"
  alt="Large hero image"
  loading="lazy"
  quality={85}
  formats={['webp', 'avif', 'jpeg']}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  onLoad={() => {
    // Track loading performance
    console.log('Image loaded successfully');
  }}
/>
```

## AdaptiveContainer Examples

### Basic Usage
```tsx
import { AdaptiveContainer } from '@/components/adaptive';

// Simple fluid container
<AdaptiveContainer>
  <YourContent />
</AdaptiveContainer>

// With responsive padding
<AdaptiveContainer
  padding={{
    base: '1rem',
    md: '2rem',
    lg: '3rem'
  }}
>
  <YourContent />
</AdaptiveContainer>

// Fixed width with breakpoints
<AdaptiveContainer
  behavior="fixed"
  maxWidth={1200}
  breakpoints={{
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280
  }}
>
  <YourContent />
</AdaptiveContainer>
```

### Performance Optimized
```tsx
<AdaptiveContainer
  performance={{
    monitorResize: true,
    debounceDelay: 150,
    optimizeReflows: true
  }}
  onResize={(width) => {
    // Track container size changes
    console.log('Container width:', width);
  }}
>
  <YourContent />
</AdaptiveContainer>
```

### Complex Layout
```tsx
<AdaptiveContainer
  behavior="hybrid"
  minWidth={320}
  maxWidth={1440}
  padding={{
    base: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem'
  }}
  margin={{
    base: '0.5rem',
    md: '1rem',
    lg: '2rem'
  }}
  performance={{
    monitorResize: true,
    optimizeReflows: true
  }}
>
  <header>
    <nav>Navigation</nav>
  </header>
  <main>
    <section>Content Section</section>
  </main>
  <footer>Footer</footer>
</AdaptiveContainer>
```

### Nested Containers
```tsx
<AdaptiveContainer>
  <header>
    <AdaptiveContainer
      maxWidth={800}
      padding={{
        base: '1rem',
        md: '2rem'
      }}
    >
      <nav>Navigation</nav>
    </AdaptiveContainer>
  </header>
  <main>
    <AdaptiveContainer
      behavior="fluid"
      performance={{
        optimizeReflows: true
      }}
    >
      <section>Content Section</section>
    </AdaptiveContainer>
  </main>
</AdaptiveContainer>
```
