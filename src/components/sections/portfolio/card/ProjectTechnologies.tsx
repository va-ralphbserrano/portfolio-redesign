import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface Technology {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface ProjectTechnologiesProps extends WithClassName {
  technologies: Technology[];
}

export const ProjectTechnologies: React.FC<ProjectTechnologiesProps> = ({
  technologies,
  className
}) => {
  return (
    <div className={classNames('flex flex-wrap gap-2', className)}>
      {technologies.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <div
            key={index}
            className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400"
          >
            <Icon className={`w-4 h-4 ${tech.color}`} />
            <span>{tech.name}</span>
          </div>
        );
      })}
    </div>
  );
};

ProjectTechnologies.displayName = 'ProjectTechnologies';

export default ProjectTechnologies;
