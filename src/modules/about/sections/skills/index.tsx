import React from 'react';
import { motion } from 'framer-motion';
import { SkillSphere } from './SkillSphere';

const SkillsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Skills & Technologies
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Technical Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            With over a decade of experience in technical design and digital solutions, I've developed a diverse skill set that spans multiple domains. From AutoCAD expertise to modern web technologies, my technical arsenal is continuously evolving to meet industry demands.
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my interactive skill sphere below to discover the tools, technologies, and methodologies I use to deliver exceptional results. Each node represents a key competency in my professional toolkit.
          </p>
        </motion.div>

        {/* 3D Skill Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <SkillSphere />
        </motion.div>
      </div>
    </section>
  );
};

SkillsSection.displayName = 'SkillsSection';

export { SkillsSection, SkillSphere };
