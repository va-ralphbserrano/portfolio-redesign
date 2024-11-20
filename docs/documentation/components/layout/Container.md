# Container Component

## Overview
The Container component is a polymorphic layout component that provides consistent width constraints and padding across the application. It's designed to be flexible in terms of the HTML element it renders while maintaining a consistent content width and responsive padding.

### Location
`src/components/layout/Container.tsx`

### Interface
```typescript
interface ContainerProps<T extends keyof JSX.IntrinsicElements> {
  children: ReactNode;           // Child elements to be rendered
  className?: string;           // Optional CSS classes
  as?: T;                       // Optional element type (div by default)
}

type ElementType = keyof JSX.IntrinsicElements;  // Any valid HTML element
```

### Usage Example
```tsx
import { Container } from '@/components/layout/Container';

// Basic usage
<Container>
  <h1>Content</h1>
</Container>

// As a different HTML element
<Container as="section">
  <h1>Section Content</h1>
</Container>

// With custom styling
<Container className="my-8">
  <h1>Custom Styled Content</h1>
</Container>

// As a semantic element with custom classes
<Container 
  as="main"
  className="bg-gray-50 dark:bg-gray-900"
>
  <h1>Main Content</h1>
</Container>
```

### Features
- Polymorphic component (can render as any HTML element)
- Consistent max-width constraint
- Responsive padding
- Dark mode compatible
- Customizable through className prop
- TypeScript support with generic typing

### Dependencies
- Internal:
  - classNames utility

### Implementation
```typescript
export const Container = <T extends ElementType = 'div'>({
  children,
  className,
  as: Component = 'div' as T
}: ContainerProps<T>) => {
  const props = {
    className: classNames(
      'container mx-auto',     // Center alignment
      'px-4 sm:px-6 lg:px-8', // Responsive padding
      'max-w-7xl',            // Maximum width
      className               // Custom classes
    )
  };

  return <Component {...props}>{children}</Component>;
};
```

### Styling
- TailwindCSS Classes:
  - Layout:
    - `container`: Sets width to current breakpoint
    - `mx-auto`: Centers container horizontally
    - `max-w-7xl`: Maximum width constraint (80rem)
  - Spacing:
    - `px-4`: Default horizontal padding (1rem)
    - `sm:px-6`: Tablet horizontal padding (1.5rem)
    - `lg:px-8`: Desktop horizontal padding (2rem)

### Responsive Behavior
| Breakpoint | Padding | Max Width |
|------------|---------|-----------|
| Default    | 1rem    | 80rem     |
| sm (640px) | 1.5rem  | 80rem     |
| lg (1024px)| 2rem    | 80rem     |

### Performance
- Optimization:
  - No state management
  - No side effects
  - Pure functional component
  - Minimal DOM elements
- Bundle Impact:
  - Small footprint
  - No external dependencies
  - Efficient class merging

### Accessibility
- Semantic Structure:
  - Supports semantic HTML elements through `as` prop
  - Maintains content structure
  - No impact on document outline

### Testing
- Test File: `src/components/layout/__tests__/Container.test.tsx`
- Key Test Cases:
  - Renders with default element (div)
  - Renders with custom element
  - Applies custom classes
  - Maintains child content
  - Preserves HTML attributes

### Component Hierarchy
```
Container
└── {children}
```

### Related Components
- Layout: Parent layout component
- Section: Content section component
- Grid: Grid layout system

### Changelog
| Version | Changes | Date |
|---------|---------|------|
| 1.0.0   | Initial implementation | 2024 |
| 1.1.0   | Added polymorphic support | 2024 |
| 1.2.0   | Enhanced responsive padding | 2024 |

### Notes
- Always centers content horizontally
- Maintains consistent max-width across breakpoints
- Adjusts padding responsively
- Can be nested if needed
- TypeScript note: Uses @ts-expect-error for polymorphic type inference
- Consider performance when deeply nesting containers
