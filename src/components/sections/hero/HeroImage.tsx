import React from 'react';
import { motion } from 'framer-motion';
import { HeroImageProps, heroImageVariants } from './types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { classNames } from '@/utils/helpers';
import heroImage from '@/assets/images/hero.png';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';

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
      className={classNames('relative', className)}
    >
      <div className="relative w-full h-full max-w-md mx-auto">
        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
          <ResponsiveImage
            src={heroImage}
            alt="Hero"
            className={classNames(
              'w-full h-full object-cover',
              className
            )}
            priority={true}
          />
        </div>
      </div>
    </motion.div>
  );
};

HeroImage.displayName = 'HeroImage';

export default HeroImage;
