import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/index';
import { AboutGrid } from '../../sections/common/AboutGrid';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5,
      delay,
      ease: "easeOut"
    }}
    className="group relative p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
          {name}
        </h4>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 dark:from-primary-400/10 dark:to-primary-600/10 flex items-center justify-center">
          <span className="text-xl font-bold text-primary-500 dark:text-primary-400">
            {percentage}%
          </span>
        </div>
      </div>
      
      <div className="relative h-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 opacity-20" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5,
            delay: delay + 0.2,
            ease: "easeOut"
          }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  // Convert skills data to the format expected by AboutGrid
  const skillFeatures = skills.map(category => ({
    icon: category.icon,
    title: category.category,
    description: category.description
  }));

  return (
    <div className="space-y-16">
      {/* Category Grid */}
      <AboutGrid features={skillFeatures} />

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((category, categoryIndex) => (
          <div key={category.category} className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                {...skill}
                delay={categoryIndex * 0.2 + skillIndex * 0.1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Skills.displayName = 'Skills';

export default Skills;
