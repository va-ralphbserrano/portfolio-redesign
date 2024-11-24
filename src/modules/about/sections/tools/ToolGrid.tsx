import { motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { ToolGridProps, toolItemVariants } from '../../types/index';

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  className
}) => {
  return (
    <div className={classNames('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4', className)}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <motion.div
            key={tool.name}
            variants={toolItemVariants}
            whileHover="hover"
            className="relative group"
          >
            <div className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative w-12 h-12 mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-full h-full">
                  <Icon className={classNames('w-8 h-8', `text-[${tool.color}] dark:text-[${tool.color}]`)} />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                {tool.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

ToolGrid.displayName = 'ToolGrid';

export default ToolGrid;
