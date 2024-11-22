import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';

// Types
type LoadingColor = 'primary' | 'secondary' | 'white';
type LoadingSize = 'sm' | 'md' | 'lg';
type LoadingType = 'spinner' | 'dots' | 'pulse';

interface WithClassName {
  className?: string;
}

interface LoadingProps extends WithClassName {
  type?: LoadingType;
  size?: LoadingSize;
  color?: LoadingColor;
}

interface LoadingTextProps extends WithClassName {
  text?: string;
  color?: LoadingColor;
}

// Constants
const colors = {
  primary: 'text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400',
  secondary: 'text-gray-500 border-gray-500 dark:text-gray-400 dark:border-gray-400',
  white: 'text-white border-white'
} as const;

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
} as const;

// Loading Spinner Component
export const LoadingSpinner: React.FC<LoadingProps> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  return (
    <motion.div
      className={classNames(
        'inline-block',
        sizes[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div
        className={classNames(
          'w-full h-full rounded-full',
          'border-2 border-solid',
          'border-t-transparent',
          colors[color]
        )}
      />
    </motion.div>
  );
};

// Loading Text Component
export const LoadingText: React.FC<LoadingTextProps> = ({
  text = 'Loading',
  color = 'primary',
  className
}) => {
  return (
    <div className={classNames('flex items-center space-x-2', className)}>
      <LoadingSpinner size="sm" color={color} />
      <span className={classNames('font-medium', colors[color].split(' ')[0])}>
        {text}
      </span>
    </div>
  );
};

// Main Loading Component
export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  className
}) => {
  const variants = {
    spinner: (
      <LoadingSpinner size={size} color={color} className={className} />
    ),
    dots: (
      <div className={classNames('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={classNames(
              'rounded-full',
              sizes[size],
              colors[color].split(' ')[0]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    ),
    pulse: (
      <motion.div
        className={classNames(
          'rounded-full',
          sizes[size],
          colors[color].split(' ')[0],
          className
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.6, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    )
  };

  return (
    <div role="status" aria-label="Loading">
      {variants[type]}
    </div>
  );
};
