import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { SkillsProps, aboutSkillVariants } from './types';
import { aboutData } from '@/data/about';

export const Skills: React.FC<SkillsProps> = ({
  className
}) => {
  return (
    <div className={classNames("grid grid-cols-1 gap-6", className)}>
      {aboutData.skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              custom={skill.percentage}
              variants={aboutSkillVariants}
              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-white/20 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

Skills.displayName = 'Skills';

export default Skills;
