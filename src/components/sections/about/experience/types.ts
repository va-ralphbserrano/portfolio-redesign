import { Variants } from 'framer-motion';
import { WithClassName } from '@/types/component';

export interface ExperienceItem {
  title: string;
  company: string;
  year: string;
  description: string;
}

export interface ExperienceProps extends WithClassName {}

export interface ExperienceTimelineProps extends WithClassName {}

export interface ExperienceTimelineNodeProps extends WithClassName {
  isLast: boolean;
}

export interface ExperienceCardProps extends WithClassName {
  experience: ExperienceItem;
}

export interface ExperienceIconProps extends WithClassName {
  size?: number;
  color?: string;
}

export const experienceVariants: Variants = {
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

export const experienceCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const experienceIconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2
    }
  }
};
