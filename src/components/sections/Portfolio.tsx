import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { portfolioData } from '@/data/portfolio';
import { classNames } from '@/utils/helpers';

interface PortfolioProps {
  className?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ className }) => {
  return (
    <Section
      id="portfolio"
      className={classNames('bg-gray-50 dark:bg-gray-900/50', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {portfolioData.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {portfolioData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-video">
                  <ResponsiveImage
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Portfolio;
