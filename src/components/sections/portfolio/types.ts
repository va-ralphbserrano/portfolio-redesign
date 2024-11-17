import { WithClassName } from '@/types/component';

export type ProjectCategory = 'all' | 'autocad' | 'video' | 'management' | 'design' | 'education' | 'web' | 'demo';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  technologies: readonly string[];
  demoLink?: string;
  codeLink?: string;
  type: string;
  featured?: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  image: string;
  description: string;
  category: 'certification';
  issuer: string;
  date: string;
  url?: string;
}

export interface ProjectCardProps extends WithClassName {
  project: Project;
}

export interface ProjectFilterProps extends WithClassName {
  categories: readonly ProjectCategory[];
  selectedCategory: ProjectCategory;
  setSelectedCategory: (category: ProjectCategory) => void;
}

export interface PortfolioProps extends WithClassName {
  className?: string;
}

export const portfolioItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
