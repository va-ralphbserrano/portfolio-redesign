import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from './data';

export const Skills: React.FC = () => {
  return (
    <div className="grid gap-8">
      {Object.entries(aboutData.skills).map(([category, { description, items }], categoryIndex) => (
        <div key={category} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {category}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          
          <div className="grid gap-6">
            {items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: (categoryIndex * items.length + index) * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </h4>
                  {'percentage' in skill && (
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {skill.percentage}%
                    </span>
                  )}
                </div>
                
                {'percentage' in skill && (
                  <div className="h-2 relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700/50">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 dark:from-primary-400 dark:to-primary-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: (categoryIndex * items.length + index) * 0.1 + 0.3,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white dark:bg-gray-900 border-2 border-primary-500 dark:border-primary-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Skills.displayName = 'Skills';

export default Skills;
