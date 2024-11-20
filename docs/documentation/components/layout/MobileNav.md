# MobileNav Component

## Overview
The MobileNav component provides a responsive mobile navigation menu with smooth animations, backdrop overlay, and gesture support. It's designed to work seamlessly with the main Navbar component and provides an optimal mobile navigation experience.

### Location
`src/components/layout/MobileNav.tsx`

### Interface
```typescript
interface MobileNavProps {
  navLinks: Array<{ 
    name: string;  // Display name of the navigation item
    path: string;  // Route path for the navigation item
  }>;
}
```

### Usage Example
```tsx
import { MobileNav } from '@/components/layout/MobileNav';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  // ... more navigation links
];

// Basic usage
<MobileNav navLinks={navLinks} />
```

### Features
- Slide-in animation with spring physics
- Backdrop overlay with blur effect
- Staggered animation for menu items
- Route-based active state
- Body scroll lock when open
- Dark mode support
- Touch gesture support

### Dependencies
- External:
  - react
  - react-router-dom
  - framer-motion
  - @heroicons/react
- Internal:
  - classNames utility

### State Management
- Local State:
  ```typescript
  const [isOpen, setIsOpen] = useState(false);
  ```
  Controls menu visibility

- Route State:
  ```typescript
  const location = useLocation();
  ```
  Used for active route highlighting and menu closing

- Effects:
  ```typescript
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Body scroll management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);
  ```

### Styling
- TailwindCSS Classes:
  - Layout:
    - `fixed inset-0`: Full-screen overlay
    - `w-[280px]`: Fixed menu width
    - `flex flex-col`: Menu structure
  - Aesthetics:
    - `bg-white dark:bg-gray-900`: Light/dark backgrounds
    - `backdrop-blur-sm`: Overlay blur effect
    - `shadow-xl`: Menu panel shadow
  - Interactions:
    - `hover:bg-gray-100 dark:hover:bg-gray-800`
    - `transition-colors`

### Animation
- Menu Panel:
  ```typescript
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };
  ```

- Menu Items:
  ```typescript
  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 }
    })
  };
  ```

### Accessibility
- Semantic HTML:
  - `<nav>` for navigation
  - `<button>` for interactive elements
  - Proper heading structure
- ARIA Attributes:
  - aria-label for menu buttons
  - Role definitions
  - State management
- Keyboard Navigation:
  - Full keyboard support
  - Focus management
  - Escape key closes menu

### Performance
- Optimization:
  - AnimatePresence for mount/unmount
  - Conditional rendering
  - Efficient state updates
- Loading:
  - Lazy-loaded icons
  - No initial data requirements
  - Minimal bundle impact

### Testing
- Test File: `src/components/layout/__tests__/MobileNav.test.tsx`
- Key Test Cases:
  - Menu open/close functionality
  - Route change behavior
  - Scroll lock management
  - Animation presence
  - Accessibility compliance

### Component Hierarchy
```
Navbar
└── MobileNav
```

### Related Components
- Navbar: Parent component
- Link: Navigation links
- Icons: Menu icons

### Changelog
| Version | Changes | Date |
|---------|---------|------|
| 1.0.0   | Initial implementation | 2024 |
| 1.1.0   | Added spring animations | 2024 |
| 1.2.0   | Enhanced accessibility | 2024 |

### Notes
- Menu automatically closes on route changes
- Body scroll is locked when menu is open
- Uses spring animations for natural feel
- Supports both light and dark modes
- Backdrop click closes the menu
- Future improvements planned for gesture interactions
