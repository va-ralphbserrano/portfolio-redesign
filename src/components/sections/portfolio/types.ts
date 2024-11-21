import { WithClassName } from '@/types/component';
import { ProjectCategory, ProjectType } from '@/types/project';

export enum ProjectCategory {
  ALL = 'all',
  TECHNICAL = 'technical',
  WEB = 'web',
  DESIGN = 'design',
  MANAGEMENT = 'management',
  EDUCATION = 'education',
  DEMO = 'demo',
  VIRTUAL_ASSISTANT = 'virtual_assistant',
  KITCHEN_EQUIPMENT = 'kitchen_equipment',
  INDUSTRIAL_EQUIPMENT = 'industrial_equipment',
  COMMERCIAL = 'commercial',
  CONSTRUCTION = 'construction',
  UTILITIES = 'utilities',
  COMPONENTS = 'components',
  FOOD_SERVICE = 'food_service',
  STORAGE = 'storage',
  MANUFACTURING = 'manufacturing'
}

export enum ProjectType {
  WEB_DESIGN = 'Web Design',
  WEB_APP = 'Web Application',
  TECHNICAL_DESIGN = 'Technical Design',
  VIRTUAL_ASSISTANT = 'Virtual Assistant',
  MANAGEMENT = 'Management',
  DESIGN = 'Design',
  VIDEO = 'Video',
  EDUCATION = 'Education'
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  subcategory?: string;
  image: string;
  thumbnail?: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
  type: ProjectType;
  gallery?: string[];
  github?: string;
  pdfUrl?: string;
}

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
  setSelectedCategory: (category: ProjectCategory) => void;
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
