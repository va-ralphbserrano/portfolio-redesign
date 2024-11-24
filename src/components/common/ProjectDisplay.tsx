import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '../../types/project';
import { TechnologyDisplay } from './TechnologyDisplay';

interface ProjectDisplayProps {
  project: Project;
  index: number;
}

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-8 py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Project Image */}
      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index < 2}
          />
        </div>
      </div>

      {/* Project Info */}
      <div
        className={`w-full md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'} ${
          isEven ? 'md:pl-8' : 'md:pr-8'
        }`}
      >
        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <TechnologyDisplay key={idx} technology={tech} />
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
