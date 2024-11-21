import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { HeroStatsProps, heroStatVariants } from './types';
import { HeroStat } from './HeroStat';

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
