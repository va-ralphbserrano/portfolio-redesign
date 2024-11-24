import { classNames } from '@/shared/utils/helpers';
import { motion } from 'framer-motion';
import { HeroActions } from './HeroActions';
import { HeroDescription } from './HeroDescription';
import { HeroStats } from './HeroStats';
import { HeroTitle } from './HeroTitle';
import { HeroContentProps, heroContentVariants } from './types';

export const HeroContent: React.FC<HeroContentProps> = ({
  className
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={heroContentVariants}
      className={classNames('space-y-8', className)}
    >
      <HeroTitle />
      <HeroDescription />
      <HeroActions />
      <HeroStats className="mt-12" />
    </motion.div>
  );
};

HeroContent.displayName = 'HeroContent';

export default HeroContent;
