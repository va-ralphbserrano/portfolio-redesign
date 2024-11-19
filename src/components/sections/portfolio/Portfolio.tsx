import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from './types';
import ProjectCard from './ProjectCard';
import { containerVariants, itemVariants } from '@/animations/variants';
import { projects } from '@/data/projects';
import { SectionHeading } from "@/components/common";
import { SearchIcon, GridIcon, ColumnsIcon, FilterIcon } from '@/components/icons';
import ProjectModal from './ProjectModal';
import Pagination from '@/components/common/Pagination';

export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Get all subcategories for the current category
  const subcategories = useMemo(() => {
    const filtered = projects.filter(
      project => selectedCategory === ProjectCategory.ALL || project.category === selectedCategory
    );
    const subs = ['All', ...new Set(filtered.map(p => p.subcategory || 'Other'))];
    return subs;
  }, [selectedCategory]);

  // Filter projects based on category, subcategory, and search
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project, index, self) => 
        // Remove duplicates based on ID
        index === self.findIndex((p) => p.id === project.id)
      )
      .filter(project => {
        const matchesCategory = selectedCategory === ProjectCategory.ALL || project.category === selectedCategory;
        const matchesSubcategory = selectedSubcategory === 'All' || project.subcategory === selectedSubcategory;
        const matchesSearch = searchQuery === '' || 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())));
        
        return matchesCategory && matchesSubcategory && matchesSearch;
      });
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Portfolio"
          subtitle="Crafting Digital Experiences & Technical Solutions"
          description="Welcome to my portfolio, where innovation meets implementation. Browse through my diverse collection of projects spanning web development, technical design, and creative solutions. Each project represents a unique challenge tackled with precision, creativity, and technical expertise."
          className="mb-12"
        />

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar and View Toggle */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects by title, description, or technology..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                title="Toggle Filters"
              >
                <FilterIcon className="h-5 w-5" />
              </button>
              <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  title="Grid View"
                >
                  <GridIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    viewMode === 'masonry'
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  title="Masonry View"
                >
                  <ColumnsIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="py-4 flex flex-wrap gap-4">
                  <div className="flex-grow min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value as ProjectCategory);
                        setSelectedSubcategory('All');
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-300"
                    >
                      {Object.values(ProjectCategory).map((category) => (
                        <option key={category} value={category}>
                          {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-grow min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subcategory
                    </label>
                    <select
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-300"
                    >
                      {subcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'columns-1 sm:columns-2 lg:columns-3 gap-8'}>
          <AnimatePresence>
            {paginatedProjects.map((project, index) => (
              project && (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  variants={itemVariants}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                  viewMode={viewMode}
                />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No projects found matching your criteria. Try adjusting your filters or search query.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > projectsPerPage && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />
    </section>
  );
};

export default Portfolio;
