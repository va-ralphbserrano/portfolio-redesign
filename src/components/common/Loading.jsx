import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const variants = {
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },
  dots: {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  dot: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
};

const Loading = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  className,
  text
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    primary: 'text-primary-500',
    secondary: 'text-gray-500',
    white: 'text-white'
  };

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <motion.div
            className={classNames(
              'border-2 border-current border-t-transparent rounded-full',
              sizes[size],
              colors[color],
              className
            )}
            animate="animate"
            variants={variants.spinner}
          />
        );

      case 'dots':
        return (
          <motion.div
            className="flex space-x-1"
            animate="animate"
            variants={variants.dots}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={classNames(
                  'rounded-full',
                  sizes[size],
                  colors[color],
                  'bg-current'
                )}
                variants={variants.dot}
              />
            ))}
          </motion.div>
        );

      case 'pulse':
        return (
          <motion.div
            className={classNames(
              'rounded-full',
              sizes[size],
              colors[color],
              'bg-current',
              className
            )}
            animate="animate"
            variants={variants.pulse}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {renderLoader()}
      {text && (
        <p className={classNames(
          'mt-2 text-sm',
          colors[color]
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

Loading.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  className: PropTypes.string,
  text: PropTypes.string
};

export default Loading;
