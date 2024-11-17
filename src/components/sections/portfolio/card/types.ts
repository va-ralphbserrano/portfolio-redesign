import { IconType } from 'react-icons';
import { Variants } from 'framer-motion';
import { WithClassName } from '@/types/component';

export interface Technology {
  name: string;
  icon: IconType;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  demoUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface ProjectCardProps extends WithClassName {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface ProjectImageProps extends WithClassName {
  src: string;
  alt: string;
}

export interface ProjectDetailsProps extends WithClassName {
  title: string;
  description: string;
  technologies: string[];
}

export interface ProjectActionsProps extends WithClassName {
  demoUrl?: string;
  githubUrl?: string;
}

export interface ProjectTechnologiesProps extends WithClassName {
  technologies: string[];
}

export const projectCardVariants: Variants = {
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
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

export const projectImageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};

export const projectDetailsVariants: Variants = {
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
  }
};

export const projectTechVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

export const projectActionVariants: Variants = {
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
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};
