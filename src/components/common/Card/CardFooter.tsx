import React from 'react';
import { classNames } from '@/utils/helpers';
import { BaseCardProps } from './types';

export const CardFooter: React.FC<BaseCardProps> = ({ children, className, ...props }) => (
  <div
    className={classNames(
      'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

CardFooter.displayName = 'Card.Footer';

export default CardFooter;

