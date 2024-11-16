import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Grid = ({
  children,
  className,
  cols = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 8,
  animate = true,
  masonry = false
}) => {
  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    variants: gridVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true }
  } : {};

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  const getResponsiveClasses = () => {
    return classNames(
      cols.sm && `grid-cols-${cols.sm}`,
      cols.md && `md:grid-cols-${cols.md}`,
      cols.lg && `lg:grid-cols-${cols.lg}`
    );
  };

  return (
    <Component
      className={classNames(
        'grid',
        !masonry && getResponsiveClasses(),
        masonry && 'columns-1 md:columns-2 lg:columns-3',
        `gap-${gap}`,
        className
      )}
      {...animationProps}
    >
      {animate
        ? React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={masonry ? 'mb-4 break-inside-avoid' : ''}
            >
              {child}
            </motion.div>
          ))
        : children}
    </Component>
  );
};

Grid.Item = ({ children, className, span = 1 }) => (
  <div
    className={classNames(
      `col-span-${span}`,
      className
    )}
  >
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cols: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number
  }),
  gap: PropTypes.number,
  animate: PropTypes.bool,
  masonry: PropTypes.bool
};

Grid.Item.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  span: PropTypes.number
};

export default Grid;
