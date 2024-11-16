import React from 'react';

const BackgroundElements = () => {
  return (
    <>
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Gradient meshes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient mesh */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/5 via-transparent to-transparent transform rotate-12 blur-xl" />
        
        {/* Secondary gradient mesh */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-blue-500/5 via-transparent to-transparent transform -rotate-12 blur-xl" />
        
        {/* Accent blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-400/3 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-purple-400/3 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-[500px] h-[500px] bg-blue-400/3 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-soft-light">
        <div className="absolute inset-0 bg-repeat bg-noise" />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-light dark:bg-radial-dark opacity-50" />
    </>
  );
};

export default BackgroundElements;
