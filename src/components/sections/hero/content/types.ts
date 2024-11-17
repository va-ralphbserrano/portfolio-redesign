import { Variants } from 'framer-motion';

export interface HeroContentProps {
  className?: string;
}

export interface HeroTitleProps {
  className?: string;
}

export interface HeroDescriptionProps {
  className?: string;
}

export interface HeroActionsProps {
  className?: string;
}

export interface HeroStatsProps {
  className?: string;
}

export interface HeroStatProps {
  label: string;
  value: string;
  className?: string;
}

export const heroContentVariants: Variants = {
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

export const heroTextVariants: Variants = {
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

export const heroButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

export const heroStatVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};
