import React from 'react';
import { classNames } from '@/utils/helpers';
import { DismissButtonProps } from './types';

export const DismissButton: React.FC<DismissButtonProps> = ({ size, onDismiss }) => (
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
);

