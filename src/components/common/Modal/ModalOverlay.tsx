import React from 'react';
import { motion } from 'framer-motion';
import { ModalOverlayProps } from './types';
import { overlayVariants } from './animations';

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick, ...props }) => (
  <motion.div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
    variants={overlayVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    onClick={onClick}
    {...props}
  />
);
