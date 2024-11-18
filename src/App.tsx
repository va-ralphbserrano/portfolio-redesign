import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Lazy load route components
const Hero = React.lazy(() => import('@/components/sections/Hero'));
const About = React.lazy(() => import('@/components/sections/About'));
const Services = React.lazy(() => import('@/components/sections/Services'));
const Portfolio = React.lazy(() => import('@/components/sections/Portfolio'));
const Certificates = React.lazy(() => import('@/components/sections/Certificates'));
const Contact = React.lazy(() => import('@/components/sections/Contact'));

// Wrap component with error boundary
const withErrorBoundary = (Component: React.ComponentType) => (
  <ErrorBoundary>
    <Component />
  </ErrorBoundary>
);

const App: React.FC = () => {
  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={withErrorBoundary(Hero)} />
            <Route path="/about" element={withErrorBoundary(About)} />
            <Route path="/services" element={withErrorBoundary(Services)} />
            <Route path="/portfolio" element={withErrorBoundary(Portfolio)} />
            <Route path="/certificates" element={withErrorBoundary(Certificates)} />
            <Route path="/contact" element={withErrorBoundary(Contact)} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default App;
