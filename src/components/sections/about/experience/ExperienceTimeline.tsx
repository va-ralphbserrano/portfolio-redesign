import { motion, Variants } from 'framer-motion';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceItem {
  title: string;
  company: string;
  year: string;
  description: string;
}

interface ExperienceTimelineProps extends WithClassName {
  experiences: ExperienceItem[];
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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
