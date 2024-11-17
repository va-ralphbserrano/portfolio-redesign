import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { ProjectDetailsProps, projectDetailsVariants } from './types';

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  description,
  className
}) => {
  return (
    <motion.div
      variants={projectDetailsVariants}
      className={classNames('space-y-2', className)}
    >
      <motion.h3
        variants={projectDetailsVariants}
        className="text-xl font-semibold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h3>
      <motion.p
        variants={projectDetailsVariants}
        className="text-gray-600 dark:text-gray-400 line-clamp-3"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

ProjectDetails.displayName = 'ProjectDetails';

export default ProjectDetails;
