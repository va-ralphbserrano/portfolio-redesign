import React, { Suspense, useState } from 'react';
import { useGLTF, Float } from '@react-three/drei';

function Model() {
  const [error, setError] = useState(false);

  if (error) {
    return <Fallback />;
  }

  try {
    const { scene } = useGLTF('/models/laptop.glb');
    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive object={scene} scale={2} />
      </Float>
    );
  } catch (err) {
    setError(true);
    return <Fallback />;
  }
}

function Fallback() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Base */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        {/* Screen */}
        <group position={[0, 0.7, -0.7]} rotation={[-0.5, 0, 0]}>
          <mesh>
            <boxGeometry args={[2, 1.2, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Screen Content */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[1.9, 1.1]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function LaptopModel() {
  return (
    <Suspense fallback={<Fallback />}>
      <Model />
    </Suspense>
  );
}

export default LaptopModel;
