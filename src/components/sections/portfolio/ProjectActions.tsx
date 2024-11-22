import React from 'react';
import { HiCode, HiExternalLink } from 'react-icons/hi';
import { classNames } from '@/utils/helpers';

interface ProjectActionsProps {
  githubUrl?: string;
  demoUrl?: string;
  className?: string;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({
  githubUrl,
  demoUrl,
  className
}) => {
  if (!githubUrl && !demoUrl) return null;

  return (
    <div className={classNames('flex items-center gap-2', className)}>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors duration-200"
          title="View Source Code"
        >
          <HiCode className="w-4 h-4" />
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors duration-200"
          title="View Live Demo"
        >
          <HiExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

ProjectActions.displayName = 'ProjectActions';

export default ProjectActions;
