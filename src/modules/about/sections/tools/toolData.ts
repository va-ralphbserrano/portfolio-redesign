import { IconType } from 'react-icons';
import {
  SiAutodesk,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiCanva,
  SiFigma,
  SiVisualstudiocode,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiMicrosoftoffice,
  SiGoogle,
  SiSlack,
  SiTrello,
  SiAsana,
  SiNotion
} from 'react-icons/si';
import { FaFilm } from 'react-icons/fa';
import { Tool } from './types';

export const tools: Tool[] = [
  {
    name: 'AutoCAD',
    icon: SiAutodesk,
    color: '#E51E25',
    category: 'Design & Media'
  },
  {
    name: 'Autodesk Inventor',
    icon: SiAutodesk,
    color: '#E51E25',
    category: 'Design & Media'
  },
  {
    name: 'Adobe Photoshop',
    icon: SiAdobephotoshop,
    color: '#31A8FF',
    category: 'Design & Media'
  },
  {
    name: 'Adobe Premiere Pro',
    icon: SiAdobepremierepro,
    color: '#9999FF',
    category: 'Design & Media'
  },
  {
    name: 'DaVinci Resolve',
    icon: FaFilm,
    color: '#FF5D5B',
    category: 'Design & Media'
  },
  {
    name: 'Canva',
    icon: SiCanva,
    color: '#00C4CC',
    category: 'Design & Media'
  },
  {
    name: 'Figma',
    icon: SiFigma,
    color: '#F24E1E',
    category: 'Design & Media'
  },
  {
    name: 'VS Code',
    icon: SiVisualstudiocode,
    color: '#007ACC',
    category: 'Development'
  },
  {
    name: 'Git',
    icon: SiGit,
    color: '#F05032',
    category: 'Development'
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    color: '#181717',
    category: 'Development'
  },
  {
    name: 'HTML/CSS',
    icon: SiHtml5,
    color: '#E34F26',
    category: 'Development'
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#F7DF1E',
    category: 'Development'
  },
  {
    name: 'React',
    icon: SiReact,
    color: '#61DAFB',
    category: 'Development'
  },
  {
    name: 'Microsoft Office',
    icon: SiMicrosoftoffice,
    color: '#D83B01',
    category: 'Productivity'
  },
  {
    name: 'Google Workspace',
    icon: SiGoogle,
    color: '#4285F4',
    category: 'Productivity'
  },
  {
    name: 'Slack',
    icon: SiSlack,
    color: '#4A154B',
    category: 'Productivity'
  },
  {
    name: 'Trello',
    icon: SiTrello,
    color: '#0052CC',
    category: 'Productivity'
  },
  {
    name: 'Asana',
    icon: SiAsana,
    color: '#F06A6A',
    category: 'Productivity'
  },
  {
    name: 'Notion',
    icon: SiNotion,
    color: '#000000',
    category: 'Productivity'
  }
];

export const toolCategories = [
  {
    name: 'Design & Media',
    description: 'Professional tools for design, 3D modeling, and media editing',
    tools: tools.filter(tool => tool.category === 'Design & Media')
  },
  {
    name: 'Development',
    description: 'Tools and technologies for web development and version control',
    tools: tools.filter(tool => tool.category === 'Development')
  },
  {
    name: 'Productivity',
    description: 'Essential tools for project management and collaboration',
    tools: tools.filter(tool => tool.category === 'Productivity')
  }
];
