import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../features/theme/context/ThemeContext';
import { classNames } from '@/shared/utils/helpers';

interface ThemeTogglerProps {
  className?: string;
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className={classNames(
        'relative p-2 rounded-lg',
        'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
        'bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm',
        'border border-gray-200/20 dark:border-gray-700/20',
        'hover:bg-gray-100/50 dark:hover:bg-gray-700/50',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        'transition-all duration-300 ease-out',
        'touch-target',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.span
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <SunIcon className="w-5 h-5" />
      </motion.span>
      <motion.span
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <MoonIcon className="w-5 h-5" />
      </motion.span>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
};
