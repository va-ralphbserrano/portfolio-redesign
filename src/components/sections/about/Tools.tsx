import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { ToolsProps, aboutToolVariants } from './types';
import { aboutData } from '@/data/about';
import { getTechIcon } from '@/utils/icons';

export const Tools: React.FC<ToolsProps> = ({
  className
}) => {
  return (
    <div className={classNames("space-y-12", className)}>
      {Object.entries(aboutData.tools).map(([category, toolsList], categoryIndex) => (
        <motion.div
          key={category}
          initial="hidden"
          animate="visible"
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {toolsList.map((tool, toolIndex) => {
              const Icon = getTechIcon(tool.icon);
              return (
                <motion.div
                  key={tool.name}
                  variants={aboutToolVariants}
                  transition={{ delay: toolIndex * 0.05 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {Icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20 mb-3">
                      <Icon className="w-8 h-8 text-primary-500 dark:text-primary-400" />
                    </div>
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">
                    {tool.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

Tools.displayName = 'Tools';

export default Tools;
