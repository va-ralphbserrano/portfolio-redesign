// This file is auto-generated. Do not edit manually.
import { Project, ProjectCategory } from '@/components/sections/portfolio/types';
import { getImageUrl, getPdfUrl } from '@/utils/paths';

// Import portfolio images
import portfolio1 from '@/assets/images/portfolio/portfolio-1.png';
import portfolio2 from '@/assets/images/portfolio/portfolio-2.png';
import portfolio3 from '@/assets/images/portfolio/portfolio-3.png';
import portfolio4 from '@/assets/images/portfolio/portfolio-4.png';
import portfolio5 from '@/assets/images/portfolio/portfolio-5.png';
import portfolio6 from '@/assets/images/portfolio/portfolio-6.png';
import portfolio7 from '@/assets/images/portfolio/portfolio-7.png';
import portfolio8 from '@/assets/images/portfolio/portfolio-8.png';
import portfolio9 from '@/assets/images/portfolio/portfolio-9.png';
import portfolio10 from '@/assets/images/portfolio/portfolio-10.png';
import diceRoller from '@/assets/images/projects/diceroller.png';

// Define available categories
export const categories = [
  'all',
  'autocad',
  'inventor',
  'web',
  'management',
  'design',
  'education',
  'demo'
] as const;

// Normalize project paths
function normalizeProjectPaths(project: Project): Project {
  return {
    ...project,
    thumbnail: project.thumbnail ? getImageUrl(project.thumbnail) : undefined,
    pdfUrl: project.pdfUrl ? getPdfUrl(project.pdfUrl) : undefined
  };
}

export const projects: Project[] = [
  // Web Projects
  {
    id: "web-1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React, TypeScript, and Tailwind CSS",
    image: portfolio1,
    category: "web",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoLink: "https://example.com/portfolio",
    codeLink: "https://github.com/example/portfolio"
  },
  {
    id: "web-2",
    title: "E-commerce Dashboard",
    description: "A responsive dashboard for managing online store operations",
    image: portfolio2,
    category: "web",
    technologies: ["React", "Redux", "Material UI", "Chart.js"],
    demoLink: "https://example.com/dashboard",
    codeLink: "https://github.com/example/dashboard"
  },
  {
    id: "web-3",
    title: "Dice Roller App",
    description: "Interactive dice rolling application with animations",
    image: diceRoller,
    category: "web",
    technologies: ["React", "JavaScript", "CSS", "Animation"],
    demoLink: "https://example.com/dice-roller",
    codeLink: "https://github.com/example/dice-roller"
  },
  {
    id: "web-4",
    title: "Analytics Platform",
    description: "Data visualization and analytics platform with real-time updates",
    image: portfolio3,
    category: "web",
    technologies: ["React", "D3.js", "WebSocket", "Node.js"],
    demoLink: "https://example.com/analytics",
    codeLink: "https://github.com/example/analytics"
  },
  // Design Projects
  {
    id: "design-1",
    title: "Brand Identity Design",
    description: "Complete brand identity design including logo, color palette, and style guide",
    image: portfolio4,
    category: "design",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Brand Design"]
  },
  {
    id: "design-2",
    title: "UI/UX Design System",
    description: "Comprehensive design system for web and mobile applications",
    image: portfolio5,
    category: "design",
    technologies: ["Figma", "UI Design", "Design Systems"]
  },
  {
    id: "design-3",
    title: "Mobile App Design",
    description: "Modern mobile application interface design with user-centric approach",
    image: portfolio6,
    category: "design",
    technologies: ["Mobile Design", "UI/UX", "Prototyping"]
  },
  {
    id: "design-4",
    title: "Product Landing Page",
    description: "Conversion-focused landing page design for SaaS product",
    image: portfolio7,
    category: "design",
    technologies: ["Web Design", "UI/UX", "Conversion Optimization"]
  },
  {
    id: "design-5",
    title: "Social Media Campaign",
    description: "Cohesive social media campaign design across multiple platforms",
    image: portfolio8,
    category: "design",
    technologies: ["Social Media Design", "Marketing", "Brand Design"]
  },
  {
    id: "design-6",
    title: "Email Newsletter Template",
    description: "Responsive email newsletter design with modular components",
    image: portfolio9,
    category: "design",
    technologies: ["Email Design", "HTML Email", "Marketing Design"]
  },
  {
    id: "design-7",
    title: "Digital Magazine Layout",
    description: "Interactive digital magazine layout with dynamic content",
    image: portfolio10,
    category: "design",
    technologies: ["Editorial Design", "Digital Publishing", "Interactive Design"]
  }
];

// Helper function to get projects by category
export function getProjectsByCategory(category: ProjectCategory) {
  const normalizedProjects = projects.map(normalizeProjectPaths);
  if (category === 'all') return normalizedProjects;
  return normalizedProjects.filter(project => project.category === category);
}

// Helper function to get unique tags
export function getUniqueTags() {
  const allTags = projects.flatMap(project => project.tags || []);
  return [...new Set(allTags)];
}

// Helper function to get web and design projects
export function getPortfolioProjects() {
  return getProjectsByCategory('web').concat(getProjectsByCategory('design'));
}

// Helper function to get technical projects
export function getTechnicalProjects() {
  return getProjectsByCategory('autocad').concat(getProjectsByCategory('inventor'));
}
