import { IconType } from 'react-icons';

export interface PersonalInfoItem {
  label: string;
  value: string;
  icon: IconType;
}

export interface Skill {
  name: string;
  percentage: number;
  color: string;
}

export interface Tool {
  name: string;
  icon: IconType;
  color: string;
  category: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  year: string;
  description: string;
}

export interface AboutData {
  title: string;
  tagline: string;
  description: string;
  personalInfo: PersonalInfoItem[];
  skills: Skill[];
  tools: Tool[];
  education: Education[];
  experience: Experience[];
}

// Component Props Types
export interface AboutSectionProps {
  title: string;
  description?: string;
  features?: {
    title: string;
    description: string;
    icon?: IconType;
  }[];
  children?: React.ReactNode;
}

export interface ExperienceProps {
  className?: string;
}

export interface ExperienceCardProps {
  experience: Experience;
  isLast?: boolean;
  className?: string;
}

export interface ExperienceIconProps {
  className?: string;
}

export interface ToolCategoryProps {
  category: {
    name: string;
    description: string;
    tools: Tool[];
  };
  className?: string;
}

export interface ToolGridProps {
  tools: Tool[];
  className?: string;
}

export interface AboutGridProps {
  features: {
    title: string;
    description: string;
    icon?: IconType;
  }[];
}

// Animation Variants
export const aboutItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const experienceCardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const experienceIconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0 }
};

export const toolsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

export const toolItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export const experienceTimelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
