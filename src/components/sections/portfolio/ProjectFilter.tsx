import React from 'react';
import { ProjectCategory } from './data/types';
import { classNames } from '@/utils/helpers';

interface Category {
  id: ProjectCategory;
  label: string;
}

interface ProjectFilterProps {
  categories: Category[];
  selectedCategory: ProjectCategory;
  setSelectedCategory: (category: ProjectCategory) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={classNames(
            'px-4 py-2 rounded-full transition-all duration-300',
            selectedCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
