import React from 'react';
import { LoadingProps } from './types';

const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white'
  };

  const LoaderComponent = {
    spinner: () => (
      <div
        role="status"
        aria-label="Loading"
        className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      />
    ),
    dots: () => (
      <div 
        role="status"
        aria-label="Loading"
        className={`flex space-x-1 ${className}`}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`animate-pulse rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
          />
        ))}
      </div>
    ),
    pulse: () => (
      <div
        role="status"
        aria-label="Loading"
        className={`animate-pulse ${sizeClasses[size]} ${colorClasses[color]} rounded-full ${className}`}
      />
    )
  };

  return (
    <div className="flex items-center justify-center">
      {LoaderComponent[type]()}
    </div>
  );
};

Loading.displayName = 'Loading';

export default Loading;
