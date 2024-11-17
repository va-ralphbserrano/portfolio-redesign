import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';
import { PreloaderProps, preloaderVariants } from './types';

export const Preloader: React.FC<PreloaderProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={preloaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classNames(
        'fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </motion.div>
  );
};

Preloader.displayName = 'Preloader';

export default Preloader;
