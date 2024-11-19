import { WithClassName } from '@/types/component';

export enum ProjectCategory {
  ALL = 'all',
  TECHNICAL = 'technical',
  KITCHEN = 'kitchen',
  INDUSTRIAL = 'industrial',
  STORAGE = 'storage',
  FABRICATION = 'fabrication',
  CONSTRUCTION = 'construction',
  COMMERCIAL = 'commercial',
  WEB = 'web',
  DESIGN = 'design',
  MANAGEMENT = 'management',
  EDUCATION = 'education',
  DEMO = 'demo',
  AUTOCAD = 'autocad',
  INVENTOR = 'inventor',
  VIDEO = 'video'
}

export enum ProjectType {
  FEATURED = 'featured',
  STANDARD = 'standard',
  TECHNICAL_DESIGN = 'Technical Design',
  MANAGEMENT = 'Management',
  DESIGN = 'Design',
  EDUCATION = 'Education',
  WEB_APP = 'Web App',
  CERTIFICATION = 'certification'
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  thumbnail?: string | undefined;
  category: ProjectCategory;
  subcategory?: string | undefined;
  technologies: string[];
  link?: string | undefined;
  github?: string | undefined;
  tags?: string[] | undefined;
  demoLink?: string | undefined;
  codeLink?: string | undefined;
  type?: ProjectType | undefined;
  images?: {
    main: string;
    gallery?: string[];
  } | undefined;
  details?: {
    specs?: string[] | undefined;
    features?: string[] | undefined;
    timeline?: string | undefined;
  } | undefined;
  pdfUrl?: string | undefined;
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
  id?: string;
  title: string;
  issuer: string;
  date: string;
  category: 'certification' | 'education' | 'professional';
  description?: string;
  image?: string;
  link?: string;
}

export interface ProjectCardProps extends WithClassName {
  project: Project;
  index: number;
  variants?: any;
  onClick?: () => void;
}

export interface PortfolioProps extends WithClassName {
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
