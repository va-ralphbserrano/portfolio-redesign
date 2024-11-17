import { ReactNode } from 'react';

export const positions = {
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
} as const;

export type TooltipPosition = keyof typeof positions;
export type TooltipTrigger = 'hover' | 'click';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  dark?: boolean;
  arrow?: boolean;
  maxWidth?: number;
  trigger?: TooltipTrigger;
}

export interface TooltipContentProps {
  content: ReactNode;
  position: TooltipPosition;
  dark: boolean;
  arrow: boolean;
  maxWidth: number;
  className?: string;
}
