import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { ToolsProps, toolsVariants } from './types';
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
      <div className="text-center">
        <motion.h2
          variants={toolsVariants}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Tools & Technologies
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s a list of tools I&apos;ve worked with
        </p>
      </div>

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
