import React from 'react';
import { motion } from 'framer-motion';

export interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string | undefined;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = 400,
  height = 300,
  text = 'Placeholder',
  className = ''
}) => {
  const colors = {
    background: 'rgb(229, 231, 235)',
    text: 'rgb(107, 114, 128)'
  };

  return (
    <motion.div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width,
        height,
        backgroundColor: colors.background,
        borderRadius: '0.5rem'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <span style={{ color: colors.text }}>{text}</span>
    </motion.div>
  );
};

export default PlaceholderImage;
