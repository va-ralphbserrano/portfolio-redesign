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
  FaNodeJs,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe
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
  SiPostgresql,
  SiUpwork
} from 'react-icons/si';
import { 
  HiCode, 
  HiDesktopComputer, 
  HiVideoCamera, 
  HiCube, 
  HiSupport, 
  HiPresentationChartLine,
  HiPencil,
  HiTemplate,
  HiCog,
  HiSearch,
  HiMail,
  HiCalendar,
  HiExternalLink,
  HiLocationMarker,
  HiPhone,
  HiStatusOnline
} from 'react-icons/hi';

// Tool icons with consistent sizing
export const toolIcons: { [key: string]: () => React.ReactElement } = {
  vscode: () => React.createElement(SiVisualstudiocode, { className: "w-6 h-6" }),
  git: () => React.createElement(FaGitAlt, { className: "w-6 h-6" }),
  github: () => React.createElement(FaGithub, { className: "w-6 h-6" }),
  nodejs: () => React.createElement(FaNodeJs, { className: "w-6 h-6" }),
  react: () => React.createElement(FaReact, { className: "w-6 h-6" }),
  typescript: () => React.createElement(SiTypescript, { className: "w-6 h-6" }),
  javascript: () => React.createElement(SiJavascript, { className: "w-6 h-6" }),
  html: () => React.createElement(FaHtml5, { className: "w-6 h-6" }),
  tailwind: () => React.createElement(SiTailwindcss, { className: "w-6 h-6" }),
  next: () => React.createElement(SiNextdotjs, { className: "w-6 h-6" }),
  mongodb: () => React.createElement(SiMongodb, { className: "w-6 h-6" }),
  postgresql: () => React.createElement(SiPostgresql, { className: "w-6 h-6" }),
  autocad: () => React.createElement(SiAutodesk, { className: "w-6 h-6" }),
  autodesk: () => React.createElement(SiAutodesk, { className: "w-6 h-6" }),
  photoshop: () => React.createElement(SiAdobephotoshop, { className: "w-6 h-6" }),
  premiere: () => React.createElement(SiAdobepremierepro, { className: "w-6 h-6" }),
  video: () => React.createElement(FaVideo, { className: "w-6 h-6" }),
  canva: () => React.createElement(SiCanva, { className: "w-6 h-6" }),
  figma: () => React.createElement(FaFigma, { className: "w-6 h-6" }),
  office: () => React.createElement(SiMicrosoft, { className: "w-6 h-6" }),
  google: () => React.createElement(FaGoogle, { className: "w-6 h-6" }),
  slack: () => React.createElement(SiSlack, { className: "w-6 h-6" }),
  trello: () => React.createElement(SiTrello, { className: "w-6 h-6" }),
  asana: () => React.createElement(SiAsana, { className: "w-6 h-6" }),
  notion: () => React.createElement(SiNotion, { className: "w-6 h-6" })
};

// Service icons with larger sizing
export const serviceIcons: { [key: string]: () => React.ReactElement } = {
  code: () => React.createElement(HiCode, { className: "w-8 h-8" }),
  desktop: () => React.createElement(HiDesktopComputer, { className: "w-8 h-8" }),
  video: () => React.createElement(HiVideoCamera, { className: "w-8 h-8" }),
  cube: () => React.createElement(HiCube, { className: "w-8 h-8" }),
  support: () => React.createElement(HiSupport, { className: "w-8 h-8" }),
  presentation: () => React.createElement(HiPresentationChartLine, { className: "w-8 h-8" }),
  pencil: () => React.createElement(HiPencil, { className: "w-8 h-8" }),
  template: () => React.createElement(HiTemplate, { className: "w-8 h-8" }),
  cog: () => React.createElement(HiCog, { className: "w-8 h-8" }),
  search: () => React.createElement(HiSearch, { className: "w-8 h-8" }),
  mail: () => React.createElement(HiMail, { className: "w-8 h-8" }),
  calendar: () => React.createElement(HiCalendar, { className: "w-8 h-8" })
};

// Tech icons mapping
const techIcons: { [key: string]: React.ComponentType } = {
  vscode: SiVisualstudiocode,
  git: FaGitAlt,
  github: FaGithub,
  nodejs: FaNodeJs,
  react: FaReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: FaHtml5,
  tailwind: SiTailwindcss,
  next: SiNextdotjs,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  autocad: FaPencilRuler,
  autodesk: SiAutodesk,
  photoshop: SiAdobephotoshop,
  premiere: SiAdobepremierepro,
  video: FaVideo,
  canva: SiCanva,
  figma: FaFigma,
  office: SiMicrosoft,
  google: FaGoogle,
  slack: SiSlack,
  trello: SiTrello,
  asana: SiAsana,
  notion: SiNotion,
  upwork: SiUpwork,
  // Personal info icons
  calendar: HiCalendar,
  globe: FaGlobe,
  mail: HiMail,
  phone: HiPhone,
  location: HiLocationMarker,
  status: HiStatusOnline
};

export const getTechIcon = (name: string): React.ComponentType | null => {
  return techIcons[name.toLowerCase()] || null;
};

// Social media icons
export const socialIcons: { [key: string]: any } = {
  github: FaGithub,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  upwork: SiUpwork
};

// Contact icons
export const contactIcons: { [key: string]: any } = {
  mail: HiMail,
  phone: HiPhone,
  location: HiLocationMarker
};

// Navigation icons
export const navIcons: { [key: string]: any } = {
  external: HiExternalLink
};
