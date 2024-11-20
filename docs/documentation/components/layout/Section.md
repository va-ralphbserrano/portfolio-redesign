# Section Component

## Overview
The Section component is a versatile layout component that provides animated, responsive sections with configurable padding and width. It integrates Framer Motion for smooth animations and supports viewport-based animations.

### Location
`src/components/layout/Section.tsx`

### Interface
```typescript
interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;    // Disables container width constraints
  noPadding?: boolean;    // Disables default padding
  animate?: boolean;      // Enables/disables animation
  initial?: boolean | Target | VariantLabels;
  whileInView?: VariantLabels | TargetAndTransition;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
    root?: React.RefObject<Element>;
  };
}
```

### Usage Example
```tsx
import { Section } from '@/components/layout/Section';

// Basic usage
<Section>
  <h2>Section Content</h2>
  <p>Some content here...</p>
</Section>

// Full width with custom padding
<Section
  fullWidth
  className="bg-gray-100"
>
  <div>Wide content...</div>
</Section>

// Custom animation settings
<Section
  animate={true}
  viewport={{ once: true, margin: '-50px' }}
  className="my-8"
>
  <div>Animated content...</div>
</Section>

// No padding for custom layouts
<Section noPadding>
  <div className="custom-padding">
    Custom padded content...
  </div>
</Section>
```

### Features
- Responsive padding system
- Container width management
- Framer Motion integration
- Viewport-based animations
- Customizable animation settings
- TypeScript support
- TailwindCSS integration

### Dependencies
- External:
  - framer-motion
- Internal:
  - classNames utility

### Implementation
```typescript
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  fullWidth = false,
  noPadding = false,
  animate = true,
  initial,
  whileInView,
  viewport,
  ...props
}) => {
  return (
    <motion.section
      id={id}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : { opacity: 1 }}
      viewport={animate ? { once: true, margin: '-100px' } : { once: true }}
      variants={sectionVariants}
      className={classNames(
        'relative',
        !noPadding && 'py-12 sm:py-16 md:py-20 lg:py-24',
        !fullWidth && 'container mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </motion.section>
  );
};
```

### Styling
- TailwindCSS Classes:
  - Layout:
    - `relative`: Positioning context
    - `container`: Width constraint
    - `mx-auto`: Center alignment
  - Padding:
    - Base: `py-12 px-4`
    - SM: `sm:py-16 sm:px-6`
    - MD: `md:py-20`
    - LG: `lg:py-24 lg:px-8`

### Animation
- Default Animation:
  - Initial state: Hidden (opacity: 0, y: 20)
  - Visible state: Fade in and slide up
  - Duration: 0.6 seconds
  - Easing: easeOut
- Viewport Settings:
  - Triggers once
  - Default margin: -100px
  - Customizable through props

### Performance
- Optimization:
  - No state management
  - Pure functional component
  - Viewport-based animation triggering
- Bundle Impact:
  - Framer Motion dependency
  - Minimal internal overhead
  - Static variant definitions

### Accessibility
- Structure:
  - Semantic HTML5 section element
  - Supports ARIA attributes
  - Optional ID for landmarks
- Animation:
  - Respects reduced motion preferences
  - Non-essential animations
  - No impact on content hierarchy

### Testing
- Test File: `src/components/layout/__tests__/Section.test.tsx`
- Key Test Cases:
  - Renders children correctly
  - Applies padding classes
  - Handles fullWidth prop
  - Manages animation states
  - Passes HTML attributes
  - Viewport animation triggers

### Component Hierarchy
```
Section (motion.section)
└── {children}
```

### Related Components
- Container: Similar width constraints
- Grid: Often used within sections
- Layout: Overall structure

### Changelog
| Version | Changes | Date |
|---------|---------|------|
| 1.0.0   | Initial implementation | 2024 |
| 1.1.0   | Added animation support | 2024 |
| 1.2.0   | Enhanced viewport options | 2024 |

### Notes
- Use `fullWidth` for edge-to-edge layouts
- Consider `noPadding` for custom padding schemes
- Animation can be disabled for static sections
- Viewport margin affects animation trigger point
- Compatible with Framer Motion's features
- Maintains responsive padding by default
