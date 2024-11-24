import { motion } from 'framer-motion';
import { cn } from '../../../../shared/utils/helpers/cn';
import { AboutSectionProps, aboutItemVariants } from '../../types';

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  features,
  children
}) => {
  return (
    <motion.div
      variants={aboutItemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={aboutItemVariants} className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </motion.div>

      {features ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={aboutItemVariants}
              className={cn(
                'relative flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6',
                'shadow-sm dark:border-gray-800 dark:bg-gray-900'
              )}
            >
              {feature.icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-900 dark:bg-primary-900/20 dark:text-primary-400">
                  <feature.icon className="h-6 w-6" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

AboutSection.displayName = 'AboutSection';

export default AboutSection;
