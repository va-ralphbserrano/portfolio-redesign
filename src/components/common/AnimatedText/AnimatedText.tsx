import React from 'react';
import { motion, Variants } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { WithClassName } from '@/types/component';

interface AnimatedTextProps extends WithClassName {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: (custom: { staggerChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren,
      delayChildren: 0
    }
  })
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (custom: { duration: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration,
      delay: custom.delay
    }
  })
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Element = 'div',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.1,
  once = true,
  className
}) => {
  const letters = Array.from(text);
  const MotionElement = motion[Element as keyof typeof motion];

  return (
    <MotionElement
      className={classNames('inline-flex', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={{ staggerChildren }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          custom={{
            duration,
            delay: delay + index * staggerChildren
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </MotionElement>
  );
};

AnimatedText.displayName = 'AnimatedText';

export default AnimatedText;
