import { motion } from 'framer-motion';
import { cn } from '../../../../shared/utils/helpers/cn';
import { aboutItemVariants } from '../../types';

interface AboutHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export const AboutHeader: React.FC<AboutHeaderProps> = ({
  title,
  subtitle,
  description
}) => {
  return (
    <motion.div
      variants={aboutItemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 text-center"
    >
      <motion.span
        variants={aboutItemVariants}
        className={cn(
          'inline-block px-4 py-2 rounded-full',
          'bg-primary-100 dark:bg-primary-900/10',
          'text-primary-600 dark:text-primary-400',
          'text-sm font-medium'
        )}
      >
        {title}
      </motion.span>

      <motion.h2
        variants={aboutItemVariants}
        className="text-4xl font-bold text-gray-900 dark:text-white"
      >
        {subtitle}
      </motion.h2>

      <motion.p
        variants={aboutItemVariants}
        className={cn(
          'text-gray-600 dark:text-gray-400',
          'max-w-2xl mx-auto'
        )}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

AboutHeader.displayName = 'AboutHeader';

export default AboutHeader;
