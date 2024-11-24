import { motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { ToolCategoryProps, toolsVariants } from '../../types/index';
import { ToolGrid } from './ToolGrid';

export const ToolCategory: React.FC<ToolCategoryProps> = ({
  category,
  className
}) => {
  return (
    <motion.div
      variants={toolsVariants}
      className={classNames('space-y-6', className)}
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-gray-600 dark:text-gray-400 text-base">
            {category.description}
          </p>
        )}
      </div>
      <ToolGrid tools={category.tools} />
    </motion.div>
  );
};

ToolCategory.displayName = 'ToolCategory';

export default ToolCategory;
