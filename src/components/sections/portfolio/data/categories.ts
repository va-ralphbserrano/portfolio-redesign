import { ProjectCategory, CertificateCategory } from './types';

export const projectCategories: ProjectCategory[] = [
  {
    id: 'autocad',
    name: 'AutoCAD',
    description: 'Mechanical design and technical drawings'
  },
  {
    id: 'video',
    name: 'Video',
    description: 'Professional video editing and production'
  },
  {
    id: 'management',
    name: 'Management',
    description: 'Project, data, and resource management'
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Content creation and design work'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Professional certifications and courses'
  },
  {
    id: 'web',
    name: 'Web',
    description: 'Web development projects'
  },
  {
    id: 'demo',
    name: 'Demo',
    description: 'Demo projects and prototypes'
  }
];

export const certificateCategories: CertificateCategory[] = [
  {
    id: 'certification',
    name: 'Certifications',
    description: 'Professional certifications and course completions'
  },
  {
    id: 'achievement',
    name: 'Achievements',
    description: 'Awards and special recognitions'
  }
];
