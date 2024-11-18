import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';
import { classNames } from '../../utils/helpers';
import { ScrollToTopProps, scrollToTopVariants } from './types';
import { throttle } from 'lodash';
// import type { ThrottleSettings } from 'lodash'; // added import statement

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  className,
  showBelow = 400
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showBelow) {
        if (!show) setShow(true);
      } else {
        if (show) setShow(false);
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [show, showBelow]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <motion.button
      onClick={handleClick}
      variants={scrollToTopVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className={classNames(
        'fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg z-50',
        'hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'transition-colors duration-300',
        className
      )}
      aria-label="Scroll to top"
    >
      <HiArrowUp className="w-6 h-6" />
    </motion.button>
  );
};

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;
