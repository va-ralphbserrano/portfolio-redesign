import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, professionalProfiles } from '../../data';

export const PersonalInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors duration-300"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400">
                  {React.createElement(item.icon, { size: 20 })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.label}
                </h4>
                <p className="text-gray-900 dark:text-white font-medium">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Profiles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Professional Profiles
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {professionalProfiles.map((profile, index) => (
            <motion.a
              key={profile.label}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors duration-300"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400">
                  {React.createElement(profile.icon, { size: 20 })}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {profile.label}
                </h4>
                <p className="text-gray-900 dark:text-white font-medium truncate group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {profile.value}
                </p>
              </div>
              <div className="text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

PersonalInfo.displayName = 'PersonalInfo';

export default PersonalInfo;
