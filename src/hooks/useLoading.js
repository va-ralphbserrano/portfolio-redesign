import { useState, useEffect } from 'react';

const useLoading = (minimumLoadTime = 500) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if all resources are already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Wait for resources to load
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [minimumLoadTime]);

  return isLoading;
};

export default useLoading;
