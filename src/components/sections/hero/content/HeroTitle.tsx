import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { HeroTitleProps, heroTextVariants } from './types';

export const HeroTitle: React.FC<HeroTitleProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={heroTextVariants}
      className={classNames('space-y-4', className)}
    >
      <motion.h1
        variants={heroTextVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
      >
        Hi, I&apos;m{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
          Ralph
        </span>
      </motion.h1>
      <motion.h2
        variants={heroTextVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300"
      >
        Full Stack Developer & Virtual Assistant
      </motion.h2>
    </motion.div>
  );
};

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
