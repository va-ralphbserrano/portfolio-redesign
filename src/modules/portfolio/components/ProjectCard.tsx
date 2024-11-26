import { Modal, ModalBody, ModalHeader } from '@/components/common/Modal';
import { Project } from '@/shared/types/project';
import { classNames } from '@/shared/utils/helpers';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image with gallery images
  const allImages = [project.image, ...(project.gallery || [])];

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className={classNames('group relative cursor-pointer', className)}
        onClick={handleClick}
      >
        <div className="h-full p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
          {/* Project Image */}
          <div className="relative aspect-[4/3] mb-3 sm:mb-4 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow" />

          {/* View Project Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-3 sm:px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-lg transition-colors duration-300 active:scale-95 transform"
          >
            View Project
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
        className="p-0 sm:p-4"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)} className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold">{project.title}</h3>
        </ModalHeader>
        <ModalBody className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="space-y-4">
            {/* Project Images */}
            <div className="relative w-full h-[50vh] rounded-xl overflow-hidden">
              <img
                src={allImages[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain bg-gray-100 dark:bg-gray-900"
              />

              {/* Image Title Overlay */}
              {project.imageLabels && project.imageLabels[currentImageIndex] && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-primary-500/80 dark:bg-primary-600/80 backdrop-blur-sm rounded-lg shadow-lg">
                  <span className="text-white font-medium">
                    {project.imageLabels[currentImageIndex]}
                  </span>
                </div>
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>

              <div>
                <h4 className="font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.features && (
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
