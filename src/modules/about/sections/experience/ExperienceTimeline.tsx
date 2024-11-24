import { classNames } from '@/shared/utils/helpers';
import { WithClassName } from '@/types/component';
import { motion } from 'framer-motion';
import { ExperienceCard } from './ExperienceCard';
import { Experience, experienceTimelineVariants } from '../../types/index';

interface ExperienceTimelineProps extends WithClassName {
  experiences: Experience[];
}

const containerVariants = experienceTimelineVariants;

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  className
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={classNames('relative', className)}
    >
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={experience.title}
          experience={experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </motion.div>
  );
};

ExperienceTimeline.displayName = 'ExperienceTimeline';

export default ExperienceTimeline;
