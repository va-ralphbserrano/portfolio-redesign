import React from 'react';
import { motion } from 'framer-motion';
import { ProjectGallery } from './ProjectGallery';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/common/SectionHeading';

export const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Technical Design Portfolio"
          subtitle="A showcase of my AutoCAD and Inventor projects"
          className="mb-12"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProjectGallery projects={projects} itemsPerPage={6} />
        </motion.div>
      </div>
    </section>
  );
};
