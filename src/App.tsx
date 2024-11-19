import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RouteWrapper } from '@/components/common/RouteWrapper';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import Portfolio from '@/components/sections/portfolio';
import { Services } from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Certificates from '@/components/sections/Certificates';
import { projects } from '@/data/projects';

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
