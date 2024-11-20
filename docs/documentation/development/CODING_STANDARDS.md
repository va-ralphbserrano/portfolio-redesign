# Coding Standards

## TypeScript

### Types and Interfaces
```typescript
// Use specific types
interface UserProps {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Use generics for reusable types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

### Functions
```typescript
// Use type annotations
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Use async/await
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## React Components

### Component Structure
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'medium',
  onClick,
  children
}) => {
  return (
    <button
      className={clsx(styles[variant], styles[size])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Hooks Usage
```typescript
// Custom hooks
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
```

## CSS/SCSS

### Naming Convention
```scss
// Use BEM naming
.card {
  &__header { }
  &__content { }
  &__footer { }
  
  &--featured { }
  &--disabled { }
}

// Use semantic names
.button {
  &--primary { }
  &--danger { }
}
```

### Media Queries
```scss
// Mobile-first approach
.container {
  width: 100%;
  
  @media (min-width: 768px) {
    width: 750px;
  }
  
  @media (min-width: 1024px) {
    width: 970px;
  }
}
```

## File Organization

### Directory Structure
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.scss
│   └── Button.test.tsx
└── Card/
    ├── Card.tsx
    ├── Card.module.scss
    └── Card.test.tsx
```

### Import Order
```typescript
// 1. React and libraries
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Components and hooks
import { Button } from '@/components';
import { useWindowSize } from '@/hooks';

// 3. Types and utilities
import type { Project } from '@/types';
import { formatDate } from '@/utils';

// 4. Styles and assets
import styles from './Component.module.scss';
import logo from '@/assets/logo.svg';
```

## Best Practices

### Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid inline styles and functions
- Use lazy loading for routes and large components

### Testing
- See [Testing Guide](../testing/TESTING.md) for detailed testing standards
- Follow project testing patterns and conventions

### Security
- Sanitize user inputs
- Use HTTPS for API calls
- Implement proper authentication
- Follow OWASP guidelines

### Accessibility
- Use semantic HTML
- Implement ARIA attributes
- Ensure keyboard navigation
- Maintain proper contrast ratios
