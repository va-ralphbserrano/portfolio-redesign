import React from 'react';
import { classNames } from '@/shared/utils/helpers';

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
  gap?: number | {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  className?: string;
  children?: React.ReactNode;
}

const getColsClass = (size: string, cols: GridCols | undefined): string | null => {
  if (!cols) return null;
  const prefix = size === 'xs' ? '' : `${size}:`;
  return `${prefix}grid-cols-${cols}`;
};

export const Grid: React.FC<GridProps> = ({
  cols = { xs: 1, sm: 2, lg: 3 },
  gap = { xs: 4, sm: 6, lg: 8 },
  className,
  children,
  ...props
}) => {
  const colClasses = Object.entries(cols)
    .map(([size, value]) => {
      if (size === 'xs') return `grid-cols-${value}`;
      if (typeof value === 'number') return `${size}:grid-cols-${value}`;
      return '';
    })
    .filter(Boolean)
    .join(' ');

  const gapClasses = typeof gap === 'number'
    ? `gap-${gap}`
    : Object.entries(gap)
      .map(([size, value]) => {
        if (size === 'xs') return `gap-${value}`;
        return `${size}:gap-${value}`;
      })
      .join(' ');

  return (
    <div
      className={classNames(
        'grid w-full',
        colClasses,
        gapClasses,
        'auto-rows-auto',
        'items-stretch',
        'transition-[grid-template-columns,gap] duration-300',
        'mobile-padding',
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
