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
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={classNames(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className="relative">
          {/* Navbar Background with Blur */}
          <div className={classNames(
            'absolute inset-0 transition-all duration-300',
            isScrolled 
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
              : 'bg-transparent'
          )} />

          {/* Navbar Content */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link 
                  to="/"
                  className="group flex items-center space-x-2 text-xl font-semibold tracking-tight"
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    R
                  </motion.div>
                  <div className="transition-colors duration-200">
                    <span className="text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                      Ralph
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      .dev
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={classNames(
                      'relative px-4 py-2 rounded-xl text-sm font-medium',
                      'transition-all duration-200 ease-out',
                      location.pathname === link.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
                      'group'
                    )}
                  >
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative flex items-center">
                      {link.icon && (
                        <span className={classNames(
                          'mr-2 transition-colors duration-200',
                          location.pathname === link.href
                            ? 'text-primary-500 dark:text-primary-400'
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                        )}>
                          {link.icon}
                        </span>
                      )}
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  className="relative inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none"
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <motion.div
                    animate={isMobileMenuOpen ? "open" : "closed"}
                    className="w-6 h-6 flex flex-col justify-center items-center"
                  >
                    <motion.span
                      className="w-5 h-0.5 bg-current mb-1.5 block"
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 6 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="w-5 h-0.5 bg-current mb-1.5 block"
                      variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="w-5 h-0.5 bg-current block"
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -6 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

export { Navbar };
