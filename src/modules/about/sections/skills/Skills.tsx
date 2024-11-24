import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data';

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
        />
      </div>
    </div>
  </motion.div>
);

interface SkillCategoryProps {
  category: string;
  skills: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  index: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, skills: categorySkills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5,
      delay: index * 0.2,
      ease: "easeOut"
    }}
    className="space-y-4"
  >
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      {category}
    </h3>
    <div className="grid grid-cols-1 gap-4">
      {categorySkills.map((skill, skillIndex) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          percentage={skill.percentage}
          color={skill.color}
          delay={index * 0.2 + skillIndex * 0.1}
        />
      ))}
    </div>
  </motion.div>
);

export const Skills: React.FC = () => {
  return (
    <div className="space-y-8">
      {skills.map((category, index) => (
        <SkillCategory
          key={category.category}
          category={category.category}
          skills={category.skills}
          index={index}
        />
      ))}
    </div>
  );
};

Skills.displayName = 'Skills';

export default Skills;
