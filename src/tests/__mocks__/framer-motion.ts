import { vi } from 'vitest';
import React from 'react';

const mockAnimate = vi.fn();
const mockStart = vi.fn();
const mockStop = vi.fn();

export const motion = {
  div: ({ children, ...props }: any) => React.createElement('div', props, children),
  nav: ({ children, ...props }: any) => React.createElement('nav', props, children),
  header: ({ children, ...props }: any) => React.createElement('header', props, children),
  button: ({ children, ...props }: any) => React.createElement('button', props, children),
  span: ({ children, ...props }: any) => React.createElement('span', props, children),
  ul: ({ children, ...props }: any) => React.createElement('ul', props, children),
  li: ({ children, ...props }: any) => React.createElement('li', props, children),
  a: ({ children, ...props }: any) => React.createElement('a', props, children),
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children;

export const useAnimation = () => ({
  start: mockStart,
  stop: mockStop,
});

export const useScroll = () => ({
  scrollY: { get: () => 0, onChange: vi.fn() },
});

export const useSpring = (value: any) => value;

export const animate = mockAnimate;

// Easing functions
export const easeOut = (t: number) => t;
export const easeIn = (t: number) => t;
export const easeInOut = (t: number) => t;

// Variants
export const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Additional exports
export const domAnimation = {};
export const domMax = {};
export const LazyMotion = ({ children }: { children: React.ReactNode }) => children;
export const m = motion;
