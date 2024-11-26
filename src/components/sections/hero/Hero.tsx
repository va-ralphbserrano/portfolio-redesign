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
    <section className="relative min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-6rem)] 
                      flex items-center 
                      py-4 xs:py-6 sm:py-8 lg:py-12 xl:py-16 
                      overflow-hidden">
      {/* Background Elements */}
      <BackgroundElements className="z-0" />
      
      <div className="container relative 
                      px-3 xs:px-4 sm:px-6 lg:px-8 
                      transition-[padding] duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 
                      gap-6 xs:gap-8 sm:gap-10 lg:gap-12 
                      items-center 
                      transition-[gap] duration-300">
          {/* Content Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : variants}
            className="lg:col-span-7 xl:col-span-8 
                      space-y-4 xs:space-y-5 sm:space-y-6 
                      text-center lg:text-left 
                      order-2 lg:order-1
                      transition-all duration-300"
          >
            <HeroContent />
          </motion.div>
          
          {/* Image Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : variants}
            className="lg:col-span-5 xl:col-span-4 
                      flex items-center justify-center lg:justify-end 
                      order-1 lg:order-2
                      transition-all duration-300"
          >
            <div className="relative w-full 
                          max-w-[260px] xs:max-w-[280px] sm:max-w-md lg:max-w-full 
                          mx-auto lg:mx-0 
                          transition-all duration-300 
                          hover:scale-[1.02] hover:rotate-1
                          motion-safe:hover:-translate-y-1">
              <div 
                className="absolute -z-10 inset-0 
                          bg-gradient-to-br from-primary-500/20 via-primary-700/10 to-primary-900/20 
                          rounded-2xl xs:rounded-3xl 
                          transform -rotate-6 scale-105 blur-[2px] 
                          transition-all duration-300
                          group-hover:scale-110 group-hover:rotate-3" 
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
