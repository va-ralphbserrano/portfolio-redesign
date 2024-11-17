import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

export interface CustomCursorProps {
  className?: string;
}

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export interface PreloaderProps {
  className?: string;
}

export interface ScrollLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  duration?: number;
}

export interface ScrollToTopProps {
  className?: string;
  showBelow?: number;
}

export const cursorVariants: Variants = {
  default: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 28
    }
  },
  hover: {
    scale: 1.5,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 28
    }
  }
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const preloaderVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeIn'
    }
  }
};

export const scrollToTopVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  }
};
