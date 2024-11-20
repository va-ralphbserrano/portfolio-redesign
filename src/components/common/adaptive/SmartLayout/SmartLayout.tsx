import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@/hooks/useWindowSize';
import { classNames } from '@/utils/helpers';
import { SmartLayoutProps } from '../types';

// Responsive breakpoints matching Tailwind config
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Spacing configurations
const spacingClasses = {
  compact: 'gap-2 p-2',
  normal: 'gap-4 p-4',
  relaxed: 'gap-6 p-6',
} as const;

/**
 * SmartLayout Component
 * 
 * A responsive layout component that intelligently adapts to viewport size and user preferences.
 * Features include:
 * - Responsive reordering based on breakpoints
 * - Configurable spacing and animations
 * - Intersection-based animations
 * - Performance optimizations
 * 
 * @example
 * ```tsx
 * <SmartLayout
 *   breakpoint="md"
 *   spacing="normal"
 *   priority={1}
 *   reorderPoint={2}
 * >
 *   <YourContent />
 * </SmartLayout>
 * ```
 */
export const SmartLayout: React.FC<SmartLayoutProps> = ({
  children,
  className,
  priority = 0,
  breakpoint = 'md',
  reorderPoint = 0,
  spacing = 'normal',
  animate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [order, setOrder] = React.useState<number>(priority);

  // Handle responsive reordering
  useEffect(() => {
    if (width && width < breakpoints[breakpoint]) {
      setOrder(priority + reorderPoint);
    } else {
      setOrder(priority);
    }
  }, [width, breakpoint, priority, reorderPoint]);

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={classNames(
        'smart-layout',
        'w-full',
        spacingClasses[spacing],
        className
      )}
      style={{ order }}
      initial={animate ? 'hidden' : false}
      animate={animate && inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

SmartLayout.displayName = 'SmartLayout';

export default SmartLayout;
