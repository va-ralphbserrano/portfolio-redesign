import { useEffect, useState } from 'react';

export const useWebGLContext = () => {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (gl) {
        setIsWebGLAvailable(true);
      } else {
        setIsWebGLAvailable(false);
      }
    } catch (e) {
      setIsWebGLAvailable(false);
    }
  }, []);

  return isWebGLAvailable;
};
