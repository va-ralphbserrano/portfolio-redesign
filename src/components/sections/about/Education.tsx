import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';
import { classNames } from '@/utils/helpers';
import { EducationProps, aboutItemVariants } from './types';
import { aboutData } from './data';

export const Education: React.FC<EducationProps> = ({
  className
}) => {
  return (
    <div className={classNames("relative space-y-12", className)}>
      <div className="absolute left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400/50 to-transparent dark:from-primary-400 dark:via-primary-500/30" />
      
      {aboutData.education.map((edu, index) => (
        <motion.div
          key={`${edu.degree}-${edu.school}-${edu.period}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.2,
            ease: "easeOut"
          }}
          className="relative pl-16 group"
        >
          <motion.div 
            key={`dot-${edu.degree}-${index}`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="absolute left-[29px] -translate-x-1/2 top-3 w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-125 transition-transform duration-300"
          />
          
          <motion.div 
            key={`icon-${edu.degree}-${index}`}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2 + 0.2 }}
            className="absolute left-4 top-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 backdrop-blur-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300"
          >
            <HiAcademicCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </motion.div>

          <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-100/80 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
            <motion.span 
              key={`year-${edu.degree}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-600 dark:text-primary-400 mb-4"
            >
              {edu.period}
            </motion.span>
            <motion.h4 
              key={`title-${edu.degree}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {edu.degree}
            </motion.h4>
            <motion.p 
              key={`school-${edu.degree}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.6 }}
              className="text-primary-600 dark:text-primary-400 font-medium mb-3"
            >
              {edu.school}
            </motion.p>
            <motion.p 
              key={`description-${edu.degree}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.7 }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {edu.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

Education.displayName = 'Education';

export default Education;
