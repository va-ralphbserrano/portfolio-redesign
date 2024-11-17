import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

type ElementType = keyof JSX.IntrinsicElements;

export interface AnimatedLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface ContainerProps<T extends ElementType = 'div'> {
  children: ReactNode;
  className?: string;
  as?: T;
}

export interface FooterProps {
  className?: string;
}

export interface GridProps {
  children: ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
}

export interface NavbarProps {
  className?: string;
}

export interface SectionProps<T extends ElementType = 'section'> {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: T;
}

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

export const navbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20
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

export const navLinkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10
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

export const footerLinkVariants: Variants = {
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
