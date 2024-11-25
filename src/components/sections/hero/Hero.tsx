import React from 'react';
import { motion } from 'framer-motion';
import { HeroContent } from './HeroContent';
import HeroImage from './HeroImage';
import { useReducedMotion } from '@/core/hooks/useReducedMotion';
import { BackgroundElements } from './BackgroundElements';

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
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center py-16 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <BackgroundElements />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : variants}
            className="lg:col-span-7 xl:col-span-8"
          >
            <HeroContent />
          </motion.div>
          
          {/* Image Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : variants}
            className="lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div 
                className="absolute -z-10 inset-0 bg-gradient-to-br from-primary-500/20 via-primary-700/10 to-primary-900/20 
                rounded-3xl transform -rotate-6 scale-105" 
              />
              <HeroImage />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';

export default Hero;
