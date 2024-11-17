import { Variants } from 'framer-motion';

export const defaultAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
};

export const typewriterAnimation: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100
    }
  }
};

export const gradientAnimation: Variants = {
  hidden: { backgroundPosition: '200% center' },
  visible: {
    backgroundPosition: '0% center',
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
};

export const fadeUpAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const revealAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
};

export const charAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      delay: index * 0.03
    }
  })
};

export const animations = {
  default: defaultAnimation,
  typewriter: typewriterAnimation,
  gradient: gradientAnimation,
  fadeUp: fadeUpAnimation,
  reveal: revealAnimation
} as const;
