import React from 'react';
import { classNames } from '../../utils/helpers';
import { GridProps } from './types';

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  columns = 3,
  gap = 8
}) => {
  return (
    <div
      className={classNames(
        'grid',
        `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
