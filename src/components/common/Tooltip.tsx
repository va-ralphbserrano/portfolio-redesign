import { classNames } from '@/shared/utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useRef, useState } from 'react';

// Types
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface WithClassName {
  className?: string;
}

interface WithChildren {
  children: React.ReactNode;
}

interface TooltipProps extends WithChildren, WithClassName {
  content: React.ReactNode;
  position?: TooltipPosition;
  dark?: boolean;
  arrow?: boolean;
  maxWidth?: number;
  delay?: number;
  trigger?: 'hover' | 'click';
}

interface TooltipContentProps extends WithClassName {
  content: React.ReactNode;
  position: TooltipPosition;
  dark: boolean;
  arrow: boolean;
  maxWidth: number;
}

// Constants and Animations
const positions = {
  top: {
    placement: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
    arrow: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-current'
  },
  bottom: {
    placement: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
    arrow: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-current'
  },
  left: {
    placement: '-left-2 top-1/2 -translate-x-full -translate-y-1/2',
    arrow: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-current'
  },
  right: {
    placement: '-right-2 top-1/2 translate-x-full -translate-y-1/2',
    arrow: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-current'
  }
};

const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2
    }
  }
};

// TooltipContent Component
const TooltipContent: React.FC<TooltipContentProps> = ({
  content,
  position,
  dark,
  arrow,
  maxWidth,
  className
}) => (
  <motion.div
    className={classNames(
      'absolute z-50 px-2 py-1 text-sm whitespace-normal break-words rounded shadow-lg',
      dark ? 'bg-gray-900 text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200',
      'border',
      positions[position].placement,
      className
    )}
    style={{ maxWidth }}
    variants={tooltipVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    {content}
    {arrow && (
      <span
        className={classNames(
          'absolute w-2 h-2 rotate-45',
          'border-4 border-transparent',
          dark ? 'bg-gray-900' : 'bg-white',
          positions[position].arrow
        )}
      />
    )}
  </motion.div>
);

// Main Tooltip Component
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  dark = false,
  arrow = true,
  maxWidth = 200,
  className = '',
  delay = 0,
  trigger = 'hover'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  const toggleTooltip = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const handleMouseEvents = trigger === 'hover' ? {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip
  } : {
    onClick: toggleTooltip
  };

  return (
    <div className={classNames('relative inline-block', className)} ref={triggerRef} {...handleMouseEvents}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <TooltipContent
            content={content}
            position={position}
            dark={dark}
            arrow={arrow}
            maxWidth={maxWidth}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
