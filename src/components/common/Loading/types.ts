import { WithClassName } from '@/types/component';

export type LoadingColor = 'primary' | 'secondary' | 'white';
export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingType = 'spinner' | 'dots' | 'pulse';

export const colors = {
  primary: 'text-primary-500',
  secondary: 'text-gray-500',
  white: 'text-white'
} as const;

export const sizes = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
} as const;

export interface LoadingProps extends WithClassName {
  type?: LoadingType;
  size?: LoadingSize;
  color?: LoadingColor;
}

export interface LoadingTextProps extends WithClassName {
  text: string;
  color?: LoadingColor;
}
