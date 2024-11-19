import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PDFViewer from '@/components/common/PDFViewer';
import { Section } from '@/components/layout';
import { Project, ProjectCategory } from './portfolio/types';
import { classNames } from '@/utils/helpers';
import { getImageUrl } from '@/utils/paths';
import { portfolioItemVariants } from '@/components/sections/portfolio/types';
import ProjectFilter from '@/components/sections/portfolio/ProjectFilter';
import ProjectCard from '@/components/sections/portfolio/ProjectCard';

interface TechnicalProjectsProps {
  projects: Project[];
  className?: string;
}

export const TechnicalProjects: React.FC<TechnicalProjectsProps> = ({
  projects,
  className
}) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.ALL);

  const filteredProjects = projects.filter(project =>
    selectedCategory === ProjectCategory.ALL ? true : project.category === selectedCategory
  );

  const categories = [
    { id: ProjectCategory.ALL, label: 'All' },
    { id: ProjectCategory.TECHNICAL, label: 'Technical' },
    { id: ProjectCategory.WEB, label: 'Web' },
    { id: ProjectCategory.DESIGN, label: 'Design' },
    { id: ProjectCategory.MANAGEMENT, label: 'Management' },
    { id: ProjectCategory.EDUCATION, label: 'Education' },
    { id: ProjectCategory.DEMO, label: 'Demo' }
  ];

  return (
    <Section className={classNames('py-20', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore my technical design projects and engineering work
          </p>
        </div>

        <ProjectFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          className="mb-8"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={portfolioItemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={() => project.pdfUrl && setSelectedPdf(project.pdfUrl)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedPdf && (
        <PDFViewer
          pdfUrl={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </Section>
  );
};

export default TechnicalProjects;
