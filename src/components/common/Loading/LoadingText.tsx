import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { LoadingTextProps } from './types';

const LoadingText: React.FC<LoadingTextProps> = ({
  text,
  color = 'primary',
  className
}) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-500 dark:text-primary-400';
      case 'secondary':
        return 'text-gray-500 dark:text-gray-400';
      case 'white':
        return 'text-white';
      default:
        return 'text-primary-500 dark:text-primary-400';
    }
  };

  return (
    <div className={classNames('text-center', className)}>
      <div className="flex items-center justify-center space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={classNames(
              'w-2 h-2 rounded-full',
              getColorClass(color)
            )}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>
      {text && (
        <p className={classNames(
          'mt-4 text-sm font-medium',
          getColorClass(color)
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

LoadingText.displayName = 'LoadingText';

export default LoadingText;

