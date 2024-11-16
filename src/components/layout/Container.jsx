import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full'
};

const Container = ({
  children,
  className,
  size = 'lg',
  padded = true,
  centered = true
}) => {
  return (
    <div
      className={classNames(
        'w-full mx-auto',
        sizes[size],
        padded && 'px-4 sm:px-6 lg:px-8',
        centered && 'flex flex-col items-center',
        className
      )}
    >
      {children}
    </div>
  );
};

Container.Row = ({ children, className, reverse = false, gap = 8 }) => (
  <div
    className={classNames(
      'w-full flex flex-col',
      reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      `gap-${gap}`,
      className
    )}
  >
    {children}
  </div>
);

Container.Col = ({ children, className, width }) => (
  <div
    className={classNames(
      'w-full',
      width && `md:w-${width}`,
      className
    )}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  padded: PropTypes.bool,
  centered: PropTypes.bool
};

Container.Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  reverse: PropTypes.bool,
  gap: PropTypes.number
};

Container.Col.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.string
};

export default Container;
