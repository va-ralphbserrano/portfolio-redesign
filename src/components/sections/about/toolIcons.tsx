import React from 'react';
import { 
  FaPencilRuler, 
  FaVideo, 
  FaFigma, 
  FaGitAlt, 
  FaGithub, 
  FaHtml5, 
  FaReact, 
  FaGoogle,
  FaNodeJs
} from 'react-icons/fa';
import { 
  SiAutodesk, 
  SiAdobephotoshop, 
  SiAdobepremierepro, 
  SiCanva, 
  SiVisualstudiocode, 
  SiJavascript,
  SiTrello,
  SiMicrosoft,
  SiSlack,
  SiAsana,
  SiNotion,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql
} from 'react-icons/si';

const iconMap: Record<string, React.ReactNode> = {
  'vscode': <SiVisualstudiocode className="w-6 h-6" />,
  'git': <FaGitAlt className="w-6 h-6" />,
  'github': <FaGithub className="w-6 h-6" />,
  'nodejs': <FaNodeJs className="w-6 h-6" />,
  'react': <FaReact className="w-6 h-6" />,
  'typescript': <SiTypescript className="w-6 h-6" />,
  'javascript': <SiJavascript className="w-6 h-6" />,
  'html': <FaHtml5 className="w-6 h-6" />,
  'tailwind': <SiTailwindcss className="w-6 h-6" />,
  'next': <SiNextdotjs className="w-6 h-6" />,
  'mongodb': <SiMongodb className="w-6 h-6" />,
  'postgresql': <SiPostgresql className="w-6 h-6" />,
  'autocad': <FaPencilRuler className="w-6 h-6" />,
  'autodesk': <SiAutodesk className="w-6 h-6" />,
  'photoshop': <SiAdobephotoshop className="w-6 h-6" />,
  'premiere': <SiAdobepremierepro className="w-6 h-6" />,
  'video': <FaVideo className="w-6 h-6" />,
  'canva': <SiCanva className="w-6 h-6" />,
  'figma': <FaFigma className="w-6 h-6" />,
  'office': <SiMicrosoft className="w-6 h-6" />,
  'google': <FaGoogle className="w-6 h-6" />,
  'slack': <SiSlack className="w-6 h-6" />,
  'trello': <SiTrello className="w-6 h-6" />,
  'asana': <SiAsana className="w-6 h-6" />,
  'notion': <SiNotion className="w-6 h-6" />
};

export const getToolIcon = (iconName: string): React.ReactNode => {
  return iconMap[iconName.toLowerCase()] || <FaPencilRuler className="w-6 h-6" />;
};
