import React from 'react';
import { motion } from 'framer-motion';
import { HeroImageProps, heroImageVariants } from './types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { classNames } from '@/utils/helpers';
import heroImage from '@/assets/images/hero.png';

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
          <img
            src={heroImage}
            alt="Ralph Bernard Serrano - Virtual Assistant & Web Developer"
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

HeroImage.displayName = 'HeroImage';

export default HeroImage;
