import { classNames } from '@/shared/utils/helpers';
import { motion } from 'framer-motion';
import { HeroStat } from './HeroStat';
import { HeroStatsProps, heroStatVariants } from './types';

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Completed', value: '50+' },
  { label: 'Satisfied Clients', value: '30+' }
];

export const HeroStats: React.FC<HeroStatsProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={heroStatVariants}
      className={classNames('grid grid-cols-3 gap-8', className)}
    >
      {stats.map((stat) => (
        <HeroStat
          key={stat.label}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </motion.div>
  );
};

HeroStats.displayName = 'HeroStats';

export default HeroStats;
