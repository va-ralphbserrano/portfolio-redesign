import React from 'react';
import { motion } from 'framer-motion';
import { ProjectGallery } from './ProjectGallery';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/common/SectionHeading';

export const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeading
            title="Technical Design Portfolio"
            subtitle="A showcase of my AutoCAD and Inventor projects"
            className="mb-6"
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my collection of technical designs, ranging from kitchen equipment and industrial components to architectural elements. Each project demonstrates precision, innovation, and practical problem-solving.
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <ProjectGallery projects={projects} itemsPerPage={6} />
        </motion.div>

        {/* Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  );
};

export default Portfolio;
