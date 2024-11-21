import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '@/utils/helpers';
import { MobileNavProps } from '@/types/navigation';

const menuVariants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  closed: {
    x: 20,
    opacity: 0
  },
  open: {
    x: 0,
    opacity: 1
  }
};

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2 }
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen && location.pathname !== window.location.pathname) {
      onClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const content = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            style={{ zIndex: 100 }}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-[min(100vw-3rem,24rem)] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl overflow-hidden"
            style={{ zIndex: 101 }}
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <motion.div 
                className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={onClose}
                  className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="text-lg font-medium tracking-tight">Navigation</span>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <motion.ul 
                  className="space-y-2"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.2
                      }
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1
                      }
                    }
                  }}
                >
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.href}
                      variants={itemVariants}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={classNames(
                          'flex items-center w-full px-4 py-3 rounded-xl',
                          'transition-all duration-200 ease-out group',
                          location.pathname === link.href
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                        )}
                      >
                        {link.icon && (
                          <span className={classNames(
                            'mr-4 transition-transform duration-200 group-hover:scale-110',
                            location.pathname === link.href
                              ? 'text-primary-500 dark:text-primary-400'
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                          )}>
                            {link.icon}
                          </span>
                        )}
                        <span className="font-medium">{link.label}</span>
                        {location.pathname === link.href && (
                          <motion.div
                            layoutId="mobile-active"
                            className="absolute left-0 w-1 h-8 bg-primary-500 dark:bg-primary-400 rounded-r-full my-auto"
                            style={{ top: 'calc(50% - 1rem)' }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

export { MobileNav };
