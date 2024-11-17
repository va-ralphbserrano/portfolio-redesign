import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiDownload, HiArrowRight } from 'react-icons/hi';
import { classNames } from '../../../../utils/helpers';
import { HeroActionsProps, heroButtonVariants } from './types';

export const HeroActions: React.FC<HeroActionsProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={heroButtonVariants}
      className={classNames('flex flex-wrap gap-4', className)}
    >
      <motion.a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        variants={heroButtonVariants}
        whileHover="hover"
        whileTap="tap"
        className="inline-flex items-center px-6 py-3 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-300"
      >
        <HiDownload className="w-5 h-5 mr-2" />
        Download Resume
      </motion.a>

      <Link to="/contact">
        <motion.button
          variants={heroButtonVariants}
          whileHover="hover"
          whileTap="tap"
          className="inline-flex items-center px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Let&apos;s create something extraordinary together!
          </p>
          <HiArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </Link>
    </motion.div>
  );
};

HeroActions.displayName = 'HeroActions';

export default HeroActions;
