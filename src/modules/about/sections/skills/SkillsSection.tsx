import React, { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { aboutItemVariants } from '../../types';
import { skills } from '../../data/index';
import { classNames } from '@/shared/utils/helpers';
import Skills from './Skills';

const SkillSphere = React.lazy(() => import('./SkillSphere').then(mod => ({ 
  default: mod.SkillSphere 
})));

const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

export const SkillsSection: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Flatten skills data for the sphere
  const flattenedSkills = useMemo(() => {
    return skills.flatMap(category => 
      category.skills.map(skill => skill.name)
    );
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={aboutItemVariants}
          initial="hidden"
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              variants={aboutItemVariants}
              className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4"
            >
              Skills & Technologies
            </motion.span>
            <motion.h2 
              variants={aboutItemVariants}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Building Innovative Solutions
            </motion.h2>
            <motion.p 
              variants={aboutItemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-2"
            >
              From technical design to development, I bring a diverse skill set to every project. Explore my expertise across various domains and technologies.
            </motion.p>
          </div>

          {/* Skills List */}
          <Skills />

          {/* Skills Sphere Container */}
          <div className="relative w-full h-[600px] mt-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {isClient && (
                <Suspense fallback={<LoadingFallback />}>
                  <SkillSphere skills={flattenedSkills} />
                </Suspense>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

SkillsSection.displayName = 'SkillsSection';
