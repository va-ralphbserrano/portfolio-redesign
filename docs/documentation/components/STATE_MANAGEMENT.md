# State Management

This document outlines the state management patterns and context providers used in the portfolio website.

## Context Providers

### ThemeContext
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}
```
- **Purpose**: Manages theme state across the application
- **Features**:
  - Theme switching (light/dark)
  - System preference detection
  - Persistent theme storage
  - Smooth theme transitions
- **Usage**:
  ```typescript
  const { theme, toggleTheme } = useTheme();
  ```

### LoadingContext
```typescript
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}
```
- **Purpose**: Global loading state management
- **Features**:
  - Loading indicators
  - Progress tracking
  - Route transition loading
  - Resource loading states
- **Usage**:
  ```typescript
  const { isLoading, setLoading } = useLoading();
  ```

### FormContext
```typescript
interface FormContextType {
  isSubmitting: boolean;
  setSubmitting: (submitting: boolean) => void;
  formErrors: Record<string, string>;
  setFormErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
}

interface FormProviderProps {
  children: React.ReactNode;
}
```
- **Purpose**: Form state and validation management
- **Features**:
  - Form submission state
  - Error handling
  - Validation state
  - Field error tracking
- **Usage**:
  ```typescript
  const { isSubmitting, formErrors } = useForm();
  ```

## Implementation Patterns

### Context Composition
```typescript
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <FormProvider>
          {children}
        </FormProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
```

### Hook Composition
```typescript
function useAppState() {
  const theme = useTheme();
  const loading = useLoading();
  const form = useForm();

  return {
    theme,
    loading,
    form
  };
}
```

## Best Practices

### State Organization
- Keep state close to where it's used
- Avoid prop drilling with context
- Use local state when possible
- Compose providers efficiently

### Performance
- Memoize context values
- Split contexts to avoid rerenders
- Use context selectors
- Optimize provider trees

### Type Safety
- Define strict interfaces
- Use discriminated unions
- Type guard utilities
- Exhaustive checking

### Error Handling
- Fallback values
- Error boundaries
- Type checking
- Default states

## Usage Examples

### Theme Management
```typescript
// Theme provider setup
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>

// Using theme in components
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header-${theme}`}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
}
```

### Loading States
```typescript
// Loading provider setup
<LoadingProvider>
  <Router />
</LoadingProvider>

// Using loading state
function DataComponent() {
  const { setLoading, setProgress } = useLoading();
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await loadData(progress => setProgress(progress));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
}
```

### Form Management
```typescript
// Form provider setup
<FormProvider>
  <ContactForm />
</FormProvider>

// Using form state
function ContactForm() {
  const { isSubmitting, formErrors, setFormErrors } = useForm();
  
  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
    } catch (error) {
      setFormErrors({
        [error.field]: error.message
      });
    }
  };
}
```

## Testing

### Context Testing
```typescript
describe('ThemeContext', () => {
  it('provides default theme');
  it('toggles theme correctly');
  it('persists theme preference');
});

describe('LoadingContext', () => {
  it('manages loading state');
  it('tracks progress correctly');
});

describe('FormContext', () => {
  it('handles form submission');
  it('manages error states');
});
```

### Integration Testing
```typescript
describe('App State Integration', () => {
  it('composes providers correctly');
  it('handles state interactions');
  it('maintains type safety');
});
