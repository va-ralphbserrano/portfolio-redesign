import React from 'react';
import { classNames } from '@/utils/helpers';
import { BaseCardProps } from './types';

export const CardHeader: React.FC<BaseCardProps> = ({ children, className, ...props }) => (
  <div
    className={classNames(
      'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

CardHeader.displayName = 'Card.Header';

export default CardHeader;

