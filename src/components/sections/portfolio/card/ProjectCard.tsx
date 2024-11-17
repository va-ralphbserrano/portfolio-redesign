import { motion, Variants } from 'framer-motion';
import { WithClassName } from '@/types/component';
import Card from '@/components/common/Card';
import { ProjectImage } from './ProjectImage';
import { ProjectActions } from './ProjectActions';
import { ProjectTechnologies } from './ProjectTechnologies';

interface Technology {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface ProjectCardProps extends WithClassName {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  technologies: Technology[];
  demoUrl?: string;
  githubUrl?: string;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  demoUrl,
  githubUrl,
  className
}) => {
  return (
    <motion.div variants={variants} className={className}>
      <Card>
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <ProjectImage image={image} />
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>

          <ProjectTechnologies technologies={technologies} />

          <ProjectActions
            demoUrl={demoUrl}
            githubUrl={githubUrl}
            className="mt-6"
          />
        </div>
      </Card>
    </motion.div>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
