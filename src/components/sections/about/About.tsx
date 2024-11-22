import React from 'react';
import { motion } from "framer-motion";
import { PersonalInfo } from "./PersonalInfo";
import { Skills } from "./Skills";
import { Education } from "./Education";
import { Experience } from "./experience/Experience";
import { Tools } from "./tools/Tools";
import { aboutData } from "./data";
import { classNames } from '@/utils/helpers';
import { serviceItemVariants } from '../services/types';

const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          variants={serviceItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            {aboutData.title}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {aboutData.tagline}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {aboutData.description}
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {aboutData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={serviceItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="group relative p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Personal Info Card */}
          <motion.div
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              Personal Details
            </h3>
            <PersonalInfo />
          </motion.div>

          {/* Skills Card */}
          <motion.div
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              Professional Skills
            </h3>
            <Skills />
          </motion.div>

          {/* Education Card */}
          <motion.div
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              Education & Certifications
            </h3>
            <Education />
          </motion.div>

          {/* Experience Card */}
          <motion.div
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              Professional Experience
            </h3>
            <Experience />
          </motion.div>

          {/* Tools Card */}
          <motion.div
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2"
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              Tools & Technologies
            </h3>
            <Tools />
          </motion.div>
        </div>

        {/* Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  );
};

About.displayName = 'About';

export { About };
export default About;
