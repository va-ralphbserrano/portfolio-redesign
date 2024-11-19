import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@/hooks/useWindowSize';
import { classNames } from '@/utils/helpers';

export interface SmartLayoutProps {
  children: React.ReactNode;
  className?: string;
  priority?: number;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  reorderPoint?: number;
  spacing?: 'compact' | 'normal' | 'relaxed';
  animate?: boolean;
}

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
  const [order, setOrder] = useState<number>(priority);

  // Responsive breakpoints matching Tailwind config
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  // Spacing configurations
  const spacingClasses = {
    compact: 'gap-2 p-2',
    normal: 'gap-4 p-4',
    relaxed: 'gap-6 p-6',
  };

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
