import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/solid';

// Types
export type BadgeVariant = 'solid' | 'outline' | 'soft';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BaseBadgeProps {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  animate?: boolean;
  icon?: React.ElementType;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  className?: string;
}

export type BadgeProps = BaseBadgeProps & HTMLMotionProps<'span'>;

// Styles
export const variants = {
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

export const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
};

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

interface DismissButtonProps {
  size: BadgeSize;
  onDismiss: () => void;
}

const DismissButton: React.FC<DismissButtonProps> = ({ size, onDismiss }) => (
  <button
    type="button"
    className={classNames(
      'ml-1.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10',
      sizeClasses[size]
    )}
    onClick={(e) => {
      e.stopPropagation();
      onDismiss();
    }}
  >
    <XMarkIcon className={sizeClasses[size]} />
  </button>
);

// Animation variants
const badgeAnimationVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
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
}, ref) => {
  const BadgeComponent = animate ? motion.span : 'span';
  const animationProps = animate ? {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    variants: badgeAnimationVariants
  } : {};

  return (
    <BadgeComponent
      ref={ref}
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
      {Icon && <Icon className={classNames('mr-1', sizeClasses[size])} />}
      {children}
      {dismissible && onDismiss && (
        <DismissButton size={size} onDismiss={onDismiss} />
      )}
    </BadgeComponent>
  );
});
