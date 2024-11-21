import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { ResponsiveImage } from './ResponsiveImage';
import { TechnologyDisplay } from './TechnologyDisplay';
import type { Technology } from './TechnologyDisplay';
import { classNames } from '@/utils/helpers';
import { Project } from '@/types/project';

interface ProjectDisplayProps {
  project: Project;
  variant?: 'card' | 'modal' | 'detail';
  className?: string;
  onClick?: () => void;
}

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  project,
  variant = 'card',
  className,
  onClick
}) => {
  const { title, description, image, technologies, githubUrl: github, demoUrl: demo, gallery } = project;

  const renderContent = () => {
    switch (variant) {
      case 'modal':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>

            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <ResponsiveImage
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Gallery Images */}
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((galleryImage, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                    <ResponsiveImage
                      src={galleryImage}
                      alt={`${title} gallery image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Technologies Used
              </h4>
              <TechnologyDisplay
                technologies={technologies}
                variant="pill"
              />
            </div>

            {/* Links */}
            <div className="flex space-x-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>View Code</span>
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <FaExternalLinkAlt className="h-5 w-5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        );

      case 'detail':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
            <TechnologyDisplay
              technologies={technologies}
              variant="default"
              className="mt-2"
            />
          </div>
        );

      default: // card
        return (
          <div
            className="group cursor-pointer"
            onClick={onClick}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-video">
                <ResponsiveImage
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {description}
                </p>
                <TechnologyDisplay
                  technologies={technologies}
                  variant="compact"
                  className="mt-auto"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      variants={projectVariants}
      className={className}
    >
      {renderContent()}
    </motion.div>
  );
};

ProjectDisplay.displayName = 'ProjectDisplay';
