import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollRestoration: React.FC = () => {
  const location = useLocation();
  const lastHash = useRef<string>('');

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash;
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Handle browser back/forward
  useEffect(() => {
    const handler = () => {
      const currentHash = window.location.hash;
      if (currentHash !== lastHash.current) {
        lastHash.current = currentHash;
        if (currentHash) {
          const element = document.querySelector(currentHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return null;
};

export default ScrollRestoration;
