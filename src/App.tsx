/**
 * @fileoverview Main application component that handles routing and layout structure
 * @description This is the root component of the portfolio application, managing the overall
 * layout and routing configuration. It implements a responsive design with dark mode support
 * and animated route transitions.
 */

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/footer';
import { PageTransition } from '@/components/common/PageTransition';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import { Portfolio } from '@/components/sections/portfolio';
import Services from '@/components/sections/services/Services';
import Contact from '@/components/sections/contact';
import Certificates from '@/components/sections/certificates';
import { projects } from '@/components/sections/portfolio/projects';

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
            <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio projects={projects} /></PageTransition>} />
            <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/contact" element={
              <PageTransition>
                <Contact onSubmit={async (data) => {
                  // Handle form submission
                  console.log('Form submitted:', data);
                  return { success: true, message: 'Form submitted successfully' };
                }} />
              </PageTransition>
            } />
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
