import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '@/data/about';
import { PersonalInfo } from './about/PersonalInfo';
import { Skills } from './about/Skills';
import { Education } from './about/Education';
import { Experience } from './about/Experience';
import { Tools } from './about/Tools';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{aboutData.title}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {aboutData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Personal Info</h3>
            <ErrorBoundary>
              <PersonalInfo />
            </ErrorBoundary>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Professional Skills</h3>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Education</h3>
            <ErrorBoundary>
              <Education />
            </ErrorBoundary>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Experience</h3>
            <ErrorBoundary>
              <Experience />
            </ErrorBoundary>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Tools & Technologies</h3>
          <ErrorBoundary>
            <Tools />
          </ErrorBoundary>
        </motion.div>
      </div>
    </section>
  );
};

About.displayName = 'About';

export default About;
