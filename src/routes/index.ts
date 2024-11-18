import { lazy } from 'react';
import { RouteConfig } from '@/types/route';

const routes: RouteConfig[] = [
  { path: '/', component: lazy(() => import('@/components/sections/Hero')) },
  { path: '/about', component: lazy(() => import('@/components/sections/About')) },
  { path: '/services', component: lazy(() => import('@/components/sections/Services')) },
  { path: '/portfolio', component: lazy(() => import('@/components/sections/Portfolio')) },
  { path: '/contact', component: lazy(() => import('@/components/sections/Contact')) },
  { path: '/certificates', component: lazy(() => import('@/components/sections/Certificates')) }
];

export default routes;
