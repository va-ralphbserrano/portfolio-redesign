import React from 'react';
import AnimatedLayout from './AnimatedLayout';
import Navbar from './Navbar';
import Footer from './Footer';
import { WithClassName } from '@/types/component';

interface LayoutProps extends WithClassName {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="relative pt-16">
        <AnimatedLayout className={className || ''}>
          {children}
        </AnimatedLayout>
      </main>
      <Footer />
    </div>
  );
};

Layout.displayName = 'Layout';

export default Layout;
