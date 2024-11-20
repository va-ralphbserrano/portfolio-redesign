export enum ProjectCategory {
  ALL = 'all',
  WEB = 'web',
  TECHNICAL = 'technical',
  DESIGN = 'design',
  INDUSTRIAL_EQUIPMENT = 'industrial_equipment'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  date: string;
  featured: boolean;
  highlights?: string[];
}

export interface ProjectFilter {
  category?: ProjectCategory;
  search?: string;
}

export interface ProjectSortOptions {
  field: keyof Project;
  direction: 'asc' | 'desc';
}

export interface ProjectViewOptions {
  filter?: ProjectFilter;
  sort?: ProjectSortOptions;
  limit?: number;
  offset?: number;
}

export interface ProjectsData {
  featured: Project[];
  all: Project[];
}
