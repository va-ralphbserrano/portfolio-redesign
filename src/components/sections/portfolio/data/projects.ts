import { Project, ProjectCategory, ProjectType } from '@/types/project';
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
  diceRollerImg,
  conveyorFrameA2,
  conveyorFrameB1,
  conveyorFrameB2,
  conveyorFrameB3,
  conveyorFrameC2,
  kitchenHoodFinal,
  pressureTank500L,
  steelGrates650mm,
  mobileStoreLayout1,
  thawingRackClark
} from './images';

// Technical Engineering Projects
const technicalProjects: Project[] = [
  {
    id: 'tech-conveyor',
    title: 'Conveyor System Design',
    category: ProjectCategory.TECHNICAL,
    image: conveyorFrameB1,
    thumbnail: conveyorFrameB1,
    description: 'Complete conveyor system design including frame assemblies and detailed engineering drawings',
    technologies: ['AutoCAD', 'Mechanical Design', 'Industrial Equipment'],
    type: ProjectType.TECHNICAL_DESIGN,
    gallery: [
      conveyorFrameA2,
      conveyorFrameB1,
      conveyorFrameB2,
      conveyorFrameB3,
      conveyorFrameC2
    ],
    date: '2023',
    featured: false
  },
  {
    id: 'tech-1',
    title: 'Kitchen Equipment Design',
    category: ProjectCategory.KITCHEN_EQUIPMENT,
    image: kitchenHoodFinal,
    description: 'Professional kitchen equipment designs including hoods, racks, and dishwashing systems',
    technologies: ['AutoCAD', 'Mechanical Design', 'Kitchen Equipment'],
    type: ProjectType.TECHNICAL_DESIGN,
    date: '2023',
    featured: false
  },
  {
    id: 'tech-2',
    title: 'Industrial Equipment',
    category: ProjectCategory.TECHNICAL,
    image: pressureTank500L,
    description: 'Industrial equipment designs including pressure tanks and pipe assemblies',
    technologies: ['AutoCAD', 'Industrial Design', 'Equipment Engineering'],
    type: ProjectType.TECHNICAL_DESIGN,
    date: '2023',
    featured: false
  },
  {
    id: 'tech-3',
    title: 'Steel Fabrication',
    category: ProjectCategory.TECHNICAL,
    image: steelGrates650mm,
    description: 'Steel fabrication designs including grilles, grates, and custom metal work',
    technologies: ['AutoCAD', 'Steel Fabrication', 'Metal Work'],
    type: ProjectType.TECHNICAL_DESIGN,
    date: '2023',
    featured: false
  },
  {
    id: 'tech-4',
    title: 'Mobile Store Design',
    category: ProjectCategory.TECHNICAL,
    image: mobileStoreLayout1,
    description: 'Complete mobile store layout and design project',
    technologies: ['AutoCAD', 'Store Design', 'Layout Planning'],
    type: ProjectType.TECHNICAL_DESIGN,
    date: '2023',
    featured: false
  },
  {
    id: 'tech-5',
    title: 'Custom Racks',
    category: ProjectCategory.TECHNICAL,
    image: thawingRackClark,
    description: 'Custom rack designs for various industrial and commercial applications',
    technologies: ['AutoCAD', 'Custom Design', 'Industrial Storage'],
    type: ProjectType.TECHNICAL_DESIGN,
    date: '2023',
    featured: false
  },
  {
    id: 'solar-inverter',
    title: 'Solar Inverter Installation',
    description: 'Design and installation of a solar inverter system...',
    category: ProjectCategory.TECHNICAL,
    type: ProjectType.TECHNICAL_DESIGN,
    image: '/images/projects/solar-inverter/main.jpg',
    gallery: [
      '/images/projects/solar-inverter/1.jpg',
      '/images/projects/solar-inverter/2.jpg',
      '/images/projects/solar-inverter/3.jpg'
    ],
    technologies: ['AutoCAD', 'Solar Power', 'Electrical Systems'],
    demoLink: 'https://example.com/demo',
    date: '2023',
    featured: true,
    role: 'Lead Designer',
    company: 'Solar Solutions Inc.',
    location: 'California',
    responsibilities: [
      'System design',
      'Installation oversight',
      'Testing and commissioning'
    ]
  }
];

