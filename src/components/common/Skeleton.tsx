import React from 'react';
import { motion, Variants } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { WithClassName } from '@/types/component';

interface SkeletonProps extends WithClassName {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

const skeletonVariants: Variants = {
  initial: {
    opacity: 0.5
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.375rem',
  className
}) => {
  return (
    <motion.div
      style={{
        width,
        height,
        borderRadius
      }}
      className={classNames(
        'bg-gray-200 dark:bg-gray-700',
        className
      )}
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
    />
  );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
