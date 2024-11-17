export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  demoLink: string;
  codeLink?: string;
  type: string;
}

export interface Certificate {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
}

export interface CertificateCategory {
  id: string;
  name: string;
  description: string;
}

export type ProjectType = 'Design' | 'Video' | 'Management' | 'Education' | 'Web App';
