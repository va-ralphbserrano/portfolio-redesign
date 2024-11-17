import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import { AboutProps } from './types';
import { AboutHeader, AboutSection, AboutGrid } from './components';
import { PersonalInfo } from './PersonalInfo';
import { Skills } from './Skills';
import { Education } from './Education';
import { Experience } from './Experience';
import { Tools } from './Tools';

const About: React.FC<AboutProps> = ({
  className
}) => {
  return (
    <section
      id="about"
      className={classNames(
        'py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
        className
      )}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <AboutHeader />

        <AboutGrid>
          <AboutSection title="Personal Info">
            <PersonalInfo />
          </AboutSection>

          <AboutSection title="Professional Skills">
            <Skills />
          </AboutSection>
        </AboutGrid>

        <AboutGrid>
          <AboutSection title="Education Journey">
            <Education />
          </AboutSection>

          <AboutSection title="Professional Experience">
            <Experience />
          </AboutSection>
        </AboutGrid>

        <AboutSection title="Tools & Technologies" className="text-center">
          <Tools />
        </AboutSection>
      </motion.div>
    </section>
  );
};

About.displayName = 'About';

export default About;
