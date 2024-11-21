import { WithClassName } from '@/types/component';
import { ProjectCategory, ProjectType, type Project } from '@/types/project';

export type { Project, ProjectCategory, ProjectType };

export interface ProjectImages {
  main: string;
  gallery?: string[];
}

export interface ProjectDetails {
  specs?: string[];
  features?: string[];
  timeline?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
  image?: string;
}

export interface CertificateCategory {
  id: string;
  name: string;
  description: string;
}

export interface ProjectCardProps extends WithClassName {
  title: string;
  description: string;
  type: ProjectType;
  technologies: string[];
  imageUrl: string;
}

export interface PortfolioProps extends WithClassName {
  category?: ProjectCategory;
  projects?: Project[];
  initialCategory?: ProjectCategory;
  showFilters?: boolean;
  gridColumns?: 1 | 2 | 3;
  animationConfig?: {
    staggerDelay?: number;
    duration?: number;
    ease?: string;
  };
}

export interface ProjectFilterProps extends WithClassName {
  categories: readonly { id: ProjectCategory; label: string }[];
  selectedCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export const portfolioItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
