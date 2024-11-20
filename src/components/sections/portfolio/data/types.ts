export enum ProjectCategory {
  ALL = 'all',
  WEB = 'web',
  TECHNICAL = 'technical',
  DESIGN = 'design',
  INDUSTRIAL_EQUIPMENT = 'industrial_equipment',
  KITCHEN_EQUIPMENT = 'kitchen_equipment',
  MANAGEMENT = 'management',
  EDUCATION = 'education',
  DEMO = 'demo',
  VIDEO = 'video',
  AUTOCAD = 'autocad'
}

export enum ProjectType {
  WEB_APP = 'Web App',
  TECHNICAL_DESIGN = 'Technical Design',
  INDUSTRIAL_DESIGN = 'Industrial Design',
  DESIGN = 'Design',
  MANAGEMENT = 'Management',
  EDUCATION = 'Education',
  DEMO = 'Demo',
  VIDEO = 'Video',
  AUTOCAD = 'AutoCAD'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  type: ProjectType;
  image: string;
  images?: string[];
  thumbnail?: string;
  gallery?: string[];
  technologies: string[];
  link?: string;
  github?: string;
  demo?: string;
  demoLink?: string;
  pdfUrl?: string;
  featured?: boolean;
  role?: string;
  company?: string;
  date?: string;
  status?: string;
  location?: string;
  team?: string;
  responsibilities?: string[];
  achievements?: string[];
  skills?: string[];
  tools?: string[];
  challenges?: string[];
  solutions?: string[];
  lessons?: string[];
  testimonials?: string[];
  awards?: string[];
  publications?: string[];
  patents?: string[];
  certifications?: string[];
  presentations?: string[];
  media?: string[];
  videos?: string[];
  documents?: string[];
  resources?: string[];
}

export interface Certificate {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface CertificateCategory {
  id: string;
  name: string;
  description: string;
}

export interface ProjectsData {
  featured: Project[];
  all: Project[];
}
