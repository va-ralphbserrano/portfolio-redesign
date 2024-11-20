# Grid Component

## Overview
The Grid component is a flexible grid layout system built on CSS Grid. It provides a responsive grid structure with configurable columns across different breakpoints and customizable gap spacing.

### Location
`src/components/layout/Grid.tsx`

### Interface
```typescript
type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: GridCols;    // Extra small screens (default)
    sm?: GridCols;    // Small screens (640px+)
    md?: GridCols;    // Medium screens (768px+)
    lg?: GridCols;    // Large screens (1024px+)
    xl?: GridCols;    // Extra large screens (1280px+)
    '2xl'?: GridCols; // 2X large screens (1536px+)
  };
  gap?: number;       // Grid gap size (default: 4)
  className?: string; // Optional custom classes
  children?: React.ReactNode;
}
```

### Usage Example
```tsx
import { Grid } from '@/components/layout/Grid';

// Basic usage with responsive columns
<Grid
  cols={{
    xs: 1,  // 1 column on mobile
    sm: 2,  // 2 columns on tablet
    lg: 3   // 3 columns on desktop
  }}
  gap={4}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Custom gap and styling
<Grid
  cols={{ xs: 2, md: 4 }}
  gap={6}
  className="bg-gray-50 p-4"
>
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</Grid>

// Full 12-column grid
<Grid cols={{ xs: 12 }} gap={2}>
  <div className="col-span-4">Sidebar</div>
  <div className="col-span-8">Content</div>
</Grid>
```

### Features
- Responsive grid system
- Configurable columns per breakpoint
- Customizable gap spacing
- Extends HTMLDivElement attributes
- TypeScript support
- TailwindCSS integration

### Dependencies
- Internal:
  - classNames utility

### Implementation
```typescript
const getColsClass = (size: string, cols: GridCols | undefined): string | null => {
  if (!cols) return null;
  const prefix = size === 'xs' ? '' : `${size}:`;
  return `${prefix}grid-cols-${cols}`;
};

export const Grid: React.FC<GridProps> = ({
  cols = { xs: 1 },
  gap = 4,
  className,
  children,
  ...props
}) => {
  const colClasses = Object.entries(cols)
    .map(([size, value]) => getColsClass(size, value))
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames(
        'grid',
        colClasses,
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Styling
- TailwindCSS Classes:
  - Layout:
    - `grid`: Enables CSS Grid
    - `grid-cols-{1-12}`: Column configuration
    - `gap-{size}`: Grid gap spacing
  - Responsive:
    - `sm:grid-cols-{1-12}`
    - `md:grid-cols-{1-12}`
    - `lg:grid-cols-{1-12}`
    - `xl:grid-cols-{1-12}`
    - `2xl:grid-cols-{1-12}`

### Responsive Behavior
| Breakpoint | Width | Default Columns |
|------------|-------|-----------------|
| xs | < 640px | 1 |
| sm | ≥ 640px | Configurable |
| md | ≥ 768px | Configurable |
| lg | ≥ 1024px | Configurable |
| xl | ≥ 1280px | Configurable |
| 2xl | ≥ 1536px | Configurable |

### Performance
- Optimization:
  - No state management
  - No side effects
  - Pure functional component
  - Efficient class generation
- Bundle Impact:
  - Minimal footprint
  - No external dependencies
  - Static utility function

### Accessibility
- Layout Structure:
  - Semantic grid layout
  - Maintains content order
  - Screen reader friendly
- Responsiveness:
  - Adapts to screen sizes
  - Maintains readability
  - Preserves content hierarchy

### Testing
- Test File: `src/components/layout/__tests__/Grid.test.tsx`
- Key Test Cases:
  - Renders with default props
  - Applies responsive columns
  - Handles gap prop
  - Merges custom classes
  - Passes HTML attributes
  - Maintains child order

### Component Hierarchy
```
Grid
└── {children}
```

### Related Components
- Container: Wraps grid layouts
- Section: May contain grid layouts
- Layout: Overall structure

### Changelog
| Version | Changes | Date |
|---------|---------|------|
| 1.0.0   | Initial implementation | 2024 |
| 1.1.0   | Added responsive support | 2024 |
| 1.2.0   | Enhanced gap control | 2024 |

### Notes
- Default to single column on mobile
- Gap size follows Tailwind's spacing scale
- Can be nested for complex layouts
- Consider accessibility when changing column counts
- Use with Container component for consistent margins
- Monitor performance with large numbers of grid items
