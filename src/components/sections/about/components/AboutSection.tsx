import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { AboutSectionProps, aboutSectionVariants } from './types';

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  children,
  className
}) => {
  return (
    <motion.div
      variants={aboutSectionVariants}
      className={classNames(
        'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700',
        className
      )}
    >
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

AboutSection.displayName = 'AboutSection';

export default AboutSection;
