import React from 'react';
import { motion } from 'framer-motion';
import { Project } from './types';
import { ArrowRightIcon, CodeIcon, ExternalLinkIcon } from '@/components/icons';

interface ProjectCardProps {
  project: Project;
  index: number;
  variants: any;
  onClick: () => void;
  viewMode: 'grid' | 'masonry';
}

const ProjectCard = ({ project, index, variants, onClick, viewMode }: ProjectCardProps) => {
  if (!project) return null;

  const cardClasses = viewMode === 'grid'
    ? 'h-full'
    : 'mb-8 break-inside-avoid';

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      layout
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${cardClasses}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.image && (
          <img
            src={project.image}
            alt={project.title || 'Project Image'}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button className="px-6 py-3 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white rounded-full font-medium flex items-center gap-2 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
              View Details
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          {project.subcategory && (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {project.subcategory}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="pt-4 flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <CodeIcon className="w-5 h-5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
          )}
          <div className="ml-auto flex items-center gap-2 text-primary font-medium">
            View Details
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
