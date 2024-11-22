import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { AboutSectionProps, aboutSectionVariants } from './types';
import { getTechIcon } from '@/utils/icons';

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  subtitle,
  icon,
  children,
  className
}) => {
  const Icon = icon ? getTechIcon(icon) : null;

  return (
    <motion.div
      variants={aboutSectionVariants}
      className={classNames(
        'relative group',
        className
      )}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl opacity-10 blur group-hover:opacity-20 transition-opacity duration-500" />
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/80 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-500">
        <div className="flex items-center gap-4 mb-6">
          {Icon && (
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-100/50 dark:border-primary-800/50">
              <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

AboutSection.displayName = 'AboutSection';

export default AboutSection;
