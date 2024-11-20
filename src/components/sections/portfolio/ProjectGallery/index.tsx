import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project, ProjectCategory } from '../types';
import { ResponsiveImage } from '@/components/common/adaptive/ResponsiveImage';

interface ProjectGalleryProps {
  projects: Project[];
  itemsPerPage?: number;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  itemsPerPage = 6
}) => {
  const [currentFilter, setCurrentFilter] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Define available categories
  const categories = useMemo(() => [
    { id: ProjectCategory.ALL, label: 'All' },
    { id: ProjectCategory.TECHNICAL, label: 'Technical' },
    { id: ProjectCategory.WEB, label: 'Web' },
    { id: ProjectCategory.DESIGN, label: 'Design' },
    { id: ProjectCategory.MANAGEMENT, label: 'Management' },
    { id: ProjectCategory.EDUCATION, label: 'Education' },
    { id: ProjectCategory.DEMO, label: 'Demo' },
    { id: ProjectCategory.VIRTUAL_ASSISTANT, label: 'Virtual Assistant' },
    { id: ProjectCategory.KITCHEN_EQUIPMENT, label: 'Kitchen Equipment' },
    { id: ProjectCategory.INDUSTRIAL_EQUIPMENT, label: 'Industrial Equipment' },
    { id: ProjectCategory.COMMERCIAL, label: 'Commercial' },
    { id: ProjectCategory.CONSTRUCTION, label: 'Construction' },
    { id: ProjectCategory.UTILITIES, label: 'Utilities' },
    { id: ProjectCategory.COMPONENTS, label: 'Components' },
    { id: ProjectCategory.FOOD_SERVICE, label: 'Food Service' },
    { id: ProjectCategory.STORAGE, label: 'Storage' },
    { id: ProjectCategory.MANUFACTURING, label: 'Manufacturing' }
  ], []);

  // Only show categories that have projects
  const availableCategories = useMemo(() => {
    const usedCategories = new Set(projects.map(project => project.category));
    return categories.filter(category => 
      category.id === ProjectCategory.ALL || usedCategories.has(category.id)
    );
  }, [categories, projects]);

  const filteredProjects = useMemo(() => {
    return currentFilter === ProjectCategory.ALL
      ? projects
      : projects.filter(project => project.category === currentFilter);
  }, [projects, currentFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProjectClick = (project: Project) => {
    // Create a combined gallery array that includes the main image
    const mainImage = project.thumbnail || project.image;
    const combinedGallery = mainImage 
      ? [mainImage, ...(project.gallery || [])]
      : project.gallery;

    if (combinedGallery && combinedGallery.length > 0) {
      setSelectedProject({
        ...project,
        gallery: combinedGallery
      });
      setCurrentImageIndex(0);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleFilterChange = (category: ProjectCategory) => {
    setCurrentFilter(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {availableCategories.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleFilterChange(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currentFilter === id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="sync">
          {currentProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <ResponsiveImage
                    src={project.thumbnail || project.image || project.gallery?.[0] || ''}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tag: string, index: number) => (
                      <span
                        key={`${project.id}-tag-${index}`}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100/80 backdrop-blur-sm dark:bg-gray-700/80 text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {(project.gallery?.length ?? 0) > 0 && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium">
                      {(project.gallery?.length ?? 0) + (project.thumbnail || project.image ? 1 : 0)} images
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-16 gap-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-primary text-white shadow-lg ring-2 ring-primary/20'
                    : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}

      {/* Gallery Modal */}
      {selectedProject && selectedProject.gallery && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main image container */}
            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              <img
                src={selectedProject.gallery[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation arrows - Only show if there's more than one image */}
              {selectedProject.gallery.length > 1 && (
                <>
                  {/* Left arrow - Hide if it's the first image */}
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => handlePrevImage()}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Right arrow - Hide if it's the last image */}
                  {currentImageIndex < selectedProject.gallery.length - 1 && (
                    <button
                      onClick={() => handleNextImage()}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Image counter - Only show if there's more than one image */}
            {selectedProject.gallery.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/80">
                {currentImageIndex + 1} / {selectedProject.gallery.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
