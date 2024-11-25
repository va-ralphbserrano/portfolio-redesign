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
      className={classNames('relative w-full', className)}
    >
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
          <ResponsiveImage
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover object-center !filter-none"
            priority={true}
            width={width}
            height={height}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
        </div>
      </div>
    </motion.div>
  );
};

HeroImage.displayName = 'HeroImage';

export default HeroImage;
