import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { animationVariants, animationTypes } from '@/animations';
import { AnimatedTextProps, AnimationType } from './types';

export type AnimationType = animationTypes;

export interface AnimatedTextProps {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  className?: string;
  animation?: AnimationType;
}

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

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Element = 'div',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.1,
  once = true,
  className,
  animation = 'default'
}) => {
  const letters = Array.from(text);
  const MotionElement = motion[Element as keyof typeof motion];
  const styles = getAnimationStyles(animation);

  return (
    <MotionElement
      className={classNames('inline-flex', className)}
      variants={animationVariants.textContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={styles}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={animationVariants.letter}
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
