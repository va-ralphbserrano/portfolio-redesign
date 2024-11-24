import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '@/shared/types/route';
import { projects as portfolioData } from '@/modules/portfolio/components/projects';
import { projects as technicalData } from '@/modules/portfolio/components/projects';

const Home = lazy(() => import('@/components/sections/hero'));
const About = lazy(() => import('@/modules/about/components/About'));
const Services = lazy(() => import('@/modules/services/components/Services'));
const Contact = lazy(() => import('@/features/contact/components/ContactSection'));
const Certificates = lazy(() => import('@/components/sections/certificates'));

// Wrap Portfolio component with props
const Portfolio = lazy(async () => {
  const { Portfolio: PortfolioComponent } = await import('@/modules/portfolio/components');
  return {
    default: () => React.createElement(PortfolioComponent, { projects: portfolioData })
  };
});

// Technical projects are handled by the Portfolio component with different data
const TechnicalProjects = lazy(async () => {
  const { Portfolio: PortfolioComponent } = await import('@/modules/portfolio/components');
  return {
    default: () => React.createElement(PortfolioComponent, { projects: technicalData })
  };
});

export const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/services', component: Services },
  { path: '/portfolio', component: Portfolio },
  { path: '/contact', component: Contact },
  { path: '/certificates', component: Certificates },
  { path: '/technical-projects', component: TechnicalProjects }
];

export default routes;
