import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { AboutGridProps, aboutVariants } from './types';

export const AboutGrid: React.FC<AboutGridProps> = ({
  children,
  className
}) => {
  return (
    <motion.div
      variants={aboutVariants}
      className={classNames('grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16', className)}
    >
      {children}
    </motion.div>
  );
};

AboutGrid.displayName = 'AboutGrid';

export default AboutGrid;
