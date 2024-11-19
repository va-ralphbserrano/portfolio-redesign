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

## Media Optimization

### Network Quality Detection

#### useNetworkQuality Hook
Returns the current network quality based on connection speed.

```typescript
type NetworkQuality = 'slow' | 'medium' | 'fast';

function useNetworkQuality(): NetworkQuality
```

#### Thresholds
- `slow`: ≤ 1 Mbps
- `medium`: ≤ 5 Mbps
- `fast`: > 5 Mbps

### Image Format Support

#### supportsWebP
Detects browser support for WebP format.

```typescript
async function supportsWebP(): Promise<boolean>
```

#### supportsAVIF
Detects browser support for AVIF format.

```typescript
async function supportsAVIF(): Promise<boolean>
```

### Progressive Image Loading

#### useProgressiveImage Hook
Handles progressive loading of images with blur effect.

```typescript
interface ProgressiveImageResult {
  src: string;
  isLoading: boolean;
}

function useProgressiveImage(
  highResSrc: string,
  lowResSrc: string
): ProgressiveImageResult
```

#### Parameters
- `highResSrc`: High-resolution image URL
- `lowResSrc`: Low-resolution/blur image URL

### Video Quality Optimization

#### VideoQualityOptions Interface
```typescript
interface VideoQualityOptions {
  src: string;
  quality: 'low' | 'medium' | 'high';
  type?: string;
}
```

#### getOptimalVideoQuality
Selects optimal video quality based on network conditions.

```typescript
function getOptimalVideoQuality(
  options: VideoQualityOptions[],
  networkQuality: NetworkQuality
): VideoQualityOptions
```

#### useOptimalVideoQuality Hook
React hook wrapper for video quality selection.

```typescript
function useOptimalVideoQuality(
  options: VideoQualityOptions[]
): VideoQualityOptions
```

### Optimized Components

#### OptimizedImage Component
```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

function OptimizedImage(props: OptimizedImageProps): JSX.Element
```

#### OptimizedVideo Component
```typescript
interface OptimizedVideoProps {
  sources: VideoQualityOptions[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

function OptimizedVideo(props: OptimizedVideoProps): JSX.Element
```

#### Error Handling
```typescript
interface MediaError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

Error Codes:
- `FORMAT_UNSUPPORTED`: Media format not supported
- `NETWORK_ERROR`: Network issues during loading
- `QUALITY_UNAVAILABLE`: Requested quality not available
- `LOAD_ERROR`: General loading error

## Portfolio Section APIs

### Project Data Structure

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  subcategory: string;
  technologies: string[];
  images: ProjectImages;
  details?: ProjectDetails;
}

export interface ProjectImages {
  main: string;
  gallery?: string[];
}

export interface ProjectDetails {
  specs?: string[];
  features?: string[];
  timeline?: string;
}

export enum ProjectCategory {
  KITCHEN = 'Kitchen & Restaurant Equipment',
  INDUSTRIAL = 'Industrial Equipment',
  STORAGE = 'Storage Solutions',
  FABRICATION = 'Metal Fabrication',
  CONSTRUCTION = 'Construction & Installation',
  COMMERCIAL = 'Commercial Spaces'
}
```

### Portfolio Component Props

```typescript
interface PortfolioProps {
  initialCategory?: ProjectCategory;
  showFilters?: boolean;
  gridColumns?: 1 | 2 | 3;
  animationConfig?: {
    staggerDelay?: number;
    duration?: number;
    ease?: string;
  };
}
```

### Filter Context API

```typescript
interface FilterContextType {
  category: ProjectCategory;
  subcategory: string | null;
  setCategory: (category: ProjectCategory) => void;
  setSubcategory: (subcategory: string | null) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType>(null!);

export const useFilter = () => useContext(FilterContext);
```

### Project Card Component Props

```typescript
interface ProjectCardProps {
  project: Project;
  index: number;
  variants?: Variants;
  className?: string;
}
```

### Animation Variants

```typescript
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
```

### Utility Functions

```typescript
export const filterProjects = (
  projects: Project[],
  category: ProjectCategory,
  subcategory: string | null
): Project[] => {
  return projects.filter(project => 
    project.category === category && 
    (!subcategory || project.subcategory === subcategory)
  );
};

export const getSubcategories = (
  projects: Project[],
  category: ProjectCategory
): string[] => {
  return [...new Set(
    projects
      .filter(p => p.category === category)
      .map(p => p.subcategory)
  )];
};
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
