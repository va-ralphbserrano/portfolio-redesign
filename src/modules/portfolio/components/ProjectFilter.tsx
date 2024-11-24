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
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.key}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            selectedCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
