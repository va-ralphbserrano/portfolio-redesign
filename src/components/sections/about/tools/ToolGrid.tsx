import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { ToolGridProps, toolItemVariants } from './types';

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  className
}) => {
  return (
    <div className={classNames('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4', className)}>
      {tools.map((tool) => (
        <motion.div
          key={tool.name}
          variants={toolItemVariants}
          whileHover="hover"
          className="relative group"
        >
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-lg transition-colors duration-300">
            <tool.icon className={classNames('w-8 h-8 mb-2', tool.color)} />
            <span className="text-sm text-gray-700 dark:text-gray-300 text-center">
              {tool.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

ToolGrid.displayName = 'ToolGrid';

export default ToolGrid;
