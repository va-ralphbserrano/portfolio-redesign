# API Documentation

## Email Service

### Send Email
Sends an email using EmailJS service.

```typescript
interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function sendEmail(data: EmailPayload): Promise<void>
```

#### Parameters
- `name`: Sender's name
- `email`: Sender's email
- `subject`: Email subject
- `message`: Email content

#### Rate Limiting
- 5 requests per minute
- 50 requests per hour
- 500 requests per day

#### Error Handling
```typescript
interface EmailError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

Error Codes:
- `RATE_LIMIT`: Rate limit exceeded
- `INVALID_INPUT`: Invalid input data
- `SERVICE_ERROR`: Service unavailable
- `NETWORK_ERROR`: Network issues

## Theme Context

### useTheme Hook
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useTheme = (): ThemeContextType
```

#### Usage
```typescript
const { theme, toggleTheme } = useTheme();
```

## Animation Utilities

### Page Transitions
```typescript
const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
```

### Fade In
```typescript
interface FadeInProps {
  delay?: number;
  duration?: number;
}

const fadeIn = (props: FadeInProps) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    delay: props.delay, 
    duration: props.duration 
  }
});
```

## Type Definitions

### Component Props
```typescript
interface WithClassName {
  className?: string;
}

interface WithChildren {
  children: React.ReactNode;
}

interface BaseProps extends WithClassName, WithChildren {}
```

### Form Types
```typescript
interface FormState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface FormField<T> {
  value: T;
  error: string | null;
  touched: boolean;
}
```

### Data Types
```typescript
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}
```

## Utility Functions

### Class Names
```typescript
function classNames(...classes: (string | undefined)[]): string
```

### Image Loading
```typescript
interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

function imageLoader(props: ImageLoaderProps): string
```

### Form Validation
```typescript
interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

function validateField(
  value: any, 
  rules: ValidationRule[]
): string | null
```

## Constants

### Navigation
```typescript
interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

const NAV_ITEMS: NavItem[]
```

### Theme Colors
```typescript
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

const LIGHT_THEME: ThemeColors
const DARK_THEME: ThemeColors
```
