import { lazy } from 'react';

// Lazy load components
const Home = lazy(() => import('../components/sections/Home'));
const About = lazy(() => import('../components/sections/About'));
const Services = lazy(() => import('../components/sections/Services'));
const Portfolio = lazy(() => import('../components/sections/Portfolio'));
const Contact = lazy(() => import('../components/sections/Contact'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    meta: {
      title: 'Home - Ralph Bernard Serrano',
      description: 'Welcome to my professional portfolio'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About - Ralph Bernard Serrano',
      description: 'Learn more about my skills and experience'
    }
  },
  {
    path: '/services',
    component: Services,
    meta: {
      title: 'Services - Ralph Bernard Serrano',
      description: 'Professional web development and design services'
    }
  },
  {
    path: '/portfolio',
    component: Portfolio,
    meta: {
      title: 'Portfolio - Ralph Bernard Serrano',
      description: 'View my latest projects and works'
    }
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: 'Contact - Ralph Bernard Serrano',
      description: 'Get in touch with me for collaborations'
    }
  }
];

// Update meta tags for each route
export const updateMetaTags = (route) => {
  document.title = route.meta.title;
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', route.meta.description);
  }
};
