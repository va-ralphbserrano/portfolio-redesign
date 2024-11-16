import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollTop } from '../../hooks/useScrollTop';

const ScrollLink = ({ children, to, className, ...props }) => {
  const scrollToTop = useScrollTop();

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <Link
      to={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;
