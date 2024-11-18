import { Variants, easeOut } from 'framer-motion';
import { WithClassName } from '@/types/component';

export interface HeroProps extends WithClassName {
  id?: string;
}

export interface HeroContentProps extends WithClassName {
  id?: string;
}

export interface BackgroundElementsProps extends WithClassName {
  id?: string;
}

export interface HeroImageProps extends WithClassName {
  priority?: boolean;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export const heroItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: easeOut
    }
  }
} as const;

export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      ease: easeOut
    }
  }
} as const;

export const heroImageVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut
    }
  }
} as const;

export const titleVariants: Variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: easeOut
    }
  }
};

export const subtitleVariants: Variants = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.2,
      ease: easeOut
    }
  }
};

export const ctaVariants: Variants = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.4,
      ease: easeOut
    }
  }
};
