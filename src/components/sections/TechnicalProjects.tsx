import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFilter from '@/components/sections/portfolio/ProjectFilter';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Section } from '@/components/layout';
import { Project, ProjectCategory } from './portfolio/data/types';
import { classNames } from '@/utils/helpers';
import { portfolioItemVariants } from '@/components/sections/portfolio/types';

interface TechnicalProjectsProps {
  projects: Project[];
  className?: string;
}

const CATEGORIES = [
  { id: ProjectCategory.ALL, label: 'All' },
  { id: ProjectCategory.WEB, label: 'Web' },
  { id: ProjectCategory.TECHNICAL, label: 'Technical' },
  { id: ProjectCategory.DESIGN, label: 'Design' },
  { id: ProjectCategory.INDUSTRIAL_EQUIPMENT, label: 'Industrial' },
  { id: ProjectCategory.MANAGEMENT, label: 'Management' },
  { id: ProjectCategory.EDUCATION, label: 'Education' },
  { id: ProjectCategory.DEMO, label: 'Demo' }
];

export const TechnicalProjects: React.FC<TechnicalProjectsProps> = ({
  projects,
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCategoryChange = useCallback((category: ProjectCategory) => {
    setSelectedCategory(category);
  }, []);

  const filteredProjects = useMemo(() => {
    return selectedCategory === ProjectCategory.ALL
      ? projects
      : projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <Section className={classNames('py-20', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Technical Projects</h2>
          <ProjectFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={portfolioItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
};

export default TechnicalProjects;
