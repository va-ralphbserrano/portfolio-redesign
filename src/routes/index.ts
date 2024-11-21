import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from '@/types/route';
import { portfolioData } from '@/data/portfolio';
import { technicalData } from '@/data/technical';

const Home = lazy(() => import('@/components/sections/hero').then(module => ({ default: module.Hero })));
const About = lazy(() => import('@/components/sections/about').then(module => ({ default: module.About })));
const Services = lazy(() => import('@/components/sections/services').then(module => ({ default: module.Services })));
const Contact = lazy(() => import('@/components/sections/contact/ContactForm'));
const Certificates = lazy(() => import('@/components/sections/Certificates'));

// Wrap Portfolio component with props
const Portfolio = lazy(async () => {
  const { Portfolio: PortfolioComponent } = await import('@/components/sections/portfolio');
  return {
    default: () => React.createElement(PortfolioComponent, { projects: portfolioData.projects })
  };
});

// Wrap TechnicalProjects component with props
const TechnicalProjects = lazy(async () => {
  const { TechnicalProjects: TechnicalProjectsComponent } = await import('@/components/sections/TechnicalProjects');
  return {
    default: () => React.createElement(TechnicalProjectsComponent, { projects: technicalData.projects })
  };
});

export const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/portfolio', component: Portfolio },
  { path: '/technical-projects', component: TechnicalProjects },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
  { path: '/certificates', component: Certificates }
];

export default routes;
