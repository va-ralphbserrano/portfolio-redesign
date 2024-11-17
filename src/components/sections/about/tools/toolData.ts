import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiDocker,
  SiAmazonaws,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiAdobexd,
  SiAdobephotoshop,
  SiVisualstudiocode,
  SiPostman
} from 'react-icons/si';
import type { ToolCategory } from './types';

export const toolCategories: ToolCategory[] = [
  {
    name: 'Frontend Development',
    tools: [
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
      { name: 'React', icon: SiReact, color: 'text-cyan-400' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-900 dark:text-white' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' }
    ]
  },
  {
    name: 'Backend Development',
    tools: [
      { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
      { name: 'Express', icon: SiExpress, color: 'text-gray-900 dark:text-white' },
      { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
      { name: 'Prisma', icon: SiPrisma, color: 'text-gray-900 dark:text-white' }
    ]
  },
  {
    name: 'DevOps & Tools',
    tools: [
      { name: 'Git', icon: SiGit, color: 'text-orange-500' },
      { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
      { name: 'AWS', icon: SiAmazonaws, color: 'text-orange-400' },
      { name: 'Vercel', icon: SiVercel, color: 'text-gray-900 dark:text-white' },
      { name: 'Netlify', icon: SiNetlify, color: 'text-cyan-500' }
    ]
  },
  {
    name: 'Design & Prototyping',
    tools: [
      { name: 'Figma', icon: SiFigma, color: 'text-purple-500' },
      { name: 'Adobe XD', icon: SiAdobexd, color: 'text-pink-500' },
      { name: 'Photoshop', icon: SiAdobephotoshop, color: 'text-blue-600' }
    ]
  },
  {
    name: 'Development Tools',
    tools: [
      { name: 'VS Code', icon: SiVisualstudiocode, color: 'text-blue-500' },
      { name: 'Postman', icon: SiPostman, color: 'text-orange-500' }
    ]
  }
];
