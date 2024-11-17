import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import { ModalContentProps } from './types';
import { modalVariants } from './animations';
import { sizes } from './types';

export const ModalContent: React.FC<ModalContentProps> = ({
  size,
  className,
  children,
  ...props
}) => (
  <motion.div
    className={classNames(
      'relative bg-white dark:bg-gray-800 rounded-xl shadow-xl',
      sizes[size],
      'w-full',
      className
    )}
    variants={modalVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);
