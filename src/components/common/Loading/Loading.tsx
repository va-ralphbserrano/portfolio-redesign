import React from 'react';
import LoadingText from './LoadingText';
import LoadingSpinner from './LoadingSpinner';

type LoadingType = 'spinner' | 'dots' | 'pulse';
type LoadingSize = 'sm' | 'md' | 'lg';
type LoadingColor = 'primary' | 'secondary' | 'white';

interface LoadingProps {
  type?: LoadingType;
  size?: LoadingSize;
  color?: LoadingColor;
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  className = '',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
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
        aria-label={text || 'Loading'}
        className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      >
        {text && <span className="sr-only">{text}</span>}
      </div>
    ),
    dots: () => (
      <div 
        role="status"
        aria-label={text || 'Loading'}
        className={`flex space-x-1 ${className}`}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`animate-pulse rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
          />
        ))}
        {text && <span className="sr-only">{text}</span>}
      </div>
    ),
    pulse: () => (
      <div
        role="status"
        aria-label={text || 'Loading'}
        className={`animate-pulse ${sizeClasses[size]} ${colorClasses[color]} rounded-full ${className}`}
      >
        {text && <span className="sr-only">{text}</span>}
      </div>
    )
  };

  return (
    <div className="flex items-center justify-center">
      {LoaderComponent[type]()}
      {text && <LoadingText text={text} />}
    </div>
  );
};

Loading.displayName = 'Loading';

const LoadingComponent = {
  Text: LoadingText,
  Spinner: LoadingSpinner
};

export default LoadingComponent;
