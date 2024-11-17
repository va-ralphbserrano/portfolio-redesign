import React from 'react';
import { motion } from 'framer-motion';
import HeroImage from './hero/HeroImage';
import { HeroContent } from './hero/HeroContent';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : variants}
            className="flex items-center"
          >
            <HeroContent />
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : variants}
            className="flex items-center justify-center lg:justify-end"
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';

export default Hero;
