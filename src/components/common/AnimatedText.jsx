import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const defaultAnimation = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
};

const AnimatedText = ({
  children,
  className,
  text,
  animation = 'default',
  el: Element = 'div',
  repeatDelay,
  ...props
}) => {
  const animations = {
    default: defaultAnimation,
    typewriter: {
      hidden: { width: 0 },
      visible: {
        width: '100%',
        transition: {
          type: 'spring',
          damping: 10,
          stiffness: 100
        }
      }
    },
    gradient: {
      hidden: { backgroundPosition: '200% center' },
      visible: {
        backgroundPosition: '0% center',
        transition: {
          duration: 1,
          ease: 'easeInOut'
        }
      }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut'
        }
      }
    },
    reveal: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100
        }
      }
    }
  };

  const getTextContent = () => {
    if (typeof text === 'string') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.1,
                delay: index * 0.03
              }
            }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }
    return children;
  };

  const getAnimationStyles = () => {
    if (animation === 'gradient') {
      return {
        background: 'linear-gradient(to right, #2ecc71, #3498db, #2ecc71)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      };
    }
    if (animation === 'typewriter') {
      return {
        display: 'inline-block',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      };
    }
    return {};
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animations[animation]}
      style={getAnimationStyles()}
      {...(repeatDelay && {
        animate: {
          opacity: [0, 1],
          y: [20, 0],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay
          }
        }
      })}
      className={classNames(
        'inline-flex',
        animation === 'gradient' && 'bg-clip-text',
        className
      )}
      {...props}
    >
      <Element className="inline-flex flex-wrap">
        {getTextContent()}
      </Element>
    </motion.div>
  );
};

AnimatedText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string,
  animation: PropTypes.oneOf(['default', 'typewriter', 'gradient', 'fadeUp', 'reveal']),
  el: PropTypes.oneOf(['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
  repeatDelay: PropTypes.number
};

export default AnimatedText;
