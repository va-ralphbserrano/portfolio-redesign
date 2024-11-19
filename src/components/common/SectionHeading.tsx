import React from 'react';
import { motion } from 'framer-motion';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface SectionHeadingProps extends WithClassName {
  title: string;
  subtitle?: string;
  description?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  description,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={classNames('text-center', className)}
    >
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
