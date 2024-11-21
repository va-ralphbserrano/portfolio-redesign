import { HTMLMotionProps } from 'framer-motion';
import { IconType } from 'react-icons';
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'form';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: IconType;
  isSubmitting?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400',
  form: 'w-full bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
} as const;

export const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
} as const;
