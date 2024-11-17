import React from 'react';
import { classNames } from '../../../utils/helpers';
import { BaseCardProps } from './types';

export const CardBody: React.FC<BaseCardProps> = ({ children, className, ...props }) => (
  <div className={classNames('p-6', className)} {...props}>
    {children}
  </div>
);

CardBody.displayName = 'Card.Body';
