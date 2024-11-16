import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineDesktopComputer,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineCode
} from 'react-icons/hi';

const ProjectFilter = ({ selectedFilter, setSelectedFilter }) => {
  const filters = [
    { id: 'all', label: 'All Projects', icon: <HiOutlineClipboardList className="w-4 h-4" /> },
    { id: 'web', label: 'Web Development', icon: <HiOutlineGlobeAlt className="w-4 h-4" /> },
    { id: 'management', label: 'Management', icon: <HiOutlineDesktopComputer className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <HiOutlineAcademicCap className="w-4 h-4" /> },
    { id: 'demo', label: 'Demo Projects', icon: <HiOutlineCode className="w-4 h-4" /> }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => setSelectedFilter(filter.id)}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            ${selectedFilter === filter.id
              ? 'bg-primary-500/90 dark:bg-primary-600/90 text-white shadow-lg shadow-primary-500/25 dark:shadow-primary-600/25 scale-105'
              : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50'
            }
          `}
          whileHover={{ scale: selectedFilter === filter.id ? 1.05 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.icon}
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default ProjectFilter;
