import React from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiGlobe, HiMail, HiPhone, HiLocationMarker, HiStatusOnline } from 'react-icons/hi';

const PersonalInfo = () => {
  const personalInfo = [
    { label: 'Birthday', value: '18 June 1987', icon: <HiCalendar className="w-5 h-5" /> },
    { label: 'Age', value: new Date().getFullYear() - 1987, icon: <HiCalendar className="w-5 h-5" /> },
    { label: 'Website', value: 'va-ralphbserrano.github.io', icon: <HiGlobe className="w-5 h-5" />, href: 'https://va-ralphbserrano.github.io' },
    { label: 'Email', value: 'ralph.b.serrano@gmail.com', icon: <HiMail className="w-5 h-5" />, href: 'mailto:ralph.b.serrano@gmail.com' },
    { label: 'Phone', value: '+63 995 846 2469', icon: <HiPhone className="w-5 h-5" />, href: 'tel:+639958462469' },
    { 
      label: 'Location', 
      value: 'Muntinlupa City, Philippines', 
      icon: <HiLocationMarker className="w-5 h-5" />,
      href: 'https://www.google.com/maps/place/Muntinlupa,+Metro+Manila,+Philippines/@14.4079323,121.0107124,13z'
    },
    { label: 'Freelance', value: 'Available', icon: <HiStatusOnline className="w-5 h-5 text-green-500" /> }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {personalInfo.map((info, index) => (
        <motion.div
          key={info.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
        >
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            {info.icon}
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
            {info.href ? (
              <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 font-medium">
                {info.value}
              </a>
            ) : (
              <p className="text-gray-900 dark:text-gray-100 font-medium">{info.value}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PersonalInfo;
