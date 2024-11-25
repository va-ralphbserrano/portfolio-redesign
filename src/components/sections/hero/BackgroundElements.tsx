import React, { useRef } from 'react';
import { classNames } from '@/shared/utils/helpers';
import { BackgroundElementsProps } from './types';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/features/theme/context/ThemeContext';

const ParticleField = () => {
  const points = useRef<THREE.Points>(null!);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Generate random points in a sphere
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Color gradient based on position
    const color = new THREE.Color();
    color.setHSL(
      0.6 + (positions[i3] / 8),
      0.7,
      isDarkMode ? 0.6 : 0.5
    );
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame(({ clock, pointer }) => {
    if (points.current) {
      points.current.rotation.x = clock.getElapsedTime() * 0.05;
      points.current.rotation.y = clock.getElapsedTime() * 0.08;
      points.current.rotation.x += (pointer.x * 0.2 - points.current.rotation.x) * 0.05;
      points.current.rotation.y += (pointer.y * 0.2 - points.current.rotation.y) * 0.05;
    }
  });

  return (
    <Points ref={points} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const BackgroundElements: React.FC<BackgroundElementsProps> = ({
  className
}) => {
  const { theme } = useTheme();

  return (
    <div className={classNames('absolute inset-0', className)}>
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* 3D Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="opacity-30"
        >
          <ParticleField />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
      
      {/* Gradient meshes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {/* Primary gradient mesh */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/5 via-transparent to-transparent transform rotate-12 blur-lg" />
        
        {/* Secondary gradient mesh */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-blue-500/5 via-transparent to-transparent transform -rotate-12 blur-lg" />
        
        {/* Accent blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-400/3 rounded-full mix-blend-normal filter blur-2xl animate-blob" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-purple-400/3 rounded-full mix-blend-normal filter blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-[500px] h-[500px] bg-blue-400/3 rounded-full mix-blend-normal filter blur-2xl animate-blob animation-delay-4000" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.01] mix-blend-soft-light" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 bg-repeat bg-noise" />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-light dark:bg-radial-dark opacity-30" style={{ zIndex: 2 }} />
    </div>
  );
};

BackgroundElements.displayName = 'BackgroundElements';

export { BackgroundElements };
export default BackgroundElements;
