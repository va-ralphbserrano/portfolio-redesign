import { Variants } from 'framer-motion';

export const badgeAnimationVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};
