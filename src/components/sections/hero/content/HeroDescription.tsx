import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { HeroDescriptionProps, heroTextVariants } from './types';

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  className
}) => {
  return (
    <motion.p
      variants={heroTextVariants}
      className={classNames(
        'text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed',
        className
      )}
    >
      Passionate about crafting exceptional digital experiences with modern web technologies.
      Specializing in full-stack development and virtual assistance to help businesses grow and succeed.
    </motion.p>
  );
};

HeroDescription.displayName = 'HeroDescription';

export default HeroDescription;
