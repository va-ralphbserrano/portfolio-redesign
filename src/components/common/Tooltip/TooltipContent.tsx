import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { TooltipContentProps, positions } from './types';
import { tooltipVariants } from './animations';

export const TooltipContent: React.FC<TooltipContentProps> = ({
  content,
  position,
  dark,
  arrow,
  maxWidth,
  className
}) => (
  <motion.div
    className={classNames(
      'absolute z-50 px-2 py-1 text-sm whitespace-normal break-words',
      dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
      dark ? 'border border-gray-800' : 'border border-gray-200',
      'rounded shadow-lg',
      positions[position].placement,
      className
    )}
    style={{ maxWidth }}
    variants={tooltipVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    {content}
    {arrow && (
      <span
        className={classNames(
          'absolute w-2 h-2 rotate-45 border-4 border-transparent',
          dark ? 'bg-gray-900' : 'bg-white',
          positions[position].arrow
        )}
      />
    )}
  </motion.div>
);

