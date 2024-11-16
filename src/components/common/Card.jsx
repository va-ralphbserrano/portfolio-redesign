import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const variants = {
  normal: 'bg-white dark:bg-gray-800',
  glass: 'backdrop-blur-lg bg-white/75 dark:bg-gray-900/75',
  gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
};

const elevations = {
  none: '',
  sm: 'shadow-sm hover:shadow',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-xl'
};

const Card = ({
  children,
  className,
  variant = 'normal',
  elevation = 'md',
  hover = true,
  animate = true,
  ...props
}) => {
  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: hover ? { y: -5 } : undefined,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      className={classNames(
        'rounded-xl overflow-hidden transition-all duration-300',
        variants[variant],
        elevations[elevation],
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.Header = ({ children, className, ...props }) => (
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

Card.Body = ({ children, className, ...props }) => (
  <div className={classNames('p-6', className)} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className, ...props }) => (
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

Card.Image = ({ src, alt, className, ...props }) => (
  <div className="relative w-full h-48">
    <img
      src={src}
      alt={alt}
      className={classNames(
        'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
        className
      )}
      {...props}
    />
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['normal', 'glass', 'gradient']),
  elevation: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hover: PropTypes.bool,
  animate: PropTypes.bool
};

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Card.Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Card;
