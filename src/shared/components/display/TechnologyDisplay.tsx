import React from 'react';
import { classNames } from '@/shared/utils/helpers';

export type Technology = string;

interface TechnologyDisplayProps {
  technologies: Technology[];
  variant?: 'default' | 'pill' | 'compact';
  className?: string;
}

export const TechnologyDisplay: React.FC<TechnologyDisplayProps> = ({
  technologies,
  variant = 'default',
  className
}) => {
  const baseClasses = 'inline-flex items-center';
  const variantClasses = {
    default: 'text-sm text-gray-600 dark:text-gray-400',
    pill: 'px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    compact: 'text-xs text-gray-500 dark:text-gray-400'
  };

  return (
    <div className={classNames('flex flex-wrap gap-2', className)}>
      {technologies.map((tech, index) => (
        <span
          key={index}
          className={classNames(baseClasses, variantClasses[variant])}
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

TechnologyDisplay.displayName = 'TechnologyDisplay';