export const projects: Project[] = [
  ...technicalProjects,
  {
    id: "1",
    title: "AutoCAD Design",
    category: ProjectCategory.AUTOCAD,
    image: portfolio1,
    description: "AutoCAD design project showcasing technical drawing skills.",
    technologies: ["AutoCAD", "Technical Drawing"],
    type: ProjectType.AUTOCAD,
    date: "2023",
    featured: true
  },
  {
    id: "2",
    title: "Video Editing",
    category: ProjectCategory.VIDEO,
    image: portfolio2,
    description: 'Professional Video Editing',
    technologies: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Video Editing'],
    demoLink: 'https://drive.google.com/drive/folders/1Ue6rSxuLFgVVZ4uBq1Z_FgF8zB9VQBG1?usp=sharing',
    type: ProjectType.VIDEO,
    date: '2023',
    featured: false
  },
  {
    id: "3",
    title: "Email Management",
    category: ProjectCategory.MANAGEMENT,
    image: portfolio3,
    description: 'Professional Email Management',
    technologies: ['Email', 'Communication', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1JoEhK9qMKWN6E0hZcGBQf9hy_4BLc0Aq?usp=sharing',
    type: ProjectType.MANAGEMENT,
    date: '2023',
    featured: false
  },
  {
    id: "4",
    title: "Data Entry",
    category: ProjectCategory.MANAGEMENT,
    image: portfolio4,
    description: 'Professional Data Entry',
    technologies: ['Excel', 'Google Sheets', 'Data Management'],
    demoLink: 'https://drive.google.com/drive/folders/1RFxUz5H-Tk4RHxm-BgylU-I3H4FRBy_B?usp=sharing',
    type: ProjectType.MANAGEMENT,
    date: '2023',
    featured: false
  },
  {
    id: "5",
    title: "Project Management",
    category: ProjectCategory.MANAGEMENT,
    image: portfolio5,
    description: 'Project Management with Trello',
    technologies: ['Trello', 'Project Management', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1Fh69DgwzEqQnxiKRVe1tcVdGDdqC3Ue0?usp=sharing',
    type: ProjectType.MANAGEMENT,
    date: '2023',
    featured: false
  },
  {
    id: "6",
    title: "Calendar Management",
    category: ProjectCategory.MANAGEMENT,
    image: portfolio6,
    description: 'Travel/Calendar Management and Appointment Setting',
    technologies: ['Calendar', 'Scheduling', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1XEGWaVMGvh1O-NnxmJydV0KIOsChHlLm?usp=sharing',
    type: ProjectType.MANAGEMENT,
    date: '2023',
    featured: false
  },
  {
    id: "7",
    title: "Content Creation",
    category: ProjectCategory.DESIGN,
    image: portfolio7,
    description: 'Professional Content Creation',
    technologies: ['Content Writing', 'Design', 'Social Media'],
    demoLink: 'https://drive.google.com/drive/folders/19x3cIw20fqqhX73ZV83eEMueysmgswBK?usp=sharing',
    type: ProjectType.DESIGN,
    date: '2023',
    featured: false
  },
  {
    id: "8",
    title: "Apprenticeship",
    category: ProjectCategory.EDUCATION,
    image: portfolio8,
    description: 'Executive Assistant Apprenticeship Program',
    technologies: ['Virtual Assistance', 'Management', 'Organization'],
    demoLink: 'https://drive.google.com/drive/folders/1vr3zsSHroynxjWyIkpqRSlt1raSJSFg-?usp=sharing',
    type: ProjectType.EDUCATION,
    date: '2023',
    featured: false
  },
  {
    id: "9",
    title: "MVA Course",
    category: ProjectCategory.EDUCATION,
    image: portfolio9,
    description: 'MVA Class Course Completion',
    technologies: ['Virtual Assistance', 'Management', 'Skills'],
    demoLink: 'https://drive.google.com/drive/folders/10vyiRW-F4qs1tsydPxiHhHpWJbEHxfDH?usp=sharing',
    type: ProjectType.EDUCATION,
    date: '2023',
    featured: false
  },
  {
    id: "10",
    title: "Dice Roller",
    category: ProjectCategory.DEMO,
    image: diceRollerImg,
    description: 'Random Dice Roller Web Application',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    demoLink: 'https://va-ralphbserrano.github.io/randomDice/',
    github: 'https://github.com/va-ralphbserrano/randomDice',
    type: ProjectType.WEB_APP,
    date: '2023',
    featured: false
  },
  {
    id: "11",
    title: "Old Portfolio",
    category: ProjectCategory.WEB,
    image: portfolio10,
    description: 'My Previous Portfolio Website',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    demoLink: 'https://va-ralphbserrano.github.io/portfolio/',
    github: 'https://github.com/va-ralphbserrano/portfolio',
    type: ProjectType.WEB_APP,
    date: '2023',
    featured: false
  }
];

export const featuredProjects = projects.filter(project => project.featured);

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  if (category === ProjectCategory.ALL) {
    return projects;
  }
  return projects.filter(project => project.category === category);
};
