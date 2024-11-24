import React, { useEffect, useRef } from 'react';
import { classNames } from '@/shared/utils/helpers';

interface AdaptiveContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  performance?: {
    monitorResize?: boolean;
    debounceDelay?: number;
    optimizeReflows?: boolean;
  };
  onResize?: (width: number, height: number) => void;
}

export const AdaptiveContainer: React.FC<AdaptiveContainerProps> = ({
  children,
  className,
  padding = {},
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
  },
  performance = {
    monitorResize: false,
    debounceDelay: 150,
    optimizeReflows: false,
  },
  onResize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!performance.monitorResize || !onResize) return;

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          onResize(width, height);
        }
      }, performance.debounceDelay);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [performance.monitorResize, performance.debounceDelay, onResize]);

  const containerStyles: React.CSSProperties = {
    minWidth: 'auto',
    maxWidth: '100%',
    padding: padding.base,
    ...(performance.optimizeReflows && {
      contain: 'layout',
      willChange: 'contents',
    }),
  };

  return (
    <div
      ref={containerRef}
      className={classNames('adaptive-container', className)}
      style={containerStyles}
      data-testid="adaptive-container"
      data-breakpoints={JSON.stringify(breakpoints)}
    >
      {children}
    </div>
  );
};

AdaptiveContainer.displayName = 'AdaptiveContainer';
