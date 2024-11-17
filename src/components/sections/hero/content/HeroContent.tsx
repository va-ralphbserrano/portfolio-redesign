import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { HeroContentProps, heroContentVariants } from './types';
import { HeroTitle } from './HeroTitle';
import { HeroDescription } from './HeroDescription';
import { HeroActions } from './HeroActions';
import { HeroStats } from './HeroStats';

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
