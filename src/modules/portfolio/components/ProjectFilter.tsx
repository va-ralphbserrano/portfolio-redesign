import React from 'react';
import { ProjectCategory } from '@/shared/types/project';

interface CategoryItem {
  id: ProjectCategory;
  label: string;
  key: string;
}

interface ProjectFilterProps {
  categories: CategoryItem[];
  selectedCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      {categories.map((category) => (
        <button
          key={category.key}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform active:scale-95 ${
            selectedCategory === category.id
              ? 'bg-primary-500 text-white shadow-md hover:bg-primary-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700/50'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
