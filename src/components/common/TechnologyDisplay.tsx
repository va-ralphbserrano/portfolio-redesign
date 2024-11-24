import React from 'react';
import { Technology } from '../../types/project';

interface TechnologyDisplayProps {
  technology: Technology;
  className?: string;
}

export const TechnologyDisplay: React.FC<TechnologyDisplayProps> = ({ technology, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        technology.color || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      } ${className}`}
    >
      {technology.icon && (
        <span className="mr-1.5" dangerouslySetInnerHTML={{ __html: technology.icon }} />
      )}
      {technology.name}
    </span>
  );
};

TechnologyDisplay.displayName = 'TechnologyDisplay';
