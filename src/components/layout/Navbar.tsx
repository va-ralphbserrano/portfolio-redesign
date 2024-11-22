import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { MobileNav } from './MobileNav';
import {
  HomeIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  FolderIcon,
  AcademicCapIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from '@/types/navigation';

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const navLinks: NavLink[] = [
  { id: 'home', label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { id: 'about', label: 'About', href: '/about', icon: <UserIcon className="h-5 w-5" /> },
  { id: 'services', label: 'Services', href: '/services', icon: <WrenchScrewdriverIcon className="h-5 w-5" /> },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio', icon: <FolderIcon className="h-5 w-5" /> },
  { id: 'certificates', label: 'Certificates', href: '/certificates', icon: <AcademicCapIcon className="h-5 w-5" /> },
  { id: 'contact', label: 'Contact', href: '/contact', icon: <EnvelopeIcon className="h-5 w-5" /> }
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-dark-200/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Ralph.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className={classNames(
                  'px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2',
                  location.pathname === link.href
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-dark-100/50 text-gray-600 dark:text-gray-300'
                )}
              >
                <span className="opacity-75">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <span className={classNames(
                'absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300',
                isMobileMenuOpen ? 'rotate-45 top-[11px]' : 'top-[6px]'
              )} />
              <span className={classNames(
                'absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300 top-[11px] transition-all duration-300',
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              )} />
              <span className={classNames(
                'absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300',
                isMobileMenuOpen ? '-rotate-45 top-[11px]' : 'top-[16px]'
              )} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-dark-200/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={classNames(
                    'block px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2',
                    location.pathname === link.href
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-dark-100/50 text-gray-600 dark:text-gray-300'
                  )}
                >
                  <span className="opacity-75">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export { Navbar };
