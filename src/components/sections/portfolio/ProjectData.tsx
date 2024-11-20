import { Project, Certificate, ProjectCategory, ProjectType } from './types';

// Import portfolio images
import portfolio1 from '@/assets/images/portfolio/portfolio-1.png';
import portfolio2 from '@/assets/images/portfolio/portfolio-2.png';

// Import certificate images
import cert1 from '@/assets/images/certificate/executive-assistant.png';
import cert2 from '@/assets/images/certificate/virtual-assistant.png';
import cert5 from '@/assets/images/certificate/amazon-va.png';
import cert6 from '@/assets/images/certificate/content-marketing.png';

export const categories: { id: ProjectCategory; label: string }[] = [
  { id: ProjectCategory.ALL, label: 'All' },
  { id: ProjectCategory.TECHNICAL, label: 'Technical' },
  { id: ProjectCategory.WEB, label: 'Web' },
  { id: ProjectCategory.DESIGN, label: 'Design' },
  { id: ProjectCategory.MANAGEMENT, label: 'Management' },
  { id: ProjectCategory.EDUCATION, label: 'Education' },
  { id: ProjectCategory.DEMO, label: 'Demo' }
];

export const projects: readonly Project[] = [
  {
    id: "1",
    title: "Technical Project 1",
    category: ProjectCategory.TECHNICAL,
    image: "/images/projects/technical/project1.jpg",
    description: "Technical engineering project with detailed specifications",
    technologies: ["AutoCAD", "SolidWorks", "Technical Drawing"],
    type: ProjectType.TECHNICAL_DESIGN
  },
  {
    id: "2",
    title: "Web Development Project",
    category: ProjectCategory.WEB,
    image: "/images/projects/web/project1.jpg",
    description: "Modern web application with responsive design",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    type: ProjectType.WEB_APP
  },
  {
    id: "3",
    title: "Design Project",
    category: ProjectCategory.DESIGN,
    image: "/images/projects/design/project1.jpg",
    description: "Creative design project",
    technologies: ["Photoshop", "Illustrator"],
    type: ProjectType.DESIGN
  },
  {
    id: "4",
    title: "Management Project",
    category: ProjectCategory.MANAGEMENT,
    image: "/images/projects/management/project1.jpg",
    description: "Project management case study",
    technologies: ["Project Management", "Agile", "Scrum"],
    type: ProjectType.MANAGEMENT
  },
  {
    id: "5",
    title: 'Executive Assistant Apprenticeship',
    image: portfolio1,
    description: 'Virtual Assistant Training and Certification',
    category: ProjectCategory.EDUCATION,
    technologies: ['Project Management', 'Communication', 'Organization'],
    type: 'certification' as ProjectType
  },
  {
    id: "6",
    title: 'Virtual Assistant Masterclass',
    image: portfolio2,
    description: 'Advanced Virtual Assistant Skills',
    category: ProjectCategory.EDUCATION,
    technologies: ['Client Management', 'Time Management', 'Tools'],
    type: 'certification' as ProjectType
  }
];

export const certificates: readonly Certificate[] = [
  {
    id: "1",
    title: 'Executive Assistant Certification',
    image: cert1,
    description: 'Professional Executive Assistant Training',
    category: 'certification',
    issuer: 'Executive Training Institute',
    date: '2023-01-15'
  },
  {
    id: "2",
    title: 'Virtual Assistant Professional',
    image: cert2,
    description: 'Advanced Virtual Assistant Skills',
    category: 'certification',
    issuer: 'VA Institute',
    date: '2024'
  },
  {
    id: "3",
    title: 'Amazon Virtual Assistant',
    image: cert5,
    description: 'Amazon VA Specialization',
    category: 'certification',
    issuer: 'Amazon VA Academy',
    date: '2024'
  },
  {
    id: "4",
    title: 'Content Marketing Strategy',
    image: cert6,
    description: 'Content Marketing and Strategy',
    category: 'certification',
    issuer: 'Digital Marketing Institute',
    date: '2024'
  }
];

export default {
  projects,
  certificates,
  categories
};
