import React from 'react';
import { motion } from 'framer-motion';
import { getTechIcon } from '@/utils/icons';
import { classNames } from '@/utils/helpers';
import { aboutData } from './data';
import { PersonalInfoProps } from './types';

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ className }) => {
  return (
    <div className={classNames("grid gap-4", className)}>
      {aboutData.personalInfo.map((info, index) => {
        const Icon = getTechIcon(info.icon);
        const Content = () => (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100/50 dark:bg-primary-900/30">
              {Icon && <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {info.label}
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white break-words">
                {info.value}
              </p>
            </div>
          </div>
        );

        return (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            {'href' in info ? (
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg transition-colors duration-200 hover:bg-primary-50/50 dark:hover:bg-primary-900/30"
              >
                <Content />
              </a>
            ) : (
              <div className="p-3">
                <Content />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default PersonalInfo;
