import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '@/data/about';
import { PersonalInfo } from './about/PersonalInfo';
import { Skills } from './about/Skills';
import { Education } from './about/Education';
import { Experience } from './about/Experience';
import { Tools } from './about/Tools';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';

export const About: React.FC = () => {
  return (
    <Section
      id="about"
      className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-fluid-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
          {aboutData.title}
        </h2>
        <p className="text-fluid-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {aboutData.description}
        </p>
      </motion.div>

      <Grid
        cols={{ xs: 1, lg: 2 }}
        gap={8}
        className="mb-12 sm:mb-16"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-fluid-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Personal Info
          </h3>
          <ErrorBoundary>
            <PersonalInfo />
          </ErrorBoundary>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-fluid-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Professional Skills
          </h3>
          <ErrorBoundary>
            <Skills />
          </ErrorBoundary>
        </motion.div>
      </Grid>

      <Grid
        cols={{ xs: 1, lg: 2 }}
        gap={8}
        className="mb-12 sm:mb-16"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-fluid-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Education
          </h3>
          <ErrorBoundary>
            <Education />
          </ErrorBoundary>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-fluid-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Experience
          </h3>
          <ErrorBoundary>
            <Experience />
          </ErrorBoundary>
        </motion.div>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-fluid-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Tools & Technologies
        </h3>
        <ErrorBoundary>
          <Tools />
        </ErrorBoundary>
      </motion.div>
    </Section>
  );
};

About.displayName = 'About';

export default About;
