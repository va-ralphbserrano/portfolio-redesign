import React from 'react';
import { Project } from './data/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
