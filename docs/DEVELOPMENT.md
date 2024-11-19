# Development Guide

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Git

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Follow TypeScript strict mode
- Use meaningful comments

### Component Development

#### Creating New Components
1. Create component file in appropriate directory
2. Add TypeScript types
3. Implement component logic
4. Add proper documentation
5. Test functionality

#### Example Component
```tsx
import React from 'react';
import { WithClassName } from '@/types/component';

interface ExampleProps extends WithClassName {
  title: string;
}

export const Example: React.FC<ExampleProps> = ({ 
  title, 
  className 
}) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
    </div>
  );
};
```

### State Management
- Use React hooks for local state
- Context for global state
- Proper type definitions
- State documentation

### Testing
- Write unit tests
- Test components
- Test utilities
- Run `npm run test`

### Building
- Development: `npm run dev`
- Production: `npm run build`
- Preview: `npm run preview`

## Common Tasks

### Adding a New Page
1. Create page component
2. Add route in App.tsx
3. Update navigation
4. Add content
5. Test functionality

### Styling Components
1. Use Tailwind classes
2. Follow design system
3. Ensure responsiveness
4. Test dark mode

### Form Handling
1. Create form component
2. Add validation
3. Implement submission
4. Add error handling
5. Test functionality

### Adding Animations
1. Import from Framer Motion
2. Add animation props
3. Test performance
4. Ensure accessibility

## Media Development Guidelines

### Image Optimization

#### Using OptimizedImage Component
```tsx
import { OptimizedImage } from '@/components/common/OptimizedImage';

// Basic usage
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>

// With quality control
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  quality={75}
  priority={true}
/>
```

#### Best Practices
1. Always provide both width and height to prevent layout shift
2. Use `priority` prop for above-the-fold images
3. Provide descriptive alt text for accessibility
4. Consider network conditions with quality prop
5. Test with different image formats (JPG, PNG, WebP, AVIF)

### Video Optimization

#### Using OptimizedVideo Component
```tsx
import { OptimizedVideo } from '@/components/common/OptimizedVideo';

const videoSources = [
  { src: '/path/to/high.mp4', quality: 'high' },
  { src: '/path/to/medium.mp4', quality: 'medium' },
  { src: '/path/to/low.mp4', quality: 'low' }
];

// Basic usage
<OptimizedVideo
  sources={videoSources}
  poster="/path/to/poster.jpg"
  controls
/>

// With all options
<OptimizedVideo
  sources={videoSources}
  poster="/path/to/poster.jpg"
  autoPlay
  loop
  muted
  playsInline
  onLoad={() => console.log('Video loaded')}
  onError={(error) => console.error('Video error:', error)}
/>
```

#### Best Practices
1. Always provide multiple quality options
2. Include a poster image for better loading experience
3. Consider autoPlay and preload based on context
4. Test with different network conditions
5. Implement proper error handling

### Network Quality Testing

#### Using Network Conditions
```typescript
import { useNetworkQuality } from '@/utils/mediaOptimization';

function YourComponent() {
  const networkQuality = useNetworkQuality();
  
  // Adapt content based on network quality
  if (networkQuality === 'slow') {
    // Load minimal content
  }
}
```

#### Testing Different Speeds
1. Use browser DevTools Network tab
2. Test with different throttling options:
   - Slow 3G
   - Fast 3G
   - Custom speeds
3. Verify quality adaptation
4. Check loading indicators
5. Test error scenarios

### Progressive Loading

#### Implementation
```typescript
import { useProgressiveImage } from '@/utils/mediaOptimization';

function YourComponent() {
  const { src, isLoading } = useProgressiveImage(
    '/path/to/high-res.jpg',
    '/path/to/low-res.jpg'
  );
  
  return (
    <div className={isLoading ? 'loading' : ''}>
      <img src={src} alt="Progressive" />
    </div>
  );
}
```

