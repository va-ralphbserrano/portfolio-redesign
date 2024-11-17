import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { classNames } from '@/utils/helpers';
import { ProjectCardProps } from './types';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={classNames(
        "group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        )}
        {hasError ? (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-600">Image not available</span>
          </div>
        ) : (
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={classNames(
              "w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105",
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
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
            className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
          >
            View Project
            <HiExternalLink className="w-5 h-5 ml-2" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
