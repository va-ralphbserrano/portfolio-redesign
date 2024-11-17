import { HTMLMotionProps } from 'framer-motion';

export type AnimationType = 'default' | 'typewriter' | 'gradient' | 'fadeUp' | 'reveal';
export type ElementType = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface AnimatedTextProps extends Omit<HTMLMotionProps<'div'>, 'animate'> {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  animation?: AnimationType;
  el?: ElementType;
  repeatDelay?: number;
}

export interface AnimatedCharProps extends HTMLMotionProps<'span'> {
  char: string;
  index: number;
}
