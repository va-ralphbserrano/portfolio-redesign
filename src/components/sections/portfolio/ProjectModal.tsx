import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './types';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, GithubIcon } from '@/components/icons';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const allImages = project ? [project.image, ...(project.gallery || [])] : [];

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    setIsLoading(true);
  }, [allImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  }, [allImages.length]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [handlePrevImage, handleNextImage, onClose]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsZoomed(false);
    setIsLoading(true);
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, handleKeyPress]);

  if (!project) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Gallery Section */}
                  <div className="relative aspect-[4/3] w-full">
                    <div className={`relative w-full h-full rounded-lg overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                         onClick={() => setIsZoomed(!isZoomed)}>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={allImages[currentImageIndex]}
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          className={`w-full h-full object-contain bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ${
                            isZoomed ? 'scale-125' : 'scale-100'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          onLoad={() => setIsLoading(false)}
                        />
                      </AnimatePresence>
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        >
                          <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        >
                          <ChevronRightIcon className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image Progress Indicator */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (currentImageIndex !== index) {
                                setCurrentImageIndex(index);
                                setIsLoading(true);
                              }
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex
                                ? 'bg-white w-4'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Thumbnails */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (currentImageIndex !== index) {
                              setCurrentImageIndex(index);
                              setIsLoading(true);
                            }
                          }}
                          className={`flex-shrink-0 relative aspect-[4/3] w-20 ${
                            index === currentImageIndex
                              ? 'ring-2 ring-primary'
                              : 'hover:ring-2 hover:ring-primary/50'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details Section */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {project.subcategory && (
                          <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                            {project.subcategory}
                          </span>
                        )}
                      </div>
                      <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </Dialog.Title>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>

                    {project.technologies && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                        >
                          <GithubIcon className="w-5 h-5" />
                          View Code
                        </a>
                      )}
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLinkIcon className="w-5 h-5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectModal;
