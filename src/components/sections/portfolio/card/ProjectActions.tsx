import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import { HiExternalLink, HiCode } from 'react-icons/hi';

interface ProjectActionsProps extends WithClassName {
  demoUrl?: string | undefined;
  githubUrl?: string | undefined;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({
  demoUrl,
  githubUrl,
  className
}) => {
  if (!demoUrl && !githubUrl) return null;

  return (
    <div className={classNames('flex space-x-4', className)}>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <HiExternalLink className="w-5 h-5" />
          <span>Live Demo</span>
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <HiCode className="w-5 h-5" />
          <span>Source Code</span>
        </a>
      )}
    </div>
  );
};

ProjectActions.displayName = 'ProjectActions';

export default ProjectActions;
