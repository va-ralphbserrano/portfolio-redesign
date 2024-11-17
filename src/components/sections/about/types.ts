import { WithClassName } from '@/types/component';

export interface AboutProps extends WithClassName {}

export interface PersonalInfoItem {
  label: string;
  value: string;
  icon: string;
  href?: string;
}

export interface PersonalInfoProps extends WithClassName {}

export interface SkillsProps extends WithClassName {}

export interface EducationProps extends WithClassName {}

export interface ExperienceProps extends WithClassName {}

export interface ToolsProps extends WithClassName {}

export interface Skill {
  name: string;
  percentage: number;
  color: string;
}

export interface Education {
  title: string;
  school: string;
  year: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  year: string;
  description: string;
}

export interface Tool {
  name: string;
  icon: string;
}

export interface ToolCategory {
  [key: string]: Tool[];
}

export const aboutItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const aboutSkillVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: (percentage: number) => ({
    opacity: 1,
    width: `${percentage}%`,
    transition: {
      duration: 1
    }
  })
};

export const aboutToolVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};
