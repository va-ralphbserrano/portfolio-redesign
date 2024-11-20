import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'click';

interface CursorProps {
  children: React.ReactNode;
  className?: string;
}

const cursorVariants: Record<CursorVariant, any> = {
  default: {
    scale: 1,
    opacity: 1
  },
  hover: {
    scale: 1.5,
    opacity: 0.8
  },
  click: {
    scale: 0.8,
    opacity: 0.6
  }
};

export const CustomCursor: React.FC<CursorProps> = ({ children, className }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setCursorVariant('hover');
  };

  const handleMouseLeave = () => {
    setCursorVariant('default');
  };

  const handleMouseDown = () => {
    setCursorVariant('click');
  };

  const handleMouseUp = () => {
    setCursorVariant('hover');
  };

  return (
    <motion.div
      ref={cursorRef}
      className={className}
      animate={cursorVariant}
      variants={cursorVariants}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </motion.div>
  );
};

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
