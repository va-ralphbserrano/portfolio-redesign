import React from 'react';
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
  HiCalendar
} from 'react-icons/hi';

const iconMap: Record<string, React.ReactNode> = {
  'code': <HiCode className="w-8 h-8" />,
  'desktop': <HiDesktopComputer className="w-8 h-8" />,
  'video': <HiVideoCamera className="w-8 h-8" />,
  'cube': <HiCube className="w-8 h-8" />,
  'support': <HiSupport className="w-8 h-8" />,
  'presentation': <HiPresentationChartLine className="w-8 h-8" />,
  'pencil': <HiPencil className="w-8 h-8" />,
  'template': <HiTemplate className="w-8 h-8" />,
  'cog': <HiCog className="w-8 h-8" />,
  'search': <HiSearch className="w-8 h-8" />,
  'mail': <HiMail className="w-8 h-8" />,
  'calendar': <HiCalendar className="w-8 h-8" />
};

export const getServiceIcon = (iconName: string): React.ReactNode => {
  return iconMap[iconName.toLowerCase()] || <HiCog className="w-8 h-8" />
};
