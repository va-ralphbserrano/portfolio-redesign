export enum ProjectCategory {
  ALL = 'All Projects',
  WEB_DEVELOPMENT = 'Web Development',
  VIRTUAL_ASSISTANCE = 'Virtual Assistant Services',
  PROJECT_MANAGEMENT = 'Project Management',
  CONTENT_CREATION = 'Content Creation',
  PROFESSIONAL_DEVELOPMENT = 'Professional Development'
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
  type: ProjectType;
  description: string;
  technologies: string[];
  image: string;
  gallery?: string[];
  imageLabels?: string[];  // Labels for main image and gallery images
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  specs?: string[];
  features?: string[];
  timeline?: string;
  date?: string;
  longDescription?: string;  // Detailed description for the modal
  role?: string;            // Your role in the project
  team?: string[];          // Team members if applicable
  challenges?: string[];    // Key challenges faced
  outcomes?: string[];      // Project outcomes/achievements
  testimonials?: {          // Client/user testimonials
    text: string;
    author: string;
    role?: string;
  }[];
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
