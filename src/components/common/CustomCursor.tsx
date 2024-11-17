import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';

interface MousePosition {
  x: number;
  y: number;
}

interface CursorVariants {
  [key: string]: {
    x: number;
    y: number;
    scale?: number;
  };
}

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<string>('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleLinkHover = () => setCursorVariant('hover');
    const handleLinkLeave = () => setCursorVariant('default');

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  const variants: CursorVariants = {
    ['default']: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    ['hover']: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5
    }
  };

  return (
    <motion.div
      className={classNames(
        'hidden lg:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-50',
        'bg-primary rounded-full mix-blend-difference'
      )}
      animate={cursorVariant}
      variants={variants}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full border-2 border-primary-500 opacity-25" />
        <div className="absolute inset-2 rounded-full border border-primary-500 opacity-50" />
        <div className="absolute inset-3 rounded-full border border-primary-500 opacity-75" />
        <div className="absolute inset-[14px] rounded-full bg-primary-500" />
      </div>
    </motion.div>
  );
};

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
