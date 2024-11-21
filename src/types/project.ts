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
  MANUFACTURING = 'manufacturing',
  VIDEO = 'video',
  AUTOCAD = 'autocad'
}

export enum ProjectType {
  WEB_DESIGN = 'Web Design',
  WEB_APP = 'Web Application',
  TECHNICAL_DESIGN = 'Technical Design',
  VIRTUAL_ASSISTANT = 'Virtual Assistant',
  MANAGEMENT = 'Management',
  DESIGN = 'Design',
  VIDEO = 'Video',
  EDUCATION = 'Education',
  INDUSTRIAL_DESIGN = 'Industrial Design',
  DEMO = 'Demo',
  AUTOCAD = 'AutoCAD'
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  technologies: string[];
  type: ProjectType;
  githubUrl?: string;
  demoUrl?: string;
  date: string;
  featured: boolean;
  highlights?: string[];
  gallery?: string[];
  thumbnail?: string;
  demoLink?: string;
  subcategory?: string;
}

export interface Certificate {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  issuer: string;
  date: string;
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
