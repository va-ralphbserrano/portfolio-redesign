import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { classNames } from '@/shared/utils/helpers';
import { ExperienceIconProps, experienceIconVariants } from '../../types/index';

export const ExperienceIcon: React.FC<ExperienceIconProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={experienceIconVariants}
      className={classNames(
        'absolute left-0 top-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center',
        className
      )}
    >
      <HiBriefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
    </motion.div>
  );
};

ExperienceIcon.displayName = 'ExperienceIcon';

export default ExperienceIcon;
