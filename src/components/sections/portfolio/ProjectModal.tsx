import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Project } from './data/types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { title, description, technologies, demoLink, github, gallery, image } = project;
  // Combine the main image with gallery images to show all available images
  const images = gallery ? [image, ...gallery] : [image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <IoClose className="h-6 w-6" />
          </button>

          {/* Project Content */}
          <div className="space-y-6">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={images[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            )}

            <div>
              <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600 dark:text-gray-300">
                {description}
              </Dialog.Description>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>View on GitHub</span>
                </a>
              )}
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <FaExternalLinkAlt className="h-5 w-5" />
                  <span>View Demo</span>
                </a>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="mt-6 grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      index === currentImageIndex
                        ? 'ring-2 ring-primary-500'
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="aspect-video w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
};

export default ProjectModal;