#### Testing Checklist
1. Verify blur-up animation
2. Check loading states
3. Test with different image sizes
4. Verify network handling
5. Check error scenarios

### Format Support

#### Testing Different Formats
```typescript
import { supportsWebP, supportsAVIF } from '@/utils/mediaOptimization';

async function checkSupport() {
  const hasWebP = await supportsWebP();
  const hasAVIF = await supportsAVIF();
  
  // Choose format based on support
  const format = hasAVIF ? 'avif' : hasWebP ? 'webp' : 'jpg';
}
```

#### Browser Testing Matrix
| Browser | WebP | AVIF | Fallback |
|---------|------|------|----------|
| Chrome  | ✓    | ✓    | JPG/PNG  |
| Firefox | ✓    | ✓    | JPG/PNG  |
| Safari  | ✓    | ✗    | JPG/PNG  |
| Edge    | ✓    | ✓    | JPG/PNG  |

## Recent Development Updates

### Portfolio Section Enhancement (v0.25.47)

#### Technical Project Showcase
The portfolio section has been significantly enhanced to better showcase technical engineering projects:

- **Project Organization**
  - Implemented 6 specialized categories for technical projects
  - Added subcategory filtering system
  - Expanded from 6 to 24 technical projects
  - Improved project descriptions and technology tags

- **UI/UX Improvements**
  - Responsive 3-column grid layout
  - Smooth category transitions using Framer Motion
  - Dynamic subcategory filtering
  - "No projects found" placeholder state
  - Improved visual hierarchy

- **Performance Optimizations**
  - Optimized image loading (77 project images)
  - Efficient project filtering system
  - Enhanced animation performance
  - Responsive design system (1-3 columns)

#### Project Categories
Current technical project categories include:

1. **Kitchen & Restaurant Equipment**
   - Commercial kitchen systems
   - Ventilation solutions
   - Food service equipment
   - Processing systems

2. **Industrial Equipment**
   - Pressure vessels
   - Manufacturing tools
   - Processing equipment
   - Mechanical systems

3. **Storage Solutions**
   - Custom storage racks
   - Industrial platforms
   - Specialized storage systems
   - Temperature-controlled units

4. **Metal Fabrication**
   - Custom steel components
   - Industrial fixtures
   - Structural elements
   - Specialized attachments

5. **Construction & Installation**
   - Building systems
   - Renewable energy installations
   - Infrastructure components
   - Utility systems

6. **Commercial Spaces**
   - Retail layouts
   - Facility designs
   - Mobile solutions
   - Service installations

#### Development Guidelines

When adding new projects:
1. Ensure proper categorization within the 6 main categories
2. Include detailed technical specifications
3. Optimize project images before adding
4. Update type definitions if adding new fields
5. Test filtering system with new additions
6. Verify responsive layout
7. Check animation performance

#### Testing Requirements
- Verify responsive layout across all device sizes
- Test all category and subcategory filter combinations
- Validate image loading performance
- Check animation smoothness
- Ensure proper fallback states

## Troubleshooting

### Common Issues
1. Build errors
   - Check TypeScript errors
   - Verify imports
   - Check dependencies

2. Style issues
   - Check Tailwind classes
   - Verify media queries
   - Test responsiveness

3. Type errors
   - Check type definitions
   - Verify prop types
   - Update interfaces

### Performance Issues
1. Check bundle size
2. Optimize images
3. Verify lazy loading
4. Monitor renders

## Deployment

### GitHub Pages
1. Update base URL
2. Run build
3. Deploy with action

### Production Build
1. Run `npm run build`
2. Test production build
3. Check optimization

## Best Practices

### Code Quality
- Write clean code
- Follow DRY principle
- Use TypeScript features
- Document complex logic

### Performance
- Optimize images
- Lazy load components
- Split code properly
- Monitor bundle size

### Security
- Validate inputs
- Sanitize data
- Handle errors
- Implement rate limiting

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Test keyboard navigation
- Ensure color contrast
