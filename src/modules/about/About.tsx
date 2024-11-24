import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from './data';
import { AboutHeader } from './sections/common/AboutHeader';
import { PersonalInfo } from './sections/personal-info/PersonalInfo';
import { Skills } from './sections/skills/Skills';
import { Education } from './sections/education/Education';
import { ExperienceSection } from './sections/experience/Experience';
import { Tools } from './sections/tools/Tools';
import { serviceItemVariants } from '../services/components/types';

const About: React.FC = () => {
  return (
    <section className="relative py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        {/* Gradient meshes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/5 via-transparent to-transparent transform rotate-12 blur-xl" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-blue-500/5 via-transparent to-transparent transform -rotate-12 blur-xl" />
          
          {/* Accent blobs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-400/3 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-purple-400/3 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-[500px] h-[500px] bg-blue-400/3 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-soft-light">
          <div className="absolute inset-0 bg-repeat bg-noise" />
        </div>

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-light dark:bg-radial-dark opacity-50" />
      </div>

      <div className="container relative mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          variants={serviceItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 shadow-sm">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {aboutData.tagline}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {aboutData.description}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Personal Info and Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={serviceItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <AboutHeader
                  title="Personal Info"
                  description="Get to know me better"
                />
                <PersonalInfo />
              </div>
            </motion.div>

            <motion.div
              variants={serviceItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <AboutHeader
                  title="Professional Skills"
                  description="My expertise spans across various technical domains"
                />
                <Skills />
              </div>
            </motion.div>
          </div>

          {/* Education and Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={serviceItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <AboutHeader
                  title="Education"
                  description="My academic journey and certifications"
                />
                <Education />
              </div>
            </motion.div>

            <motion.div
              variants={serviceItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <AboutHeader
                  title="Experience"
                  description="My professional journey"
                />
                <ExperienceSection />
              </div>
            </motion.div>
          </div>

          {/* Tools Section */}
          <motion.div
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <AboutHeader
                title="Tools & Technologies"
                description="The tools I use to bring ideas to life"
              />
              <Tools />
            </div>
          </motion.div>
        </div>

        {/* Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  );
};

About.displayName = 'About';

export default About;
