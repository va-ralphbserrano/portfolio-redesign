import { Project } from './types';
import {
  portfolio1,
  portfolio2,
  portfolio3,
  portfolio4,
  portfolio5,
  portfolio6,
  portfolio7,
  portfolio8,
  portfolio9,
  portfolio10,
  diceRollerImg
} from './images';

// Technical Engineering Projects
const technicalProjects: Project[] = [
  {
    id: 'tech-1',
    title: 'Kitchen Equipment Design',
    category: 'technical',
    image: '/images/projects/Kitchen Hood Final.png',
    thumbnail: '/images/projects/Kitchen Hood Final.png',
    description: 'Professional kitchen equipment designs including hoods, racks, and dishwashing systems',
    technologies: ['AutoCAD', 'Mechanical Design', 'Kitchen Equipment'],
    type: 'Technical Design'
  },
  {
    id: 'tech-2',
    title: 'Industrial Equipment',
    category: 'technical',
    image: '/images/projects/Pressure Tank 500L 3mm,5mm T.png',
    thumbnail: '/images/projects/Pressure Tank 500L 3mm,5mm T.png',
    description: 'Industrial equipment designs including pressure tanks and pipe assemblies',
    technologies: ['AutoCAD', 'Industrial Design', 'Equipment Engineering'],
    type: 'Technical Design'
  },
  {
    id: 'tech-3',
    title: 'Steel Fabrication',
    category: 'technical',
    image: '/images/projects/650mm Steel Grates.png',
    thumbnail: '/images/projects/650mm Steel Grates.png',
    description: 'Steel fabrication designs including grilles, grates, and custom metal work',
    technologies: ['AutoCAD', 'Steel Fabrication', 'Metal Work'],
    type: 'Technical Design'
  },
  {
    id: 'tech-4',
    title: 'Mobile Store Design',
    category: 'technical',
    image: '/images/projects/MOBILE-STORE-Layout1.png',
    thumbnail: '/images/projects/MOBILE-STORE-Layout1.png',
    description: 'Complete mobile store layout and design project',
    technologies: ['AutoCAD', 'Store Design', 'Layout Planning'],
    type: 'Technical Design'
  },
  {
    id: 'tech-5',
    title: 'Custom Racks',
    category: 'technical',
    image: '/images/projects/Thawing Rack Clark.png',
    thumbnail: '/images/projects/Thawing Rack Clark.png',
    description: 'Custom rack designs for various industrial and commercial applications',
    technologies: ['AutoCAD', 'Custom Design', 'Industrial Storage'],
    type: 'Technical Design'
  }
];

export const projects: Project[] = [
  ...technicalProjects,
  {
    id: 1,
    title: 'AutoCAD Design',
    category: 'autocad',
    image: portfolio1,
    description: 'Mechanical Design and Drawing',
    technologies: ['AutoCAD', 'Mechanical Drawing', 'Design'],
    demoLink: 'https://drive.google.com/drive/folders/1YFXO-XOFCdXZHZ5SXBkQqwQDaZ_RPtYH?usp=sharing',
    type: 'Design'
  },
  {
    id: 2,
    title: 'Video Editing',
    category: 'video',
    image: portfolio2,
    description: 'Professional Video Editing',
    technologies: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Video Editing'],
    demoLink: 'https://drive.google.com/drive/folders/1Ue6rSxuLFgVVZ4uBq1Z_FgF8zB9VQBG1?usp=sharing',
    type: 'Video'
  },
  {
    id: 3,
    title: 'Email Management',
    category: 'management',
    image: portfolio3,
    description: 'Professional Email Management',
    technologies: ['Email', 'Communication', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1JoEhK9qMKWN6E0hZcGBQf9hy_4BLc0Aq?usp=sharing',
    type: 'Management'
  },
  {
    id: 4,
    title: 'Data Entry',
    category: 'management',
    image: portfolio4,
    description: 'Professional Data Entry',
    technologies: ['Excel', 'Google Sheets', 'Data Management'],
    demoLink: 'https://drive.google.com/drive/folders/1RFxUz5H-Tk4RHxm-BgylU-I3H4FRBy_B?usp=sharing',
    type: 'Management'
  },
  {
    id: 5,
    title: 'Project Management',
    category: 'management',
    image: portfolio5,
    description: 'Project Management with Trello',
    technologies: ['Trello', 'Project Management', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1Fh69DgwzEqQnxiKRVe1tcVdGDdqC3Ue0?usp=sharing',
    type: 'Management'
  },
  {
    id: 6,
    title: 'Calendar Management',
    category: 'management',
    image: portfolio6,
    description: 'Travel/Calendar Management and Appointment Setting',
    technologies: ['Calendar', 'Scheduling', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1XEGWaVMGvh1O-NnxmJydV0KIOsChHlLm?usp=sharing',
    type: 'Management'
  },
  {
    id: 7,
    title: 'Content Creation',
    category: 'design',
    image: portfolio7,
    description: 'Professional Content Creation',
    technologies: ['Content Writing', 'Design', 'Social Media'],
    demoLink: 'https://drive.google.com/drive/folders/19x3cIw20fqqhX73ZV83eEMueysmgswBK?usp=sharing',
    type: 'Design'
  },
  {
    id: 8,
    title: 'Apprenticeship',
    category: 'education',
    image: portfolio8,
    description: 'Executive Assistant Apprenticeship Program',
    technologies: ['Virtual Assistance', 'Management', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1vr3zsSHroynxjWyIkpqRSlt1raSJSFg-?usp=sharing',
    type: 'Education'
  },
  {
    id: 9,
    title: 'MVA Course',
    category: 'education',
    image: portfolio9,
    description: 'MVA Class Course Completion',
    technologies: ['Virtual Assistance', 'Management', 'Skills'],
    demoLink: 'https://drive.google.com/drive/folders/10vyiRW-F4qs1tsydPxiHhHpWJbEHxfDH?usp=sharing',
    type: 'Education'
  },
  {
    id: 10,
    title: 'Dice Roller',
    category: 'demo',
    image: diceRollerImg,
    description: 'Random Dice Roller Web Application',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    demoLink: 'https://va-ralphbserrano.github.io/randomDice/',
    codeLink: 'https://github.com/va-ralphbserrano/randomDice',
    type: 'Web App'
  },
  {
    id: 11,
    title: 'Old Portfolio',
    category: 'web',
    image: portfolio10,
    description: 'My Previous Portfolio Website',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    demoLink: 'https://va-ralphbserrano.github.io/myportfolio/',
    codeLink: 'https://github.com/va-ralphbserrano/myportfolio',
    type: 'Web App'
  }
];
