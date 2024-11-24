import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data';
import { fadeIn, staggerContainer } from '@/shared/utils/animations';
import { Badge } from '@/shared/components/display';
import { FaGraduationCap } from 'react-icons/fa';
import { classNames } from '@/shared/utils/helpers';

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
  achievements?: string[];
  subjects?: string[];
  icon?: React.ElementType;
}

export const Education: React.FC = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="relative space-y-8"
    >
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-500/25 to-transparent" />

      {education.map((item, index) => (
        <motion.div
          key={index}
          variants={fadeIn}
          className="relative pl-16"
        >
          {/* Timeline node */}
          <div className="absolute left-7 top-3 w-3 h-3 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50">
            <div className="absolute -inset-2 bg-primary-500/20 rounded-full animate-pulse" />
          </div>

          {/* Content card */}
          <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {item.degree}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.institution}
                </p>
                <div className="inline-flex items-center gap-2">
                  <Badge variant="outline" className="mt-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20">
                    {item.year}
                  </Badge>
                </div>
              </div>
              <span className="text-xl text-primary-500 dark:text-primary-400 bg-primary-500/10 p-2 rounded-xl">
                {item.icon ? React.createElement(item.icon) : <FaGraduationCap />}
              </span>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Achievements/Highlights */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="mb-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Achievements
                </h4>
                <div className="grid gap-2">
                  {item.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                      <p className="text-sm">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills/Subjects */}
            {item.subjects && item.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.subjects.map((subject, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className={classNames(
                      "text-xs py-0.5 bg-gray-100 dark:bg-gray-700/50",
                      "text-gray-700 dark:text-gray-300",
                      "hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400",
                      "transition-colors duration-200"
                    )}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

Education.displayName = 'Education';

export default Education;
