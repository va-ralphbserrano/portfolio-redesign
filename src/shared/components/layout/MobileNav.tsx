import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '@/shared/utils/helpers';
import { MobileNavProps, NavLink } from '@/shared/types/navigation';

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const renderNavLinks = () => (
    <motion.nav className="flex flex-col space-y-4">
      {navLinks.map((link: NavLink) => (
        <motion.div
          key={link.href}
          variants={itemVariants}
          className="overflow-hidden"
        >
          {link.isExternal ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames(
                'block px-4 py-2 text-lg font-medium transition-colors duration-200',
                'text-gray-900 hover:text-primary-500 dark:text-white dark:hover:text-primary-400'
              )}
              onClick={onClose}
            >
              <span className="flex items-center">
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </span>
            </a>
          ) : (
            <Link
              to={link.href}
              className={classNames(
                'block px-4 py-2 text-lg font-medium transition-colors duration-200',
                location.pathname === link.href
                  ? 'text-primary-500 dark:text-primary-400'
                  : 'text-gray-900 hover:text-primary-500 dark:text-white dark:hover:text-primary-400'
              )}
              onClick={onClose}
            >
              <span className="flex items-center">
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </span>
            </Link>
          )}
        </motion.div>
      ))}
    </motion.nav>
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              {renderNavLinks()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export { MobileNav };
