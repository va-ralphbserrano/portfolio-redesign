import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';

const Education = () => {
  const education = [
    {
      title: "Masterclass Virtual Assistant Course",
      school: "Surge Freelancing Marketplace",
      year: "2024",
      description: "Earned a Gold Certificate of Completion and gained essential skills for virtual assistance."
    },
    {
      title: "Advance Diploma in Gaming and Animation Technology",
      school: "Informatics College Northgate",
      year: "2012 - 2013",
      description: "Gained a solid foundation in game design principles, animation techniques, and digital media production."
    },
    {
      title: "Bachelor of Science in Electronics and Communications Engineering",
      school: "Mapúa Institute of Technology",
      year: "2004 - 2005",
      description: "Developed a comprehensive understanding of electronic systems, telecommunications, and circuit design."
    }
  ];

  return (
    <div className="relative space-y-8">
      <div className="absolute left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />
      
      {education.map((edu, index) => (
        <motion.div
          key={edu.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative pl-16"
        >
          <div className="absolute left-[29px] -translate-x-1/2 top-3 w-4 h-4 rounded-full bg-primary-500 border-2 border-white dark:border-gray-800 shadow-md" />
          
          <div className="absolute left-0 top-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
            <HiAcademicCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-3">
              {edu.year}
            </span>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{edu.title}</h4>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{edu.school}</p>
            <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Education;
