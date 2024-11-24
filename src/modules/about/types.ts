import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface AboutProps {
  className?: string;
  children?: ReactNode;
}

export interface AboutSectionProps {
  title: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: IconType;
  }>;
  children?: ReactNode;
}

export interface ExperienceProps {
  className?: string;
}

export interface PersonalInfoProps {
  className?: string;
}

export interface ToolsProps {
  className?: string;
}

export interface Skill {
  readonly name: string;
  readonly percentage?: number;
  readonly level?: number;
}

export interface SkillCategory {
  readonly description: string;
  readonly items: readonly Skill[];
}

export interface AboutData {
  title: string;
  tagline: string;
  description: string;
  personalInfo: {
    birthday: string;
    age: string;
    website: string;
    phone: string;
    city: string;
    degree: string;
    email: string;
    freelance: string;
  };
  skills: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  tools: {
    [key: string]: {
      title: string;
      items: string[];
    };
  };
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
  }>;
}

export const aboutItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
