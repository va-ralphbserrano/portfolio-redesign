export interface Technology {
  name: string;
  icon?: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  sourceUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'other';
  startDate?: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'planned';
}
