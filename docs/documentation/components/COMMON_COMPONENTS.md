# Common Components

This document outlines the reusable common components used throughout the portfolio website.

## Core UI Components

### Button
```typescript
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ElementType;
  children: React.ReactNode;
}
```

#### Features
- Motion-enhanced interactions (hover/tap animations)
- Four variants: primary, secondary, outline, ghost
- Three sizes: sm, md, lg
- Loading state support
- Optional icon integration
- Dark mode compatible

#### Styling
```css
/* Base Styles */
.button {
  inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200
}

/* Variants */
.primary { bg-primary-500 text-white hover:bg-primary-600 }
.secondary { bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white }
.outline { border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white }
.ghost { text-gray-600 hover:text-primary-500 dark:text-gray-400 }

/* Sizes */
.sm { px-3 py-1.5 text-sm }
.md { px-4 py-2 }
.lg { px-6 py-3 text-lg }
```

### Loading
Components for handling loading states and indicators:

- `Loading.tsx`: Main loading component wrapper
- `LoadingSpinner.tsx`: Animated spinner indicator
- `Skeleton.tsx`: Content placeholder loading state

### Navigation
Navigation-related components:

- `Navbar.tsx`: Main navigation bar
- `MobileNav.tsx`: Responsive mobile navigation menu
- `ScrollLink.tsx`: Smooth scroll link component
- `ScrollToTop.tsx`: Page scroll utility

#### Navbar Component
**Location**: `src/components/common/Navbar.tsx`

**Purpose**: Main navigation header for the portfolio website.

**Features**:
- Responsive design with desktop and mobile layouts
- Smooth animations using Framer Motion
- Scroll-based background opacity
- Active link highlighting
- Mobile menu integration

**Implementation Details**:
- Uses React Router for navigation
- Implements scroll-based styling with throttled event listener
- Manages mobile menu state
- Includes brand logo/text
- Responsive breakpoints for mobile/desktop views

**Props**: None (Standalone component)

**State Management**:
- `isMenuOpen`: Controls mobile menu visibility
- `isScrolled`: Tracks scroll position for styling

**Dependencies**:
- framer-motion
- react-router-dom
- MobileNav component
- classNames utility

#### MobileNav Component
**Location**: `src/components/common/MobileNav.tsx`

**Purpose**: Provides mobile navigation menu with slide-out interaction.

**Features**:
- Slide-out animation
- Touch gesture support
- Focus trap for accessibility
- Backdrop overlay
- Smooth transitions

**Props**:
```typescript
interface MobileNavProps {
  isOpen: boolean;        // Controls menu visibility
  onClose: () => void;    // Close handler function
  navLinks: NavLink[];    // Navigation link configuration
}

interface NavLink {
  href: string;           // Route path
  label: string;         // Display text
}
```

**Implementation Details**:
- Uses Framer Motion for animations
- Implements drag-to-close functionality
- Manages body scroll lock
- Handles route changes
- Includes accessibility features

**Dependencies**:
- framer-motion
- react-router-dom
- useFocusTrap hook
- classNames utility

### Media Components
Optimized media handling components:

- `OptimizedImage.tsx`: Image optimization wrapper
- `OptimizedVideo.tsx`: Video optimization wrapper
- `ResponsiveImage.tsx`: Responsive image component
- `PlaceholderImage.tsx`: Image loading placeholder

### PDF Components
PDF handling and viewing components:

- `PDFViewer.tsx`: PDF document viewer
- `PDFModal.tsx`: Modal for PDF preview
- `PDFThumbnail.tsx`: PDF preview thumbnail

### Error Handling
Error boundary and fallback components:

- `ErrorBoundary.tsx`: React error boundary wrapper
- `ErrorFallback.tsx`: Error state display component
- `FormError.tsx`: Form-specific error display

### UI Utilities
Additional utility components:

- `CustomCursor.tsx`: Custom cursor implementation
- `Tooltip.tsx`: Tooltip display component
- `Modal`: Reusable modal dialog
- `PageTransition.tsx`: Page transition animations
- `Preloader.tsx`: Asset preloading component

## Usage Examples

### Basic Button
```tsx
import { Button } from '@/components/common';

function MyComponent() {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={handleClick}
    >
      Click Me
    </Button>
  );
}
```

### Loading State
```tsx
<Button
  variant="primary"
  loading={isLoading}
  disabled={isLoading}
>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>
```

### With Icon
```tsx
import { ArrowRight } from '@/components/icons';

<Button
  variant="outline"
  icon={ArrowRight}
>
  Continue
</Button>
```

### Basic Navigation Setup
```tsx
<Navbar />
```

### Mobile Navigation Integration
```tsx
<MobileNav
  isOpen={isMenuOpen}
  onClose={handleClose}
  navLinks={[
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' }
  ]}
/>
```

## Best Practices

1. **Accessibility**
   - All interactive components include proper ARIA attributes
   - Keyboard navigation support
   - Screen reader friendly

2. **Performance**
   - Components use React.memo where beneficial
   - Optimized render cycles
   - Lazy loading for heavy components

3. **Theming**
   - Dark mode support via Tailwind classes
   - Consistent color scheme using design tokens
   - Responsive design patterns

4. **Error Handling**
   - Graceful fallbacks for loading states
   - Error boundaries for component failures
   - Helpful error messages

## Testing

Components are tested using:
- Jest for unit tests
- React Testing Library for integration tests
- Storybook for visual testing

See the `__tests__` directory for specific test cases.

## Accessibility Considerations
- Focus trap in mobile menu
- ARIA labels for interactive elements
- Keyboard navigation support
- Proper heading structure
- Screen reader compatibility

## Performance Optimization
- Throttled scroll listener
- Conditional rendering
- Touch event optimization
- Animation performance tuning
