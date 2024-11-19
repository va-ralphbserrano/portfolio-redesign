import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { useInView } from 'react-intersection-observer';
import { ResponsiveImage } from '@/components/common/adaptive/ResponsiveImage';
import { Project, ProjectCategory } from '../types';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      currentFilter === ProjectCategory.ALL ? true : project.category === currentFilter
    );
  }, [projects, currentFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentPdfPage(1);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setNumPages(null);
    setCurrentPdfPage(1);
  };

  const handleFilterClick = (category: ProjectCategory) => {
    setCurrentFilter(category);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => handleFilterClick(ProjectCategory.ALL)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentFilter === ProjectCategory.ALL
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => handleFilterClick(ProjectCategory.AUTOCAD)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentFilter === ProjectCategory.AUTOCAD
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          AutoCAD
        </button>
        <button
          onClick={() => handleFilterClick(ProjectCategory.INVENTOR)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentFilter === ProjectCategory.INVENTOR
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Inventor
        </button>
      </div>

      {/* Project Grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {currentProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer group"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <ResponsiveImage
                  src={project.thumbnail || project.image || ''}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.tags || project.technologies || []).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* PDF Modal */}
      {selectedProject && selectedProject.pdfUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedProject.title}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>
            <Document
              file={selectedProject.pdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="flex justify-center"
            >
              <Page
                pageNumber={currentPdfPage}
                width={800}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            {numPages && numPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => setCurrentPdfPage((p) => Math.max(1, p - 1))}
                  disabled={currentPdfPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-900 dark:text-white">
                  Page {currentPdfPage} of {numPages}
                </span>
                <button
                  onClick={() => setCurrentPdfPage((p) => Math.min(numPages, p + 1))}
                  disabled={currentPdfPage === numPages}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
