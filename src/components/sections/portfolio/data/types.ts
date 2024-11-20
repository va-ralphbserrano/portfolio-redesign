export enum ProjectCategory {
  ALL = 'all',
  WEB = 'web',
  TECHNICAL = 'technical',
  DESIGN = 'design',
  MANAGEMENT = 'management',
  EDUCATION = 'education',
  DEMO = 'demo',
  AUTOCAD = 'autocad',
  VIDEO = 'video',
  INVENTOR = 'inventor',
  VIRTUAL_ASSISTANT = 'virtual_assistant',
  KITCHEN_EQUIPMENT = 'kitchen_equipment'
}

export enum ProjectType {
  WEB_APP = 'Web App',
  TECHNICAL_DESIGN = 'Technical Design',
  DESIGN = 'Design',
  MANAGEMENT = 'Management',
  EDUCATION = 'Education',
  VIDEO = 'Video'
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
  pdfUrl?: string;
  type: ProjectType;
  github?: string;
  tags?: string[];
  gallery?: string[];
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
