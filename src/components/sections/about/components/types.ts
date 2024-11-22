import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

export interface AboutHeaderProps {
  className?: string;
}

export interface AboutSectionProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export interface AboutGridProps {
  children: ReactNode;
  className?: string;
}

export interface AboutToolsProps {
  className?: string;
}

export const aboutVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
};

export const aboutSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};
