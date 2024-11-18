import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { wrap } from 'popmotion';
import { classNames } from '@/utils/helpers';

interface SwipeableGalleryProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export const SwipeableGallery: React.FC<SwipeableGalleryProps> = ({ images, className }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = 0; // wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]?.src}
          alt={images[imageIndex]?.alt || ''}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full object-cover"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset: { x }, velocity }) => {
            const swipe = Math.abs(x) * velocity.x;
            if (swipe < -10000) {
              paginate(1);
            } else if (swipe > 10000) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => paginate(-1)}
      >
        Previous
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => paginate(1)}
      >
        Next
      </button>
    </div>
  );
};

SwipeableGallery.displayName = 'SwipeableGallery';

export default SwipeableGallery;
