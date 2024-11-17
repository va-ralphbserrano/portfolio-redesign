import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { ProjectFilterProps } from './types';

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  className
}) => {
  return (
    <div className={classNames("flex flex-wrap justify-center gap-4", className)}>
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setSelectedCategory(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={classNames(
            "px-4 py-2 rounded-lg font-medium transition-colors",
            selectedCategory === category
              ? "bg-primary-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};

ProjectFilter.displayName = 'ProjectFilter';

export default ProjectFilter;
