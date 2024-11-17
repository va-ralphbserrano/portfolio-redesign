import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { LoadingProps } from './types';

const LoadingSpinner: React.FC<LoadingProps> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'border-primary-500 dark:border-primary-400';
      case 'secondary':
        return 'border-gray-500 dark:border-gray-400';
      case 'white':
        return 'border-white';
      default:
        return 'border-primary-500 dark:border-primary-400';
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <motion.div
      className={classNames(
        'inline-block',
        getSizeClass(size),
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div className={classNames(
        'w-full h-full rounded-full border-2 border-t-transparent',
        getColorClass(color)
      )} />
    </motion.div>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
