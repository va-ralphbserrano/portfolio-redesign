import Pagination from '@/components/common/Pagination';
import { Project, ProjectCategory } from '@/shared/types/project';
import { classNames } from '@/shared/utils/helpers';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { projects } from './projects';

const categoryOptions = [
  { id: ProjectCategory.ALL, label: 'All Projects', key: 'all' },
  { id: ProjectCategory.WEB_DEVELOPMENT, label: 'Web Development', key: 'web' },
  { id: ProjectCategory.VIRTUAL_ASSISTANCE, label: 'Virtual Assistant Services', key: 'va' },
  { id: ProjectCategory.PROJECT_MANAGEMENT, label: 'Project Management', key: 'pm' },
  { id: ProjectCategory.PROFESSIONAL_DEVELOPMENT, label: 'Professional Development', key: 'prof' },
  { id: ProjectCategory.CONTENT_CREATION, label: 'Content Creation', key: 'content' },
  { id: ProjectCategory.TECHNICAL_DESIGN, label: 'Technical Design', key: 'tech' },
  { id: ProjectCategory.COMMERCIAL, label: 'Commercial', key: 'commercial' },
  { id: ProjectCategory.INDUSTRIAL, label: 'Industrial', key: 'industrial' }
];

interface PortfolioProps {
  className?: string;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProjects = useMemo(() => {
    if (selectedCategory === ProjectCategory.ALL) return projects;
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section
      id="portfolio"
      className={classNames(
        'py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Latest Work
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my recent projects and discover how I bring ideas to life through clean code and modern design.
          </p>
        </motion.div>

        <div className="mb-12">
          <ProjectFilter
            categories={categoryOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};
