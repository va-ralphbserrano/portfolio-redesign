import { motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { ToolsProps, toolsVariants } from '../../types/index';
import { ToolCategory } from './ToolCategory';
import { toolCategories } from './toolData';

export const Tools: React.FC<ToolsProps> = ({
  className
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={toolsVariants}
      className={classNames('space-y-8', className)}
    >
      <div className="space-y-12">
        {toolCategories.map((category) => (
          <ToolCategory
            key={category.name}
            category={category}
          />
        ))}
      </div>
    </motion.div>
  );
};

Tools.displayName = 'Tools';

export default Tools;
