import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { WithChildren, WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps extends WithChildren, WithClassName {
  content: ReactNode;
  position?: TooltipPosition;
  dark?: boolean;
  arrow?: boolean;
  maxWidth?: number;
  delay?: number;
  trigger?: 'hover' | 'click';
}

interface TooltipContentProps extends WithClassName {
  content: ReactNode;
  position: TooltipPosition;
  dark: boolean;
  arrow: boolean;
  maxWidth: number;
}

const TooltipContent: React.FC<TooltipContentProps> = ({
  content,
  position,
  dark,
  arrow,
  maxWidth,
  className = ''
}) => {
  const positionClasses = {
    top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
    bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
    left: '-left-2 top-1/2 -translate-x-full -translate-y-1/2',
    right: '-right-2 top-1/2 translate-x-full -translate-y-1/2'
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-800 dark:border-t-white border-x-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-800 dark:border-b-white border-x-transparent border-t-transparent',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-800 dark:border-l-white border-y-transparent border-r-transparent',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-800 dark:border-r-white border-y-transparent border-l-transparent'
  };

  return (
    <div
      className={classNames(
        'absolute z-10 px-2 py-1 text-sm rounded shadow-lg whitespace-nowrap',
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
        positionClasses[position],
        className
      )}
      style={{ maxWidth }}
    >
      {content}
      {arrow && (
        <div
          className={classNames(
            'absolute w-2 h-2 border-4',
            arrowClasses[position]
          )}
        />
      )}
    </div>
  );
};

const Tooltip: React.FC<TooltipProps> = ({
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

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      if (delay) {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    }
  }, [trigger, delay]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }
  }, [trigger]);

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  }, [trigger, isVisible]);

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
          <TooltipContent
            content={content}
            position={position}
            dark={dark}
            arrow={arrow}
            maxWidth={maxWidth}
            className={classNames(
              'invisible opacity-0 group-hover:visible group-hover:opacity-100',
              'transition-all duration-200',
              className
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
