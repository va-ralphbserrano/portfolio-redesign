import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { classNames } from '@/utils/helpers';
import { ExperienceProps, aboutItemVariants } from './types';
import { aboutData } from '@/data/about';

export const Experience: React.FC<ExperienceProps> = ({
  className
}) => {
  return (
    <div className={classNames("relative space-y-8", className)}>
      <div className="absolute left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />
      
      {aboutData.experience.map((exp, index) => (
        <motion.div
          key={exp.title}
          initial="hidden"
          animate="visible"
          variants={aboutItemVariants}
          transition={{ delay: index * 0.2 }}
          className="relative pl-16"
        >
          <div className="absolute left-[29px] -translate-x-1/2 top-3 w-4 h-4 rounded-full bg-primary-500 border-2 border-white dark:border-gray-800 shadow-md" />
          
          <div className="absolute left-0 top-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
            <HiBriefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-3">
              {exp.year}
            </span>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{exp.title}</h4>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

Experience.displayName = 'Experience';

export default Experience;
