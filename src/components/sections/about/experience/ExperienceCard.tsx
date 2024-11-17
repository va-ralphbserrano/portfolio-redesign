import { motion, Variants } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { WithClassName } from '@/types/component';
import { ExperienceIcon } from './ExperienceIcon';
import { ExperienceTimelineNode } from './ExperienceTimelineNode';

interface ExperienceCardProps extends WithClassName {
  experience: {
    title: string;
    company: string;
    year: string;
    description: string;
  };
  isLast: boolean;
}

const experienceCardVariants: Variants = {
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

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  isLast,
  className
}) => {
  return (
    <motion.div
      variants={experienceCardVariants}
      className={classNames('relative pl-16', className)}
    >
      <ExperienceTimelineNode isLast={isLast} />
      <ExperienceIcon />

      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-3">
          {experience.year}
        </span>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {experience.title}
        </h4>
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
          {experience.company}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
};

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;
