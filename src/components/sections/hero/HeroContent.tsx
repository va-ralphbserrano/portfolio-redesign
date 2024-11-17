import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { heroData } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getTechIcon } from '@/utils/icons';

export const HeroContent: React.FC = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleContact = () => {
    navigate('/va-rb-portfolio/contact');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? {} : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: 0.1
          }
        }
      }}
      className="relative z-10"
    >
      <motion.span
        variants={prefersReducedMotion ? {} : itemVariants}
        className="inline-block px-6 py-3 rounded-full bg-white/5 dark:bg-gray-900/20 backdrop-blur-[2px] border border-white/10 dark:border-gray-700/20 text-gray-800 dark:text-gray-200 text-base font-medium mb-8 tracking-wide shadow-lg"
      >
        {heroData.subtitle}
      </motion.span>

      <motion.h1
        variants={prefersReducedMotion ? {} : itemVariants}
        className="text-5xl md:text-7xl font-bold mb-6 font-display leading-tight"
      >
        <span className="text-gray-900 dark:text-white">{heroData.title.prefix} </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-blue-500">
          {heroData.title.name}
        </span>
        {heroData.title.suffix && (
          <span className="text-gray-900 dark:text-white"> {heroData.title.suffix}</span>
        )}
      </motion.h1>

      <motion.p
        variants={prefersReducedMotion ? {} : itemVariants}
        className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
      >
        {heroData.description}
      </motion.p>

      <motion.div
        variants={prefersReducedMotion ? {} : itemVariants}
        className="grid grid-cols-3 gap-8 mb-12"
      >
        {heroData.stats.map((stat, index) => (
          <motion.div
            key={`${stat.label}-${index}`}
            variants={prefersReducedMotion ? {} : {
              hidden: { scale: 0.8, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { delay: index * 0.1 }
              }
            }}
            className="text-center"
          >
            <h3 className="text-4xl font-bold text-primary-500 mb-2">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? {} : itemVariants}
        className="flex flex-wrap gap-4 mb-12"
      >
        {heroData.services.map((service, index) => {
          const Icon = getTechIcon(service.icon);
          return (
            <motion.div
              key={`${service.name}-${index}`}
              variants={prefersReducedMotion ? {} : {
                hidden: { scale: 0.8, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: index * 0.05 }
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 dark:bg-gray-900/20 backdrop-blur-[2px] rounded-lg border border-white/10 dark:border-gray-700/20"
            >
              {Icon && <Icon className="w-5 h-5 text-primary-500" />}
              <span className="text-sm text-gray-700 dark:text-gray-300">{service.name}</span>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? {} : itemVariants}
        className="flex flex-wrap gap-4"
      >
        <a
          href={heroData.cta.primary.link}
          download="RalphBernardSerrano-CV.pdf"
          className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
        >
          {heroData.cta.primary.text}
          <HiDownload className="ml-2" />
        </a>

        <button
          onClick={handleContact}
          className="inline-flex items-center px-8 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
        >
          {heroData.cta.secondary.text}
          <HiArrowRight className="ml-2" />
        </button>
      </motion.div>
    </motion.div>
  );
};

HeroContent.displayName = 'HeroContent';

export default HeroContent;