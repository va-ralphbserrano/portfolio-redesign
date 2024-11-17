import { HTMLMotionProps } from 'framer-motion';
import React from 'react';

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

export type CardVariant = keyof typeof variants;
export type CardElevation = keyof typeof elevations;

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export type MotionDivProps = Omit<HTMLMotionProps<'div'>, 'style' | 'className' | 'children' | 'animate'>;

export interface CardProps extends Pick<MotionDivProps, Exclude<keyof MotionDivProps, keyof HTMLMotionProps<'div'>>> {
  variant?: CardVariant;
  elevation?: CardElevation;
  hover?: boolean;
  animate?: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  className?: string;
}

export interface CardComposition {
  Header: React.FC<BaseCardProps>;
  Body: React.FC<BaseCardProps>;
  Footer: React.FC<BaseCardProps>;
  Image: React.FC<ImageProps>;
}
