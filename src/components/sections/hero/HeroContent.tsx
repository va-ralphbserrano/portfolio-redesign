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
      className={classNames(
        'relative z-10',
        'space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8',
        'max-w-full lg:max-w-[90%] xl:max-w-[85%]',
        'mobile-padding',
        className
      )}
    >
      <motion.span
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className={classNames(
          'inline-block',
          'px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2',
          'rounded-full',
          'bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm',
          'border border-white/10 dark:border-gray-700/20',
          'text-gray-800 dark:text-gray-200',
          'text-[11px] xs:text-sm sm:text-base',
          'font-medium tracking-wide',
          'shadow-lg',
          'transform transition-all duration-300',
          'hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-gray-900/30',
          'hover:border-primary-500/30 dark:hover:border-primary-500/30',
          'motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-0.5',
          'touch-target'
        )}
        role="text"
      >
        {heroData.subtitle}
      </motion.span>

      <motion.h1
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className={classNames(
          'heading-responsive',
          'text-balance text-pretty',
          'max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] mx-auto lg:mx-0'
        )}
      >
        <span className="text-gray-900 dark:text-white transition-colors duration-300">{heroData.title.prefix} </span>
        <span className={classNames(
          'gradient-text',
          'motion-safe:hover:scale-[1.01] inline-block'
        )}>
          {heroData.title.name}
        </span>
        {heroData.title.suffix && (
          <span className="text-gray-900 dark:text-white transition-colors duration-300"> {heroData.title.suffix}</span>
        )}
      </motion.h1>

      <motion.p
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className={classNames(
          'text-responsive',
          'text-gray-600 dark:text-gray-300',
          'max-w-[95%] xs:max-w-[90%] sm:max-w-2xl',
          'mx-auto lg:mx-0',
          '!leading-relaxed',
          'transition-all duration-300'
        )}
      >
        {heroData.description}
      </motion.p>

      <motion.div
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className={classNames(
          'grid-responsive',
          'max-w-[95%] xs:max-w-[90%] sm:max-w-2xl mx-auto lg:mx-0'
        )}
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
            className={classNames(
              'flex flex-col items-center',
              'p-2 xs:p-3 sm:p-4',
              'bg-white/5 dark:bg-gray-900/10 backdrop-blur-sm',
              'rounded-lg border border-white/10 dark:border-gray-700/20',
              'hover:border-primary-500/30 dark:hover:border-primary-500/30',
              'transition-all duration-300',
              'hover-scale',
              'group'
            )}
          >
            <span className={classNames(
              'text-responsive',
              'font-bold text-primary-500',
              'transition-transform duration-300',
              'group-hover:scale-[1.05]'
            )}>
              {stat.value}
            </span>
            <span className={classNames(
              'text-[10px] xs:text-xs sm:text-sm',
              'text-gray-600 dark:text-gray-400',
              'font-medium mt-1',
              'transition-colors duration-300',
              'group-hover:text-primary-500 dark:group-hover:text-primary-400'
            )}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? {} : heroItemVariants}
        className={classNames(
          'flex flex-col xs:flex-row items-center justify-center lg:justify-start',
          'gap-3 xs:gap-4 sm:gap-5',
          'max-w-[95%] xs:max-w-[90%] sm:max-w-2xl mx-auto lg:mx-0'
        )}
      >
        <button
          onClick={handleContact}
          className={classNames(
            'btn w-full xs:w-auto',
            'px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3',
            'text-sm xs:text-base',
            'shadow-lg hover:shadow-xl'
          )}
        >
          Let's Talk
          <HiArrowRight className="w-4 h-4 xs:w-5 xs:h-5" />
        </button>
        <a
          href="/resume.pdf"
          download
          className={classNames(
            'btn-outline w-full xs:w-auto',
            'px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3',
            'text-sm xs:text-base'
          )}
        >
          Download CV
          <HiDownload className="w-4 h-4 xs:w-5 xs:h-5" />
        </a>
      </motion.div>
    </motion.div>
  );
};

HeroContent.displayName = 'HeroContent';

export default HeroContent;
