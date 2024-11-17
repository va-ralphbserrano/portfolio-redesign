import { IconType } from 'react-icons';
import { Variants } from 'framer-motion';

export interface Tool {
  name: string;
  icon: IconType;
  color: string;
}

export interface ToolCategory {
  name: string;
  tools: Tool[];
}

export interface ToolsProps {
  className?: string;
}

export interface ToolGridProps {
  tools: Tool[];
  className?: string;
}

export interface ToolCategoryProps {
  category: ToolCategory;
  className?: string;
}

export const toolsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
};

export const toolItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  }
};
