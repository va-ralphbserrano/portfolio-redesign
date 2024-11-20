# Navbar Component

## Overview
The Navbar component is a responsive navigation bar that provides the main navigation structure for the portfolio website. It features a dynamic background that changes based on scroll position and includes both desktop and mobile navigation options.

### Location
`src/components/layout/Navbar.tsx`

### Interface
```typescript
interface NavbarProps {
  className?: string; // Optional CSS classes for custom styling
}

// Navigation Link Type
interface NavLink {
  name: string;  // Display name of the navigation item
  path: string;  // Route path for the navigation item
}
```

### Usage Example
```tsx
import { Navbar } from '@/components/layout/Navbar';

// Basic usage
<Navbar />

// With custom styling
<Navbar className="custom-navbar" />
```

### Features
- Responsive design with mobile navigation support
- Dynamic background that changes on scroll
- Smooth animations using Framer Motion
- Integrated dark mode support
- Active route highlighting
- Gradient-styled logo/branding

### Dependencies
- External:
  - react
  - react-router-dom
  - framer-motion
- Internal:
  - MobileNav component
  - classNames utility
  - navbarVariants animation config

### State Management
- Local State:
  ```typescript
  const [isScrolled, setIsScrolled] = useState(false);
  ```
  Tracks scroll position to update navbar background

- Route State:
  ```typescript
  const location = useLocation();
  ```
  Used for active route highlighting

### Styling
- TailwindCSS Classes:
  - `fixed top-0 left-0 right-0`: Full-width fixed positioning
  - `backdrop-blur-lg`: Background blur effect when scrolled
  - `bg-white/80 dark:bg-gray-900/80`: Light/dark mode backgrounds
  - `transition-all duration-300`: Smooth transitions

- Custom Styling:
  - Gradient text for branding
  - Responsive padding and spacing
  - Dark mode compatibility

### Animation
- Framer Motion Configuration:
  ```typescript
  variants={navbarVariants}
  initial="hidden"
  animate="visible"
  ```
- Transition Effects:
  - Fade-in on mount
  - Smooth background transition on scroll
  - Mobile menu animations

### Accessibility
- Semantic HTML:
  - Uses `<nav>` element
  - Proper heading hierarchy
  - Semantic link elements
- Keyboard Navigation:
  - All links are tabbable
  - Focus indicators preserved
  - Skip navigation available
- ARIA Attributes:
  - Role definitions
  - State indicators
  - Screen reader support

### Performance
- Optimization:
  - Debounced scroll listener
  - Memoized navigation items
  - Efficient re-renders
- Loading:
  - No initial server data requirements
  - Quick first paint
  - Minimal layout shift

### Testing
- Test File: `src/components/layout/__tests__/Navbar.test.tsx`
- Key Test Cases:
  - Renders navigation items
  - Handles scroll events
  - Updates background correctly
  - Manages mobile navigation
  - Preserves accessibility

### Component Hierarchy
```
Layout
└── Navbar
    └── MobileNav
```

### Related Components
- MobileNav: Mobile navigation menu
- Layout: Parent container
- Container: Width constraints

### Changelog
| Version | Changes | Date |
|---------|---------|------|
| 1.0.0   | Initial implementation | 2024 |
| 1.1.0   | Added dark mode support | 2024 |
| 1.2.0   | Enhanced accessibility | 2024 |

### Notes
- The navbar automatically adjusts its background opacity and blur based on scroll position
- Uses CSS classes for dark mode compatibility
- Integrates with the site's primary color scheme through gradient text
- Mobile navigation is handled by a separate MobileNav component for better code organization
- Future improvements planned for animation performance
