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
  FaYoutube
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
  HiPhone
} from 'react-icons/hi';

// Tool icons with consistent sizing
export const toolIcons: { [key: string]: () => JSX.Element } = {
  vscode: (): JSX.Element => <SiVisualstudiocode className="w-6 h-6" />,
  git: (): JSX.Element => <FaGitAlt className="w-6 h-6" />,
  github: (): JSX.Element => <FaGithub className="w-6 h-6" />,
  nodejs: (): JSX.Element => <FaNodeJs className="w-6 h-6" />,
  react: (): JSX.Element => <FaReact className="w-6 h-6" />,
  typescript: (): JSX.Element => <SiTypescript className="w-6 h-6" />,
  javascript: (): JSX.Element => <SiJavascript className="w-6 h-6" />,
  html: (): JSX.Element => <FaHtml5 className="w-6 h-6" />,
  tailwind: (): JSX.Element => <SiTailwindcss className="w-6 h-6" />,
  next: (): JSX.Element => <SiNextdotjs className="w-6 h-6" />,
  mongodb: (): JSX.Element => <SiMongodb className="w-6 h-6" />,
  postgresql: (): JSX.Element => <SiPostgresql className="w-6 h-6" />,
  autocad: (): JSX.Element => <SiAutodesk className="w-6 h-6" />,
  autodesk: (): JSX.Element => <SiAutodesk className="w-6 h-6" />,
  photoshop: (): JSX.Element => <SiAdobephotoshop className="w-6 h-6" />,
  premiere: (): JSX.Element => <SiAdobepremierepro className="w-6 h-6" />,
  video: (): JSX.Element => <FaVideo className="w-6 h-6" />,
  canva: (): JSX.Element => <SiCanva className="w-6 h-6" />,
  figma: (): JSX.Element => <FaFigma className="w-6 h-6" />,
  office: (): JSX.Element => <SiMicrosoft className="w-6 h-6" />,
  google: (): JSX.Element => <FaGoogle className="w-6 h-6" />,
  slack: (): JSX.Element => <SiSlack className="w-6 h-6" />,
  trello: (): JSX.Element => <SiTrello className="w-6 h-6" />,
  asana: (): JSX.Element => <SiAsana className="w-6 h-6" />,
  notion: (): JSX.Element => <SiNotion className="w-6 h-6" />
};

// Service icons with larger sizing
export const serviceIcons: { [key: string]: () => JSX.Element } = {
  code: (): JSX.Element => <HiCode className="w-8 h-8" />,
  desktop: (): JSX.Element => <HiDesktopComputer className="w-8 h-8" />,
  video: (): JSX.Element => <HiVideoCamera className="w-8 h-8" />,
  cube: (): JSX.Element => <HiCube className="w-8 h-8" />,
  support: (): JSX.Element => <HiSupport className="w-8 h-8" />,
  presentation: (): JSX.Element => <HiPresentationChartLine className="w-8 h-8" />,
  pencil: (): JSX.Element => <HiPencil className="w-8 h-8" />,
  template: (): JSX.Element => <HiTemplate className="w-8 h-8" />,
  cog: (): JSX.Element => <HiCog className="w-8 h-8" />,
  search: (): JSX.Element => <HiSearch className="w-8 h-8" />,
  mail: (): JSX.Element => <HiMail className="w-8 h-8" />,
  calendar: (): JSX.Element => <HiCalendar className="w-8 h-8" />
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
