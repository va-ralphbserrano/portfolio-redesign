import { motion } from 'framer-motion';
import { PageTransitionProps, pageTransitionVariants } from './types';

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

PageTransition.displayName = 'PageTransition';

export default PageTransition;
