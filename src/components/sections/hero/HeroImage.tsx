import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { useReducedMotion } from '@/core/hooks/useReducedMotion';
import heroImage from '@/shared/assets/images/hero.png';
import { classNames } from '@/shared/utils/helpers';
import { motion } from 'framer-motion';
import React from 'react';
import { HeroImageProps, heroImageVariants } from './types';

const HeroImage: React.FC<HeroImageProps> = ({
  className,
  width = 400,
  height = 400,
  loading = 'eager'
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? {} : heroImageVariants}
      className={classNames(
        'relative w-full',
        'transition-transform duration-300',
        'motion-safe:hover:scale-[1.01]',
        className
      )}
    >
      <div className={classNames(
        'relative w-full',
        'max-w-[280px] xs:max-w-sm sm:max-w-md lg:max-w-lg',
        'mx-auto',
        'transform transition-all duration-300',
        'motion-safe:hover:rotate-1'
      )}>
        <div className={classNames(
          'relative w-full aspect-square',
          'overflow-hidden',
          'rounded-2xl xs:rounded-3xl',
          'shadow-lg sm:shadow-xl',
          'transition-all duration-300',
          'motion-safe:hover:-rotate-2',
          'group'
        )}>
          {/* Background gradient animation */}
          <div className={classNames(
            'absolute inset-0',
            'bg-gradient-to-br from-primary-500/10 via-transparent to-primary-900/10',
            'animate-gradient-xy',
            'group-hover:opacity-75',
            'transition-opacity duration-300'
          )} />
          
          {/* Glass effect overlay */}
          <div className={classNames(
            'absolute inset-0',
            'bg-white/5 dark:bg-gray-900/5',
            'backdrop-blur-[1px]',
            'z-10',
            'group-hover:backdrop-blur-[2px]',
            'transition-all duration-300'
          )} />
          
          {/* Image */}
          <ResponsiveImage
            src={heroImage}
            alt="Hero Image"
            className={classNames(
              'w-full h-full',
              'object-cover object-center',
              '!filter-none',
              'relative z-0',
              'transition-all duration-300',
              'group-hover:scale-[1.05]',
              'group-hover:rotate-1'
            )}
            priority={true}
            width={width}
            height={height}
            loading={loading}
            sizes="(max-width: 480px) 280px, 
                   (max-width: 640px) 384px, 
                   (max-width: 768px) 448px, 
                   (max-width: 1024px) 512px, 
                   640px"
            quality={90}
          />

          {/* Decorative elements */}
          <div className={classNames(
            'absolute top-0 left-0 w-full h-full',
            'pointer-events-none z-20'
          )}>
            <div className={classNames(
              'absolute -top-1 -left-1',
              'w-12 xs:w-16 sm:w-20',
              'h-12 xs:h-16 sm:h-20',
              'bg-primary-500/10',
              'rounded-full blur-xl',
              'transition-all duration-300',
              'group-hover:scale-110',
              'group-hover:bg-primary-500/20'
            )} />
            <div className={classNames(
              'absolute -bottom-1 -right-1',
              'w-12 xs:w-16 sm:w-20',
              'h-12 xs:h-16 sm:h-20',
              'bg-primary-500/10',
              'rounded-full blur-xl',
              'transition-all duration-300',
              'group-hover:scale-110',
              'group-hover:bg-primary-500/20'
            )} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

HeroImage.displayName = 'HeroImage';

export default HeroImage;
