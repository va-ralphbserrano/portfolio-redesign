import { classNames } from '@/shared/utils/helpers';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export const sizes = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
} as const;

export const variants = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  pill: 'rounded-full'
} as const;

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'size' | 'className'> {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants | 'pill';
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  size = 'md',
  variant = 'default',
  className,
  dismissible,
  onDismiss,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded';
  const sizeClasses = sizes[size];
  const variantClasses = variants[variant];

  return (
    <motion.span
      className={classNames(baseClasses, sizeClasses, variantClasses, className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="ml-2 inline-flex items-center justify-center w-4 h-4 p-1 text-current hover:bg-current hover:bg-opacity-10 rounded-full"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg
            className="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </motion.span>
  );
};
