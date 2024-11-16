import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';

const Experience = () => {
  const experiences = [
    {
      title: "Executive Assistant Apprenticeship Program",
      company: "Surge Freelancing Marketplace",
      year: "2024",
      description: "Completed an intensive program focused on developing essential skills for virtual assistance, including project management, communication, and productivity tools."
    },
    {
      title: "AutoCAD Designer & Office Administrator",
      company: "JBY Industrial Supply and Services",
      year: "2011 - 2020",
      description: "Led multiple AutoCAD design projects and streamlined office workflows, resulting in a 25% increase in operational efficiency and improved client satisfaction."
    },
    {
      title: "Owner & Manager",
      company: "REHUB Internet Café",
      year: "2007 - 2011",
      description: "Successfully managed all aspects of business operations, from customer service to technical maintenance, while maintaining high customer satisfaction rates."
    }
  ];

  return (
    <div className="relative space-y-8">
      <div className="absolute left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />
      
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative pl-16"
        >
          <div className="absolute left-[29px] -translate-x-1/2 top-3 w-4 h-4 rounded-full bg-primary-500 border-2 border-white dark:border-gray-800 shadow-md" />
          
          <div className="absolute left-0 top-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
            <HiBriefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-3">
              {exp.year}
            </span>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{exp.title}</h4>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Experience;
