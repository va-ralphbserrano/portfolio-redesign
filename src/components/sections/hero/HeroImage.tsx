import React from 'react';
import { motion } from 'framer-motion';
import { WithClassName } from '@/types/component';
import { heroData } from '@/data/hero';

interface HeroImageProps extends WithClassName {
  priority?: boolean;
}

const HeroImage: React.FC<HeroImageProps> = ({ className, priority = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="relative w-full h-full max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-3xl transform -rotate-6" />
        <img
          src={heroData.image.src}
          alt={heroData.image.alt}
          width={400}
          height={400}
          loading={priority ? 'eager' : 'lazy'}
          className="relative w-full h-auto rounded-3xl shadow-xl"
        />
      </div>
    </motion.div>
  );
};

HeroImage.displayName = 'HeroImage';

export default HeroImage;
