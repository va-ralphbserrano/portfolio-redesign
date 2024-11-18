import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading/Loading';

interface RouteWrapperProps {
  children: React.ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading type="spinner" size="large" color="primary" />}>
        <motion.div
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Suspense>
    </ErrorBoundary>
  );
};
