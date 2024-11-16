import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const Section = ({
  children,
  className,
  id,
  fullHeight = false,
  centered = false,
  animate = true,
  background = 'default'
}) => {
  const Component = animate ? motion.section : 'section';
  const animationProps = animate ? {
    variants: sectionVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" }
  } : {};

  const backgrounds = {
    default: 'bg-white dark:bg-gray-900',
    light: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-900 dark:bg-gray-950',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800',
    transparent: 'bg-transparent'
  };

  return (
    <Component
      id={id}
      className={classNames(
        'relative w-full py-16 md:py-24',
        fullHeight && 'min-h-screen',
        centered && 'flex items-center justify-center',
        backgrounds[background],
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

Section.Header = ({ title, subtitle, centered = true, className }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className={classNames(
      'mb-12',
      centered && 'text-center',
      className
    )}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

Section.Content = ({ children, className }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }}
    className={classNames('container mx-auto px-4', className)}
  >
    {children}
  </motion.div>
);

Section.Grid = ({ children, columns = 3, gap = 8, className }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }}
    className={classNames(
      'grid gap-8',
      {
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
        'grid-cols-1 md:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4
      },
      `gap-${gap}`,
      className
    )}
  >
    {children}
  </motion.div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  fullHeight: PropTypes.bool,
  centered: PropTypes.bool,
  animate: PropTypes.bool,
  background: PropTypes.oneOf(['default', 'light', 'dark', 'gradient', 'transparent'])
};

Section.Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string
};

Section.Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Section.Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([2, 3, 4]),
  gap: PropTypes.number,
  className: PropTypes.string
};

export default Section;
