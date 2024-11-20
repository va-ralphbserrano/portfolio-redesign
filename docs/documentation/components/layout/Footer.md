# Footer Component

## Overview
The Footer component is a responsive, animated footer that includes contact information, quick navigation links, and social media links. It features dark mode support and smooth animations powered by Framer Motion.

### Location
`src/components/layout/Footer.tsx`

### Interface
```typescript
interface FooterProps {
  className?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: any;  // React Icon component
}

interface QuickLink {
  name: string;
  path: string;
}
```

### Usage Example
```tsx
import { Footer } from '@/components/layout/Footer';

// Basic usage
<Footer />

// With custom styling
<Footer className="mt-8 bg-gray-50" />

// Inside a layout
<div className="min-h-screen flex flex-col">
  <main className="flex-grow">
    {/* Main content */}
  </main>
  <Footer />
</div>
```

### Features
- Responsive grid layout
- Dark mode support
- Animated sections
- Social media integration
- Quick navigation links
- Contact information display
- Dynamic copyright year
- Accessibility optimized
- React Router integration
- Icon support (Hero Icons & Font Awesome)

### Dependencies
- External:
  - framer-motion
  - react-router-dom
  - react-icons/hi
  - react-icons/fa
  - react-icons/si
- Internal:
  - classNames utility
  - footerVariants
  - footerLinkVariants

### Implementation
```typescript
export const Footer: React.FC<FooterProps> = ({
  className
}) => {
  const currentYear = new Date().getFullYear();
  
  // Social links configuration
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/va-ralphbserrano',
      icon: FaGithub
    },
    // ... other social links
  ];

  // Quick navigation links
  const quickLinks: QuickLink[] = [
    { name: 'Home', path: '/' },
    // ... other navigation links
  ];

  return (
    <footer className={classNames(
      'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800',
      className
    )}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <motion.div variants={footerVariants} /* ... */ >
            {/* Contact information */}
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={footerVariants} /* ... */ >
            {/* Navigation links */}
          </motion.div>

          {/* Social Links */}
          <motion.div variants={footerVariants} /* ... */ >
            {/* Social media links */}
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t">
          {/* Copyright notice */}
        </div>
      </div>
    </footer>
  );
};
```

### Styling
- TailwindCSS Classes:
  - Layout:
    - `container`: Width constraint
    - `grid`: Grid layout system
    - `grid-cols-1 md:grid-cols-3`: Responsive columns
  - Colors:
    - Light mode: `bg-white text-gray-900`
    - Dark mode: `dark:bg-gray-900 dark:text-white`
  - Spacing:
    - Padding: `px-4 py-12`
    - Gaps: `gap-8`
  - Borders:
    - Top border: `border-t`
    - Colors: `border-gray-200 dark:border-gray-800`

### Animation
- Footer Sections:
  ```typescript
  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
  ```
- Footer Links:
  ```typescript
  const footerLinkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };
  ```

### Performance
- Optimization:
  - Static content
  - Minimal state management
  - Lazy-loaded icons
  - Viewport-based animations
- Bundle Impact:
  - Icon libraries
  - Framer Motion dependency
  - React Router dependency

### Accessibility
- Structure:
  - Semantic footer element
  - Proper heading hierarchy
  - ARIA labels for icons
  - Screen reader text
- Navigation:
  - Keyboard navigation
  - Focus management
  - Clear link purposes
  - High contrast support

### Testing
- Test File: `src/components/layout/__tests__/Footer.test.tsx`
- Key Test Cases:
  - Renders all sections
  - Displays current year
  - Renders social links
  - Renders quick links
  - Handles dark mode
  - Manages animations
  - Link functionality
  - Accessibility compliance

### Component Hierarchy
```
Footer
├── About Section (motion.div)
│   ├── Contact Info
│   └── Location Info
├── Quick Links (motion.div)
│   └── Navigation Links (motion.li)
└── Social Links (motion.div)
    └── Social Icons (motion.a)
```

### Related Components
- Container: Layout wrapper
- Section: Content sections
- Layout: Overall structure
- Navbar: Top navigation

### Changelog
| Version | Changes | Date |
|---------|---------|------|
| 1.0.0   | Initial implementation | 2024 |
| 1.1.0   | Added dark mode support | 2024 |
| 1.2.0   | Enhanced animations | 2024 |

### Notes
- Social links are configurable
- Quick links match router paths
- Dark mode follows system preference
- Animations trigger on viewport entry
- Contact info should be updated as needed
- Icons can be customized or replaced
- Consider adding newsletter signup
- Monitor animation performance
