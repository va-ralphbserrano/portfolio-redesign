import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { projectCardVariants } from '@/utils/animations/index';

export interface Technology {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export interface TechnologyDisplayProps {
  technologies: Technology[];
  className?: string;
  variant?: 'default' | 'compact' | 'pill';
  animate?: boolean;
}

export const TechnologyDisplay: React.FC<TechnologyDisplayProps> = ({
  technologies,
  className,
  variant = 'default',
  animate = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'flex flex-wrap gap-2';
      case 'pill':
        return 'flex flex-wrap gap-2';
      default:
        return 'flex flex-wrap gap-2';
    }
  };

  const getTechnologyClasses = () => {
    switch (variant) {
      case 'compact':
        return 'flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400';
      case 'pill':
        return 'rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400';
    }
  };

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    variants: projectCardVariants,
    initial: "hidden",
    animate: "visible"
  } : {};

  return (
    <Wrapper 
      className={classNames(getVariantClasses(), className)}
      {...wrapperProps}
    >
      {technologies.map((tech, index) => (
        <div key={index} className={getTechnologyClasses()}>
          {tech.icon && (
            <tech.icon className={classNames('w-4 h-4', tech.color)} />
          )}
          <span>{tech.name}</span>
        </div>
      ))}
    </Wrapper>
  );
};

TechnologyDisplay.displayName = 'TechnologyDisplay';

export default TechnologyDisplay;
