import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../../utils/helpers';
import { NavbarProps, navbarVariants, navLinkVariants } from './types';

export const Navbar: React.FC<NavbarProps> = ({
  className
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-lg' : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Ralph
              </span>
              <span className="text-gray-700 dark:text-gray-300">.dev</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={navLinkVariants}>
                <Link
                  to={link.path}
                  className={classNames(
                    'text-sm font-medium transition-colors hover:text-primary-500',
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
