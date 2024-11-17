import React from 'react';
import { classNames } from '../../../utils/helpers';
import { ImageProps } from './types';

export const CardImage: React.FC<ImageProps> = ({ src, alt, className, ...props }) => (
  <div className="relative w-full h-48">
    <img
      src={src}
      alt={alt}
      className={classNames(
        'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
        className
      )}
      {...props}
    />
  </div>
);

CardImage.displayName = 'Card.Image';
