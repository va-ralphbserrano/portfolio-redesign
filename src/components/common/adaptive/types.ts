import { WithClassName } from '@/types/component';

export interface AdaptiveBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface AdaptiveSpacing {
  compact: string;
  normal: string;
  relaxed: string;
}

export interface AdaptiveProps extends WithClassName {
  /**
   * Enable/disable animations
   * @default true
   */
  animate?: boolean;
  
  /**
   * Custom breakpoints for responsive behavior
   * @default { mobile: '640px', tablet: '768px', desktop: '1024px' }
   */
  breakpoints?: AdaptiveBreakpoints;
  
  /**
   * Spacing configuration for the component
   * @default 'normal'
   */
  spacing?: keyof AdaptiveSpacing;
  
  /**
   * Priority for reordering in responsive layouts
   * @default 0
   */
  priority?: number;
  
  /**
   * Point at which reordering should occur
   * @default 0
   */
  reorderPoint?: number;
}

export interface AdaptiveImageProps extends AdaptiveProps {
  /**
   * Source URL of the image
   */
  src: string;
  
  /**
   * Alt text for accessibility
   */
  alt: string;
  
  /**
   * Image sizes for responsive loading
   * @example "(max-width: 768px) 100vw, 50vw"
   */
  sizes?: string;
  
  /**
   * Loading strategy
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager';
  
  /**
   * Image quality (1-100)
   * @default 75
   */
  quality?: number;
  
  /**
   * Placeholder type while loading
   * @default 'blur'
   */
  placeholder?: 'blur' | 'empty';
  
  /**
   * Callback when image fails to load
   */
  onError?: () => void;
  
  /**
   * Callback when image loads successfully
   */
  onLoad?: () => void;
}

export interface AdaptiveGridProps extends AdaptiveProps {
  /**
   * Number of columns at different breakpoints
   */
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  
  /**
   * Gap between grid items
   * @default '1rem'
   */
  gap?: string;
  
  /**
   * Grid items
   */
  children: React.ReactNode;
}

export interface AdaptiveContainerProps extends AdaptiveProps {
  /**
   * Maximum width of the container
   * @default '100%'
   */
  maxWidth?: string;
  
  /**
   * Container padding
   * @default { mobile: '1rem', tablet: '2rem', desktop: '4rem' }
   */
  padding?: Partial<AdaptiveBreakpoints>;
  
  /**
   * Container content
   */
  children: React.ReactNode;
}

export interface SmartLayoutProps extends AdaptiveProps {
  /**
   * Layout content
   */
  children: React.ReactNode;
  
  /**
   * Breakpoint at which layout changes occur
   * @default 'md'
   */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
