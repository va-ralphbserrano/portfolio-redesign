import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { debounce } from 'lodash-es';

interface Breakpoints {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

type ResponsiveValue = {
  base: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
}

interface PerformanceConfig {
  monitorResize?: boolean;
  debounceDelay?: number;
  optimizeReflows?: boolean;
}

interface AdaptiveContainerProps {
  children: React.ReactNode;
  minWidth?: string | number;
  maxWidth?: string | number;
  padding?: string | number | ResponsiveValue;
  margin?: string | number | ResponsiveValue;
  breakpoints?: Breakpoints;
  behavior?: 'fluid' | 'fixed' | 'hybrid';
  performance?: PerformanceConfig;
  className?: string;
  onResize?: (width: number) => void;
}

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const getResponsiveValue = (
  value: string | number | ResponsiveValue | undefined,
  breakpoint: keyof Breakpoints | 'base',
  defaultValue: string
): string => {
  if (!value) return defaultValue;
  if (typeof value === 'string' || typeof value === 'number') return value.toString();
  
  if (breakpoint === 'base') return value.base.toString();
  return (value[breakpoint] || value.base).toString();
};

const Container = styled.div<{
  $minWidth: string;
  $maxWidth: string;
  $padding: string;
  $margin: string;
  $behavior: string;
  $optimizeReflows: boolean;
}>`
  min-width: ${props => props.$minWidth};
  max-width: ${props => props.$maxWidth};
  padding: ${props => props.$padding};
  margin: ${props => props.$margin};
  width: ${props => props.$behavior === 'fluid' ? '100%' : 'auto'};
  ${props => props.$optimizeReflows && `
    contain: layout;
    will-change: contents;
  `}
  
  @media (min-width: ${defaultBreakpoints.sm}px) {
    padding: ${props => getResponsiveValue(props.$padding, 'sm', String(props.$padding))};
    margin: ${props => getResponsiveValue(props.$margin, 'sm', String(props.$margin))};
  }

  @media (min-width: ${defaultBreakpoints.md}px) {
    padding: ${props => getResponsiveValue(props.$padding, 'md', String(props.$padding))};
    margin: ${props => getResponsiveValue(props.$margin, 'md', String(props.$margin))};
  }

  @media (min-width: ${defaultBreakpoints.lg}px) {
    padding: ${props => getResponsiveValue(props.$padding, 'lg', String(props.$padding))};
    margin: ${props => getResponsiveValue(props.$margin, 'lg', String(props.$margin))};
  }

  @media (min-width: ${defaultBreakpoints.xl}px) {
    padding: ${props => getResponsiveValue(props.$padding, 'xl', String(props.$padding))};
    margin: ${props => getResponsiveValue(props.$margin, 'xl', String(props.$margin))};
  }
`;

export const AdaptiveContainer: React.FC<AdaptiveContainerProps> = ({
  children,
  minWidth = 'auto',
  maxWidth = '100%',
  padding = '1rem',
  margin = '0',
  breakpoints = defaultBreakpoints,
  behavior = 'fluid',
  performance = {
    monitorResize: true,
    debounceDelay: 150,
    optimizeReflows: true,
  },
  className,
  onResize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.offsetWidth;
    setCurrentWidth(width);
    onResize?.(width);
  }, [onResize]);

  const debouncedResize = performance.monitorResize
    ? debounce(handleResize, performance.debounceDelay || 150)
    : handleResize;

  useEffect(() => {
    if (!performance.monitorResize) return;

    const resizeObserver = new ResizeObserver(debouncedResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (debouncedResize.cancel) {
        debouncedResize.cancel();
      }
    };
  }, [performance.monitorResize, debouncedResize]);

  return (
    <Container
      ref={containerRef}
      $minWidth={minWidth.toString()}
      $maxWidth={maxWidth.toString()}
      $padding={getResponsiveValue(padding, 'base', '1rem')}
      $margin={getResponsiveValue(margin, 'base', '0')}
      $behavior={behavior}
      $optimizeReflows={performance.optimizeReflows || false}
      className={className}
      data-testid="adaptive-container"
      data-breakpoints={JSON.stringify(breakpoints)}
      data-width={currentWidth}
    >
      {children}
    </Container>
  );
};
