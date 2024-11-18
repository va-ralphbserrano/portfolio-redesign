import React from 'react';
import { motion } from 'framer-motion';
import { WithClassName } from '@/types/component';

interface LoadingProps extends WithClassName {
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ 
  className = '', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`border-4 border-gray-300 border-t-primary rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;
