import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, professionalProfiles } from '../../data';

export const PersonalInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'professional', label: 'Professional Profiles' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Tab Navigation */}
      <div className="flex flex-col xs:flex-row justify-center space-y-2 xs:space-y-0 xs:space-x-4 px-2 xs:px-4 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 py-2.5 xs:py-2 rounded-lg font-medium transition-all duration-300 w-full xs:w-auto text-sm sm:text-base ${
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
      <div className="space-y-6 px-2 xs:px-4 sm:px-0">
        {activeTab === 'personal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6"
          >
            {personalInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-3 xs:p-4 sm:p-6 bg-white dark:bg-gray-800/50 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <span className="flex-shrink-0 p-2 sm:p-2.5 bg-primary-100 dark:bg-primary-900/10 rounded-lg">
                    {React.createElement(info.icon, { 
                      size: typeof window !== 'undefined' && window.innerWidth < 640 ? 20 : 24 
                    })}
                  </span>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">
                      {info.label}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'professional' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-6"
          >
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
                className="group flex items-center space-x-3 sm:space-x-4 p-3 xs:p-4 sm:p-5 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors duration-300 backdrop-blur-sm"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400">
                    {React.createElement(profile.icon, { 
                      size: typeof window !== 'undefined' && window.innerWidth < 640 ? 20 : 24 
                    })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">
                    {profile.label}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium truncate">
                    {profile.username}
                  </p>
                </div>
                <div className="ml-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

PersonalInfo.displayName = 'PersonalInfo';

export default PersonalInfo;
