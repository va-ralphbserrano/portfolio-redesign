import { Project } from './data/types';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import React from 'react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { title, description, image, github, demoLink } = project;

  return (
    <motion.div
      layout
      className="group relative cursor-pointer overflow-hidden rounded-xl"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Image */}
      <div className="aspect-video">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay with project details - only visible on hover */}
      <div className="absolute inset-0 flex flex-col justify-center bg-black/70 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-sm text-gray-300">{description}</p>
        
        {/* Links */}
        <div className="mt-auto flex gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="h-5 w-5" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Title below the image */}
      <div className="mt-2 px-2">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};
