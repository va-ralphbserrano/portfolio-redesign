import { AnimationType } from './types';

export const getAnimationStyles = (animation: AnimationType): React.CSSProperties => {
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
