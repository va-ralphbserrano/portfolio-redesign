import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectFilter } from './portfolio/ProjectFilter';
import { ProjectCard } from './portfolio/ProjectCard';
import { portfolioData } from '@/data/portfolio';
import { ProjectCategory } from './portfolio/types';
import { classNames } from '@/utils/helpers';
import { WithClassName } from '@/types/component';

export interface PortfolioProps extends WithClassName {}

export const Portfolio: React.FC<PortfolioProps> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const filteredProjects = portfolioData.projects.filter(project =>
    selectedCategory === 'all' ? true : project.category === selectedCategory
  );

  return (
    <section className={classNames(
      'py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
      className
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {portfolioData.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {portfolioData.description}
          </p>
        </motion.div>

        <ProjectFilter
          categories={portfolioData.categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Portfolio.displayName = 'Portfolio';

export default Portfolio;
