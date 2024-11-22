import React from 'react';
import { ProjectCategory } from '@/types/project';
import { classNames } from '@/utils/helpers';

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
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => onCategoryChange(category.id)}
          className={classNames(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
            selectedCategory === category.id
              ? 'bg-primary-500 text-white shadow-md hover:bg-primary-600'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
          aria-pressed={selectedCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
