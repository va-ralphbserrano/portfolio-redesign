import { 
  FaDiscord, 
  FaViber, 
  FaSkype,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWordpress,
  FaReact,
  FaNpm,
  FaCube,
  FaLayerGroup,
  FaCode,
  FaPalette,
  FaServer,
  FaVideo,
  FaDesktop,
  FaFile,
  FaFileExcel,
  FaFilePowerpoint,
  FaEnvelope,
  FaGlobe,
  FaTools,
  FaLaptop,
  FaDatabase,
  FaHtml5,
  FaCss3,
  FaGithub,
  FaMicrosoft,
  FaSlack,
  FaTrello,
  FaFigma
} from 'react-icons/fa';

import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCanva,
  SiAutodesk,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiAsana,
  SiClickup,
  SiZoom,
  SiSalesforce,
  SiZendesk,
  SiIntercom,
  SiAdobepremierepro,
  SiNotion,
  SiVisualstudiocode,
  SiGoogle
} from 'react-icons/si';

import { BiGitBranch } from 'react-icons/bi';
import { DiJavascript } from 'react-icons/di';

import { aboutData } from '../../../../data/about';
import { ToolCategory, Tool } from './types';

const tools: Record<string, { description: string, items: Tool[] }> = {
  'Design & Media': {
    description: 'Proficient in industry-standard design and media tools, specializing in AutoCAD for technical drawings and Adobe suite for multimedia content creation.',
    items: [
      { name: 'AutoCAD', icon: FaCube, color: 'text-red-600' },
      { name: 'Autodesk Inventor', icon: FaCube, color: 'text-orange-600' },
      { name: 'Adobe Photoshop', icon: SiAdobephotoshop, color: 'text-blue-600' },
      { name: 'Adobe Premiere Pro', icon: SiAdobepremierepro, color: 'text-purple-600' },
      { name: 'DaVinci Resolve', icon: FaVideo, color: 'text-purple-600' },
      { name: 'Canva', icon: SiCanva, color: 'text-blue-500' },
      { name: 'Figma', icon: FaFigma, color: 'text-purple-500' }
    ]
  },
  'Development': {
    description: 'Experienced with modern development tools and technologies, focusing on web development using JavaScript and React ecosystem.',
    items: [
      { name: 'VS Code', icon: SiVisualstudiocode, color: 'text-blue-500' },
      { name: 'Git', icon: BiGitBranch, color: 'text-orange-500' },
      { name: 'GitHub', icon: FaGithub, color: 'text-gray-700 dark:text-gray-300' },
      { name: 'HTML/CSS', icon: FaHtml5, color: 'text-orange-500' },
      { name: 'JavaScript', icon: DiJavascript, color: 'text-yellow-400' },
      { name: 'React', icon: FaReact, color: 'text-cyan-400' }
    ]
  },
  'Productivity': {
    description: 'Well-versed in collaboration and productivity tools, enabling efficient project management and seamless team communication.',
    items: [
      { name: 'Microsoft Office', icon: FaMicrosoft, color: 'text-blue-600' },
      { name: 'Google Workspace', icon: SiGoogle, color: 'text-red-500' },
      { name: 'Slack', icon: FaSlack, color: 'text-purple-500' },
      { name: 'Trello', icon: FaTrello, color: 'text-blue-400' },
      { name: 'Asana', icon: SiAsana, color: 'text-red-500' },
      { name: 'Notion', icon: SiNotion, color: 'text-gray-700 dark:text-gray-300' }
    ]
  }
};

export const toolCategories: ToolCategory[] = Object.entries(tools).map(([name, category]) => ({
  name,
  description: category.description,
  tools: category.items
}));
