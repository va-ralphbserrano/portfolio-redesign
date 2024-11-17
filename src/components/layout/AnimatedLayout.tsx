import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

interface BaseAnimationProps {
  children: ReactNode;
  className?: string;
}

interface TimedAnimationProps extends BaseAnimationProps {
  delay?: number;
  duration?: number;
}

interface SlideInProps extends TimedAnimationProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

interface StaggerProps extends BaseAnimationProps {
  staggerDelay?: number;
}

const AnimatedLayout = ({ children, className }: BaseAnimationProps) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, duration = 0.6, className }: TimedAnimationProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideUp = ({ children, delay = 0, duration = 0.6, className }: TimedAnimationProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.6, className }: SlideInProps) => {
  const directionValues = {
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    top: { x: 0, y: -20 },
    bottom: { x: 0, y: 20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionValues[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Scale = ({ children, delay = 0, duration = 0.6, className }: TimedAnimationProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

const Stagger = ({ children, staggerDelay = 0.1, className }: StaggerProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {React.Children.map(children, child => (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
);

AnimatedLayout.FadeIn = FadeIn;
AnimatedLayout.SlideUp = SlideUp;
AnimatedLayout.SlideIn = SlideIn;
AnimatedLayout.Scale = Scale;
AnimatedLayout.Stagger = Stagger;

AnimatedLayout.displayName = 'AnimatedLayout';
FadeIn.displayName = 'AnimatedLayout.FadeIn';
SlideUp.displayName = 'AnimatedLayout.SlideUp';
SlideIn.displayName = 'AnimatedLayout.SlideIn';
Scale.displayName = 'AnimatedLayout.Scale';
Stagger.displayName = 'AnimatedLayout.Stagger';

export default AnimatedLayout;
