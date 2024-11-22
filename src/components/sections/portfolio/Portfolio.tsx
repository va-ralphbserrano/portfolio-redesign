import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { Project, ProjectCategory } from '@/types/project';
import { projects as defaultProjects } from './projects';
import ProjectCard from './ProjectCard';
import Pagination from '@/components/common/Pagination';

// Animation variants
const portfolioVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1
    }
  })
};

interface PortfolioProps {
  projects?: Project[];
  className?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({
  projects = defaultProjects,
  className
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get all projects with portfolio projects first and technical projects last
  const allProjects = useMemo(() => {
    const portfolioProjects = projects.filter(project => 
      project.category !== ProjectCategory.TECHNICAL_DESIGN && 
      project.category !== ProjectCategory.COMMERCIAL && 
      project.category !== ProjectCategory.INDUSTRIAL
    );
    
    const technicalProjects = projects.filter(project => 
      project.category === ProjectCategory.TECHNICAL_DESIGN || 
      project.category === ProjectCategory.COMMERCIAL || 
      project.category === ProjectCategory.INDUSTRIAL
    );

    return [...portfolioProjects, ...technicalProjects];
  }, [projects]);

  // Calculate pagination
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const currentProjects = allProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the section smoothly
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="portfolio"
      className={classNames(
        'relative py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={portfolioVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            My Portfolio
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my diverse portfolio showcasing web development, virtual assistance, and technical design projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="h-full"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 z-10 relative">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  );
};

export default Portfolio;
