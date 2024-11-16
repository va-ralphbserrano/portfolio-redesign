import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const positions = {
  top: {
    placement: 'bottom-full mb-2',
    arrow: 'bottom-0 -translate-x-1/2 translate-y-full left-1/2 border-t-current'
  },
  bottom: {
    placement: 'top-full mt-2',
    arrow: 'top-0 -translate-x-1/2 -translate-y-full left-1/2 border-b-current'
  },
  left: {
    placement: 'right-full mr-2',
    arrow: 'right-0 -translate-y-1/2 translate-x-full top-1/2 border-l-current'
  },
  right: {
    placement: 'left-full ml-2',
    arrow: 'left-0 -translate-y-1/2 -translate-x-full top-1/2 border-r-current'
  }
};

const variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 300
    }
  }
};

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 0,
  className,
  dark = false,
  arrow = true,
  maxWidth = 200,
  trigger = 'hover'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeout;

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (delay) {
        timeout = setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      clearTimeout(timeout);
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={classNames(
              'absolute z-50 px-2 py-1 text-sm whitespace-normal break-words',
              dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
              dark ? 'border border-gray-800' : 'border border-gray-200',
              'rounded shadow-lg',
              positions[position].placement,
              className
            )}
            style={{ maxWidth }}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {content}
            {arrow && (
              <span
                className={classNames(
                  'absolute w-2 h-2 rotate-45 border-4 border-transparent',
                  dark ? 'bg-gray-900' : 'bg-white',
                  positions[position].arrow
                )}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string,
  dark: PropTypes.bool,
  arrow: PropTypes.bool,
  maxWidth: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'click'])
};

export default Tooltip;
