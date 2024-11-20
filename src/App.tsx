/**
 * @fileoverview Main application component that handles routing and layout structure
 * @description This is the root component of the portfolio application, managing the overall
 * layout and routing configuration. It implements a responsive design with dark mode support
 * and animated route transitions.
 */

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RouteWrapper } from '@/components/common/RouteWrapper';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import Portfolio from '@/components/sections/portfolio';
import { Services } from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Certificates from '@/components/sections/Certificates';
import { projects } from '@/data/projects';

/**
 * Main application component
 * @component
 * @description Provides the main layout structure and routing configuration for the portfolio
 * application. Includes a responsive navbar, animated route transitions, and a footer.
 * 
 * Features:
 * - Responsive layout with dark mode support
 * - Animated page transitions using Framer Motion
 * - Centralized routing configuration
 * - Automatic redirect for unknown routes
 * 
 * @returns {JSX.Element} The rendered application with routing and layout structure
 */
const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<RouteWrapper><Hero /></RouteWrapper>} />
            <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
            <Route path="/portfolio" element={<RouteWrapper><Portfolio projects={projects} /></RouteWrapper>} />
            <Route path="/services" element={<RouteWrapper><Services /></RouteWrapper>} />
            <Route path="/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
            <Route path="/certificates" element={<RouteWrapper><Certificates /></RouteWrapper>} />
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
