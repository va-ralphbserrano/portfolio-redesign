import React from 'react';
import { classNames } from '@/utils/helpers';

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: GridCols;
    sm?: GridCols;
    md?: GridCols;
    lg?: GridCols;
    xl?: GridCols;
    '2xl'?: GridCols;
  };
  gap?: number;
  className?: string;
  children?: React.ReactNode;
}

const getColsClass = (size: string, cols: GridCols | undefined): string | null => {
  if (!cols) return null;
  const prefix = size === 'xs' ? '' : `${size}:`;
  return `${prefix}grid-cols-${cols}`;
};

export const Grid: React.FC<GridProps> = ({
  cols = { xs: 1 },
  gap = 4,
  className,
  children,
  ...props
}) => {
  const colClasses = Object.entries(cols)
    .map(([size, value]) => getColsClass(size, value))
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames(
        'grid',
        colClasses,
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
