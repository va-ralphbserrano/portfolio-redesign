import { Project, ProjectCategory } from '@/shared/types/project';

export interface ProjectGalleryProps {
  projects: Project[];
  itemsPerPage?: number;
}

export interface ProjectCardProps extends Project {
  onClick?: () => void;
}

export interface ProjectFilterProps {
  categories: { id: ProjectCategory; label: string }[];
  currentFilter: ProjectCategory;
  onFilterChange: (category: ProjectCategory) => void;
}

export interface ProjectActionsProps {
  demoUrl?: string;
  sourceUrl?: string;
  className?: string;
}
