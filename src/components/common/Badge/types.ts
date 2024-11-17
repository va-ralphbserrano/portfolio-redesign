import { HTMLMotionProps } from 'framer-motion';
import React from 'react';

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
} as const;

export const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
} as const;

export type BadgeVariant = keyof typeof variants;
export type BadgeColor = keyof typeof variants.solid;
export type BadgeSize = keyof typeof sizes;

interface BaseBadgeProps {
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

type MotionBadgeProps = Omit<HTMLMotionProps<'span'>, keyof BaseBadgeProps | 'color'>;
type HTMLBadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BaseBadgeProps | 'color'>;

export type BadgeProps = BaseBadgeProps & (
  | ({ animate: true } & MotionBadgeProps)
  | ({ animate?: false } & HTMLBadgeProps)
);

export interface DismissButtonProps {
  size: BadgeSize;
  onDismiss: () => void;
}
