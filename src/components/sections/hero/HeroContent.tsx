import { useReducedMotion } from '@/core/hooks/useReducedMotion';
import { classNames } from '@/shared/utils/helpers';
import { motion } from 'framer-motion';
import React from 'react';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { heroData } from './data';
import { HeroContentProps, heroItemVariants } from './types';

export const HeroContent: React.FC<HeroContentProps> = ({ className, id }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={classNames('relative z-10 space-y-6', className)}
    >
      <motion.span
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/20 text-gray-800 dark:text-gray-200 text-sm sm:text-base font-medium tracking-wide shadow-lg"
        role="text"
      >
        {heroData.subtitle}
      </motion.span>

      <motion.h1
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-display leading-tight"
      >
        <span className="text-gray-900 dark:text-white">{heroData.title.prefix} </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600">
          {heroData.title.name}
        </span>
        {heroData.title.suffix && (
          <span className="text-gray-900 dark:text-white"> {heroData.title.suffix}</span>
        )}
      </motion.h1>

      <motion.p
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed"
      >
        {heroData.description}
      </motion.p>

      <motion.div
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8"
      >
        {heroData.stats.map((stat, index) => (
          <motion.div
            key={`${stat.label}-${index}`}
            variants={prefersReducedMotion ? {} : {
              hidden: { scale: 0.8, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { delay: 0.1 * index }
              }
            }}
            className="flex flex-col items-center p-3 sm:p-4 bg-white/5 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg border border-white/10 dark:border-gray-700/20"
          >
            <span className="text-xl sm:text-2xl font-bold text-primary-500">{stat.value}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          onClick={handleContact}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm transition-colors duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label={heroData.cta.primary.text}
        >
          {heroData.cta.primary.text}
          <HiArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </motion.button>

        <motion.button
          onClick={() => navigate('/portfolio')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-5 py-2.5 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white rounded-xl text-sm backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label={heroData.cta.secondary.text}
        >
          {heroData.cta.secondary.text}
          <HiArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </motion.button>

        <motion.a
          href={heroData.cta.resume.href}
          download="RalphBernardSerrano-CV.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-5 py-2.5 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white rounded-xl text-sm backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label={heroData.cta.resume.text}
        >
          {heroData.cta.resume.text}
          <HiDownload className="ml-2 w-4 h-4" aria-hidden="true" />
        </motion.a>
      </div>
    </motion.div>
  );
};

HeroContent.displayName = 'HeroContent';

export default HeroContent;
