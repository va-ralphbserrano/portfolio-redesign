import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { HeroStatProps, heroStatVariants } from './types';

export const HeroStat: React.FC<HeroStatProps> = ({
  label,
  value,
  className
}) => {
  return (
    <motion.div
      variants={heroStatVariants}
      className={classNames('text-center', className)}
    >
      <motion.div
        variants={heroStatVariants}
        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1"
      >
        {value}
      </motion.div>
      <motion.div
        variants={heroStatVariants}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

HeroStat.displayName = 'HeroStat';

export default HeroStat;
