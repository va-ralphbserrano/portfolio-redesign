import { Variants } from 'framer-motion';

export interface HeroProps {
  className?: string;
}

export interface HeroContentProps {
  className?: string;
}

export interface BackgroundElementsProps {
  className?: string;
}

export interface HeroImageProps {
  className?: string;
  src: string;
  alt: string;
}

export const heroItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};
