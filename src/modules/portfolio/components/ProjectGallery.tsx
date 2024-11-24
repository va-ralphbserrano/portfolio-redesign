import { Project, ProjectCategory } from '@/shared/types/project';
import { AnimatePresence } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from './ProjectCard';

interface ProjectGalleryProps {
  projects: Project[];
  itemsPerPage?: number;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  itemsPerPage = 6
}) => {
  const [currentFilter, setCurrentFilter] = useState(ProjectCategory.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const projectsByCategory = useMemo(() => {
    return {
      [ProjectCategory.WEB_DEVELOPMENT]: projects.filter(
        project => project.category === ProjectCategory.WEB_DEVELOPMENT
      ),
      [ProjectCategory.VIRTUAL_ASSISTANCE]: projects.filter(
        project => project.category === ProjectCategory.VIRTUAL_ASSISTANCE
      ),
      [ProjectCategory.PROJECT_MANAGEMENT]: projects.filter(
        project => project.category === ProjectCategory.PROJECT_MANAGEMENT
      ),
      [ProjectCategory.CONTENT_CREATION]: projects.filter(
        project => project.category === ProjectCategory.CONTENT_CREATION
      ),
      [ProjectCategory.PROFESSIONAL_DEVELOPMENT]: projects.filter(
        project => project.category === ProjectCategory.PROFESSIONAL_DEVELOPMENT
      )
    };
  }, [projects]);

  const categories = useMemo(() => {
    return Object.entries(projectsByCategory).map(([category]) => ({
      id: category as ProjectCategory,
      label: category
    }));
  }, [projectsByCategory]);

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
    const mainImage = project.image;
    const gallery = project.gallery || [];
    const combinedGallery = mainImage ? [mainImage, ...gallery] : gallery;

    if (combinedGallery.length > 0) {
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
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
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
              <HiX className="w-8 h-8" />
            </button>

            {/* Main image container */}
            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              <img
                src={selectedProject.gallery[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation buttons */}
              {selectedProject.gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Project details */}
            <div className="mt-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="text-gray-300">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
