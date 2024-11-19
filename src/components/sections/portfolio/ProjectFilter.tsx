import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCategory } from './types';
import { classNames } from '@/utils/helpers';
import { WithClassName } from '@/types/component';

interface ProjectFilterProps extends WithClassName {
  categories: { id: ProjectCategory; label: string }[];
  selectedCategory: ProjectCategory;
  setSelectedCategory: (category: ProjectCategory) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  className
}) => {
  return (
    <div className={classNames('flex flex-wrap gap-4 justify-center', className)}>
      {categories.map(({ id, label }) => (
        <motion.button
          key={id}
          onClick={() => setSelectedCategory(id)}
          className={classNames(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === id
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
};

ProjectFilter.displayName = 'ProjectFilter';

export default ProjectFilter;
