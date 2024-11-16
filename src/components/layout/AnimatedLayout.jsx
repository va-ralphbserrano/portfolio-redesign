import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { pageTransition } from '../../utils/animations';

const AnimatedLayout = ({ children, className }) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

AnimatedLayout.FadeIn = ({ children, delay = 0, duration = 0.6, className }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

AnimatedLayout.SlideUp = ({ children, delay = 0, duration = 0.6, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

AnimatedLayout.SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.6, className }) => {
  const directionValues = {
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    top: { x: 0, y: -20 },
    bottom: { x: 0, y: 20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionValues[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

AnimatedLayout.Scale = ({ children, delay = 0, duration = 0.6, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

AnimatedLayout.Stagger = ({ children, staggerDelay = 0.1, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {React.Children.map(children, child => (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
);

AnimatedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

const animatedComponentProps = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string
};

AnimatedLayout.FadeIn.propTypes = animatedComponentProps;
AnimatedLayout.SlideUp.propTypes = animatedComponentProps;
AnimatedLayout.Scale.propTypes = animatedComponentProps;

AnimatedLayout.SlideIn.propTypes = {
  ...animatedComponentProps,
  direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};

AnimatedLayout.Stagger.propTypes = {
  children: PropTypes.node.isRequired,
  staggerDelay: PropTypes.number,
  className: PropTypes.string
};

export default AnimatedLayout;
