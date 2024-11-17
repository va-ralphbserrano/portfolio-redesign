import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { LoaderProps } from './types';

const Loader: React.FC<LoaderProps> = ({
  type = 'spinner',
  size = 'md',
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

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
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

      case 'dots':
        return (
          <div className={classNames('flex items-center space-x-1', className)}>
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
        );

      case 'pulse':
        return (
          <motion.div
            className={classNames(
              'inline-block rounded-full',
              getSizeClass(size),
              getColorClass(color),
              className
            )}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );

      default:
        return null;
    }
  };

  return renderLoader();
};

Loader.displayName = 'Loader';

export default Loader;
