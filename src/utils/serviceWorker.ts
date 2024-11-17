import { logError, logInfo } from './logging';

// Get base URL from Vite
const base = import.meta.env.BASE_URL;

export const registerServiceWorker = async () => {
  if (import.meta.env.DEV) {
    logInfo('Service worker registration skipped in development.');
    return;
  }

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        `${base}sw.js`,
        { scope: base }
      );
      
      if (registration.installing) {
        logInfo('Service worker installing');
      } else if (registration.waiting) {
        logInfo('Service worker installed');
      } else if (registration.active) {
        logInfo('Service worker active');
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              logInfo('Service worker update found');
            }
          });
        }
      });
    } catch (error) {
      logError('Service worker registration failed:', error);
    }
  }
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      logInfo('Service worker unregistered successfully');
    } catch (error) {
      logError('Service worker unregistration failed:', error);
    }
  }
};
