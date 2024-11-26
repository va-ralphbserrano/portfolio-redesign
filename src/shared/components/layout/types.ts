import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Variants } from 'framer-motion';

type ElementType = keyof JSX.IntrinsicElements;

export interface AnimatedLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  fluid?: boolean;
  gutter?: boolean;
}

export interface FooterProps {
  className?: string;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  cols?: number | { [key: string]: number };
  gap?: number | { [key: string]: number };
  as?: ElementType;
}

export interface NavbarProps {
  className?: string;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  noPadding?: boolean;
  fullWidth?: boolean;
  animate?: boolean;
  containerClassName?: string;
  as?: ElementType;
  id?: string;
}

// Animation Variants
export const layoutVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

export const navbarVariants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const navLinkVariants = {
  hidden: {
    opacity: 0,
    x: -10
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

export const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const footerLinkVariants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}
