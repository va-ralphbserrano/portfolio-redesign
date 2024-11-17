import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCharProps } from './types';
import { charAnimation } from './animations';

export const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, index }) => (
  <motion.span
    custom={index}
    variants={charAnimation}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);
