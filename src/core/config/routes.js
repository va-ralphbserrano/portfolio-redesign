import { lazy } from 'react';
import { metaConfig } from '@/data/meta';

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
      title: metaConfig.title,
      description: metaConfig.description,
      keywords: metaConfig.keywords.join(', '),
      ogTitle: metaConfig.title,
      ogDescription: metaConfig.description,
      ogImage: metaConfig.openGraph.image,
      twitterTitle: metaConfig.title,
      twitterDescription: metaConfig.description,
      twitterImage: metaConfig.twitter.image
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About - Ralph Bernard Serrano | Technical Designer & Virtual Solutions Expert',
      description: 'Learn about my 13+ years of experience in Technical Design, Web Development, and Virtual Assistance. Discover how I can help transform your projects.',
      keywords: 'about ralph serrano, technical designer background, virtual solutions expert experience, professional history, skills and expertise',
      ogTitle: 'About Ralph Bernard Serrano - Technical Designer & Virtual Solutions Expert',
      ogDescription: 'Learn about my professional journey and expertise in Technical Design, Web Development, and Virtual Assistance.',
      ogImage: metaConfig.openGraph.image,
      twitterTitle: 'About Ralph Bernard Serrano - Technical Designer',
      twitterDescription: 'Discover my professional journey and expertise.',
      twitterImage: metaConfig.twitter.image
    }
  },
  {
    path: '/services',
    component: Services,
    meta: {
      title: 'Services - Technical Design, Web Development & Virtual Solutions | Ralph Serrano',
      description: 'Professional services in AutoCAD Technical Design, Modern Web Development, and Virtual Assistance. Get expert solutions for your projects.',
      keywords: 'technical design services, web development, virtual assistance, AutoCAD services, project management, professional services',
      ogTitle: 'Professional Technical Design & Virtual Solutions Services',
      ogDescription: 'Expert services in Technical Design, Web Development, and Virtual Assistance.',
      ogImage: metaConfig.openGraph.image,
      twitterTitle: 'Technical Design & Virtual Solutions Services',
      twitterDescription: 'Expert services for your technical and virtual needs.',
      twitterImage: metaConfig.twitter.image
    }
  },
  {
    path: '/portfolio',
    component: Portfolio,
    meta: {
      title: 'Portfolio - Technical Design & Development Projects | Ralph Serrano',
      description: 'Explore my portfolio of successful Technical Design, Web Development, and Virtual Assistance projects. See how I help clients achieve their goals.',
      keywords: 'portfolio, technical design projects, web development work, virtual assistance portfolio, project showcase',
      ogTitle: 'Portfolio - Technical Design & Development Projects',
      ogDescription: 'View my portfolio of successful projects in Technical Design and Virtual Solutions.',
      ogImage: metaConfig.openGraph.image,
      twitterTitle: 'Technical Design & Development Portfolio',
      twitterDescription: 'Explore my portfolio of successful projects.',
      twitterImage: metaConfig.twitter.image
    }
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: 'Contact - Get in Touch for Technical Design & Virtual Solutions | Ralph Serrano',
      description: 'Ready to start your project? Contact me for professional Technical Design, Web Development, or Virtual Assistance services. Let\'s discuss your needs.',
      keywords: 'contact ralph serrano, hire technical designer, virtual solutions expert contact, project inquiry, professional services contact',
      ogTitle: 'Contact Ralph Serrano - Technical Design & Virtual Solutions',
      ogDescription: 'Get in touch for professional Technical Design and Virtual Solutions services.',
      ogImage: metaConfig.openGraph.image,
      twitterTitle: 'Contact for Technical Design & Virtual Solutions',
      twitterDescription: 'Let\'s discuss your project needs.',
      twitterImage: metaConfig.twitter.image
    }
  }
];

// Update meta tags for each route
export const updateMetaTags = (route) => {
  const { meta } = route;
  
  // Update basic meta tags
  document.title = meta.title;
  updateMetaTag('description', meta.description);
  updateMetaTag('keywords', meta.keywords);
  
  // Update Open Graph tags
  updateMetaTag('og:title', meta.ogTitle, 'property');
  updateMetaTag('og:description', meta.ogDescription, 'property');
  updateMetaTag('og:image', meta.ogImage, 'property');
  
  // Update Twitter Card tags
  updateMetaTag('twitter:title', meta.twitterTitle, 'property');
  updateMetaTag('twitter:description', meta.twitterDescription, 'property');
  updateMetaTag('twitter:image', meta.twitterImage, 'property');
};

// Helper function to update meta tags
const updateMetaTag = (name, content, attributeName = 'name') => {
  let element = document.querySelector(`meta[${attributeName}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attributeName, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};
