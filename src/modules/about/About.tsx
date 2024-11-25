import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from './data';
import { AboutHeader } from './sections/common/AboutHeader';
import { AboutSection } from './sections/common/AboutSection';
import { PersonalInfo } from './sections/personal-info/PersonalInfo';
import { Education } from './sections/education/Education';
import { ExperienceSection } from './sections/experience/Experience';
import { Tools } from './sections/tools/Tools';
import { SkillsSection } from './sections/skills/SkillsSection';
import { aboutItemVariants } from './types';

const About: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const tabs = [
    { id: 'skills', label: 'Skills & Expertise' },
    { id: 'tools', label: 'Tools & Technologies' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' }
  ];

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

      <div className="container relative mx-auto px-4">
        {/* Main Header */}
        <motion.div
          variants={aboutItemVariants}
          className="text-center mb-16"
        >
          <AboutHeader 
            title={aboutData.header.title}
            subtitle={aboutData.header.subtitle}
            description={aboutData.header.description}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {mounted && (
            <motion.div 
              className="mt-16 space-y-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Personal Information */}
              <AboutSection
                title="Personal Information"
                description="Get to know me better through these key details about my professional background and expertise."
              >
                <PersonalInfo />
              </AboutSection>

              {/* Tabbed Sections */}
              <div className="space-y-8">
                {/* Tab Navigation */}
                <div className="flex justify-center space-x-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AboutSection
                        title="Skills & Expertise"
                        description="A comprehensive overview of my technical abilities and professional competencies."
                      >
                        <SkillsSection />
                      </AboutSection>
                    </motion.div>
                  )}

                  {activeTab === 'tools' && (
                    <motion.div
                      key="tools"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AboutSection
                        title="Tools & Technologies"
                        description="The essential tools and technologies I use to bring ideas to life."
                      >
                        <Tools />
                      </AboutSection>
                    </motion.div>
                  )}

                  {activeTab === 'experience' && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AboutSection
                        title="Professional Experience"
                        description="A journey through my professional career and key achievements."
                      >
                        <ExperienceSection />
                      </AboutSection>
                    </motion.div>
                  )}

                  {activeTab === 'education' && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AboutSection
                        title="Education & Certifications"
                        description="My academic background and professional certifications."
                      >
                        <Education />
                      </AboutSection>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

About.displayName = 'About';

export default About;
