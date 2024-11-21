import { HTMLMotionProps } from 'framer-motion';
import React from 'react';
import { WithChildren, WithClassName } from '@/types/component';

export const variants = {
  normal: 'bg-white dark:bg-gray-800',
  glass: 'backdrop-blur-lg bg-white/75 dark:bg-gray-900/75',
  gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
} as const;

export const elevations = {
  none: '',
  sm: 'shadow-sm hover:shadow',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-xl'
} as const;

export const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
} as const;

export type CardVariant = keyof typeof variants;
export type CardElevation = keyof typeof elevations;

export interface BaseCardProps extends WithChildren, WithClassName {
  children: React.ReactNode;
}

export interface CardProps extends WithChildren, WithClassName {
  variant?: CardVariant;
  elevation?: CardElevation;
  touchable?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  motionProps?: HTMLMotionProps<'div'>;
  className?: string;
  style?: React.CSSProperties;
}

export interface ImageProps extends WithClassName {
  src: string;
  alt: string;
}

export interface CardComposition {
  Header: React.FC<BaseCardProps>;
  Body: React.FC<BaseCardProps>;
  Footer: React.FC<BaseCardProps>;
  Image: React.FC<ImageProps>;
}
