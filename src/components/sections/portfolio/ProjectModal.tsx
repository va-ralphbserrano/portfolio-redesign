import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Project } from '../../../types/project';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { title, description, technologies, demoUrl, githubUrl, imageUrl } = project;
  // Combine the main image with gallery images to show all available images
  const images = [imageUrl];

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          <FaTimes className="h-6 w-6" />
        </button>

        {/* Project Content */}
        <div className="space-y-6">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative mx-auto max-w-lg">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                <img
                  src={images[currentImageIndex]}
                  alt={title}
                  className="h-full w-full object-contain"
                  style={{ maxHeight: '400px' }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                      <span className="sr-only">Next</span>
                      <FaChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
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
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <FaGithub className="h-5 w-5" />
                <span>View on GitHub</span>
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
      </div>
    </Dialog>
  );
};

export default ProjectModal;
