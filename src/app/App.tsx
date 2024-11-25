/**
 * @fileoverview Main application component that handles routing and layout structure
 * @description This is the root component of the portfolio application, managing the overall
 * layout and routing configuration. It implements a responsive design with dark mode support
 * and animated route transitions.
 */

import { AnimatePresence } from 'framer-motion';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { Footer } from '@/shared/components/layout/footer/Footer';
import { Navbar } from '@/shared/components/layout/Navbar';
import { Button } from '@/components/common/buttons/Button';

// Lazy load route components
const Hero = lazy(() => import('@/components/sections/hero').then(m => ({ default: m.Hero })));
const About = lazy(() => import('@/modules/about').then(m => ({ default: m.About })));
const Portfolio = lazy(() => import('@/modules/portfolio/components/Portfolio').then(m => ({ default: m.Portfolio })));
const CertificatesSection = lazy(() => import('@/components/sections/certificates'));
const Services = lazy(() => import('@/modules/services/components').then(m => ({ default: m.Services })));
const ContactSection = lazy(() => import('@/features/contact/components'));

/**
 * Loading spinner component for route transitions
 */
const RouteLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Button loading loadingText="Loading..." disabled />
  </div>
);

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
          <Suspense fallback={<RouteLoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Hero />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <About />
                </PageTransition>
              } />
              <Route path="/portfolio" element={
                <PageTransition>
                  <Portfolio />
                </PageTransition>
              } />
              <Route path="/certificates" element={
                <PageTransition>
                  <CertificatesSection />
                </PageTransition>
              } />
              <Route path="/services" element={
                <PageTransition>
                  <Services />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <ContactSection />
                </PageTransition>
              } />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
