import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { PersonalInfoProps } from './types';
import { aboutData } from '@/data/about';
import { getTechIcon } from '@/utils/icons/index';

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  className
}) => {
  return (
    <div className={classNames("grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
      {aboutData.personalInfo.map((info, index) => {
        const Icon = getTechIcon(info.icon);
        const Content = () => (
          <>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
              <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {info.label}
              </h4>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {info.value}
              </p>
            </div>
          </>
        );


        return (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            {'href' in info ? (
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <Content />
              </a>
            ) : (
              <Content />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

PersonalInfo.displayName = 'PersonalInfo';

export default PersonalInfo;
