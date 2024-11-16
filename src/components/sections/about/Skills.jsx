import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: 'AutoCAD Design', percentage: 95, color: 'from-blue-500 to-blue-600' },
    { name: 'Business Administration', percentage: 90, color: 'from-purple-500 to-purple-600' },
    { name: 'Web Design', percentage: 85, color: 'from-pink-500 to-pink-600' },
    { name: 'Video Editing', percentage: 80, color: 'from-green-500 to-green-600' },
    { name: 'Web Development', percentage: 75, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Project Management', percentage: 85, color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
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

export default Skills;
