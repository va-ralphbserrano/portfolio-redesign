import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';

const variants = {
  solid: {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  outline: {
    primary: 'border border-primary-500 text-primary-500 dark:border-primary-400 dark:text-primary-400',
    secondary: 'border border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400',
    success: 'border border-green-500 text-green-500 dark:border-green-400 dark:text-green-400',
    danger: 'border border-red-500 text-red-500 dark:border-red-400 dark:text-red-400',
    warning: 'border border-yellow-500 text-yellow-500 dark:border-yellow-400 dark:text-yellow-400',
    info: 'border border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400'
  },
  soft: {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300',
    secondary: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-300',
    success: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300',
    danger: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300',
    warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-300',
    info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
  }
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
};

const Badge = ({
  children,
  className,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  rounded = true,
  animate = true,
  icon: Icon,
  dismissible,
  onDismiss,
  ...props
}) => {
  const Component = animate ? motion.span : 'span';
  const animationProps = animate ? {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  } : {};

  return (
    <Component
      className={classNames(
        'inline-flex items-center font-medium',
        variants[variant][color],
        sizes[size],
        rounded && 'rounded-full',
        className
      )}
      {...animationProps}
      {...props}
    >
      {Icon && (
        <Icon
          className={classNames(
            'mr-1',
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
        />
      )}
      {children}
      {dismissible && (
        <button
          type="button"
          className={classNames(
            'ml-1.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10',
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
          onClick={onDismiss}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </Component>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  variant: PropTypes.oneOf(['solid', 'outline', 'soft']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.bool,
  animate: PropTypes.bool,
  icon: PropTypes.elementType,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func
};

export default Badge;
