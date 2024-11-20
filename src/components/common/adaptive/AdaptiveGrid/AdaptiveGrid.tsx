import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/utils/helpers';
import { AdaptiveGridProps } from '../types';

/**
 * AdaptiveGrid Component
 * 
 * A responsive grid component that automatically adjusts its layout based on viewport size.
 * Features:
 * - Configurable columns for different breakpoints
 * - Automatic gap adjustment
 * - Animated item transitions
 * - Performance-optimized rendering
 * 
 * @example
 * ```tsx
 * <AdaptiveGrid
 *   columns={{ mobile: 1, tablet: 2, desktop: 3 }}
 *   gap="2rem"
 *   animate={true}
 * >
 *   {items.map(item => (
 *     <div key={item.id}>{item.content}</div>
 *   ))}
 * </AdaptiveGrid>
 * ```
 */
export const AdaptiveGrid: React.FC<AdaptiveGridProps> = ({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = '1rem',
  animate = true,
  spacing = 'normal',
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Grid template columns based on breakpoints
  const gridTemplateColumns = {
    mobile: `repeat(${columns.mobile}, minmax(0, 1fr))`,
    tablet: `repeat(${columns.tablet}, minmax(0, 1fr))`,
    desktop: `repeat(${columns.desktop}, minmax(0, 1fr))`,
  };

  // Spacing configurations
  const spacingClasses = {
    compact: 'gap-2',
    normal: 'gap-4',
    relaxed: 'gap-6',
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
      ref={ref}
      className={classNames(
        'w-full',
        'grid',
        spacingClasses[spacing],
        className
      )}
      style={{
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns.mobile,
        gap,
        ['@media (min-width: 768px)' as string]: {
          gridTemplateColumns: gridTemplateColumns.tablet,
        },
        ['@media (min-width: 1024px)' as string]: {
          gridTemplateColumns: gridTemplateColumns.desktop,
        },
      }}
      initial={animate ? 'hidden' : false}
      animate={animate && inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

AdaptiveGrid.displayName = 'AdaptiveGrid';

export default AdaptiveGrid;
