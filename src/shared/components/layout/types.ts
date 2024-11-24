import { ReactNode, HTMLAttributes } from 'react';
import { Variants } from 'framer-motion';

type ElementType = keyof JSX.IntrinsicElements;

export interface AnimatedLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface ContainerProps<T extends keyof JSX.IntrinsicElements> {
  children: ReactNode;
  className?: string;
  as?: T;
}

export interface FooterProps {
  className?: string;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export interface NavbarProps {
  className?: string;
}

export interface SectionProps<T extends ElementType = 'section'> extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: T;
  fullWidth?: boolean;
  noPadding?: boolean;
  animate?: boolean;
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
