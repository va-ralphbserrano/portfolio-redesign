import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { classNames } from '@/utils/helpers';

// Types
export type AnimationType = 'default' | 'typewriter' | 'gradient' | 'fadeUp' | 'reveal';
export type ElementType = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface AnimatedTextProps extends Omit<HTMLMotionProps<'div'>, 'animate'> {
  text: string;
  el?: ElementType;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  className?: string;
  animation?: AnimationType;
  repeatDelay?: number;
}

// Animation Variants
const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: (custom: { staggerChildren: number; delay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren,
      delayChildren: custom.delay
    }
  })
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: { duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration
    }
  })
};

const variants = {
  default: letterVariants,
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  reveal: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
};

// Styles
const getAnimationStyles = (animation?: AnimationType): React.CSSProperties => {
  if (animation === 'gradient') {
    return {
      background: 'linear-gradient(to right, #2ecc71, #3498db, #2ecc71)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    };
  }

  if (animation === 'typewriter') {
    return {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    };
  }

  return {};
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Element = 'div',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.1,
  once = true,
  className,
  animation = 'default',
  repeatDelay,
  ...props
}) => {
  const letters = text.split('');
  const style = getAnimationStyles(animation);
  const currentVariant = variants[animation] || variants.default;

  return (
    <motion.div
      className={classNames('inline-block', className)}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
      custom={{ staggerChildren, delay }}
      {...props}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={currentVariant}
          custom={{ duration }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

AnimatedText.displayName = 'AnimatedText';
