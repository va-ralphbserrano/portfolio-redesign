import { useRef, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { Suspense } from 'react';
import { useWebGLContext } from './hooks/useWebGLContext';

interface SkillSphereProps {
  skills: string[];
}

interface Skill {
  name: string;
  position: [number, number, number];
}

const generateSkillPositions = (skills: string[]): Skill[] => {
  return skills.map((skill, index) => {
    const phi = Math.acos(-1 + (2 * index) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    
    return {
      name: skill,
      position: [
        2.5 * Math.cos(theta) * Math.sin(phi),
        2.5 * Math.sin(theta) * Math.sin(phi),
        2.5 * Math.cos(phi)
      ]
    };
  });
};

const SkillText = memo(({ skill, position }: { skill: string; position: [number, number, number] }) => {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef();

  return (
    <motion.group
      position={position}
      animate={{ scale: hovered ? 1.2 : 1 }}
      transition={{ duration: 0.3 }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text
        ref={textRef}
        fontSize={0.2}
        color={hovered ? '#60A5FA' : '#94A3B8'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {skill}
      </Text>
    </motion.group>
  );
});

SkillText.displayName = 'SkillText';

const Scene: React.FC<{ skills: Skill[] }> = memo(({ skills }) => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      {skills.map((skill, index) => (
        <motion.group key={skill.name} position={skill.position}>
          <Text
            color="#2563eb"
            fontSize={0.2}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        </motion.group>
      ))}
    </Suspense>
  );
});

Scene.displayName = 'Scene';

const FallbackContent = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
    <div className="text-center">
      <p className="text-gray-600 dark:text-gray-400">
        3D visualization is not available.
        <br />
        Please try using a modern browser with WebGL support.
      </p>
    </div>
  </div>
);

export const SkillSphere = memo<SkillSphereProps>(({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isWebGLAvailable = useWebGLContext();

  if (!isWebGLAvailable) {
    return <FallbackContent />;
  }

  const skillsWithPositions = generateSkillPositions(skills);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        overflow: 'hidden',
        willChange: 'transform',
        contain: 'content'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        dpr={[1, 1]}
        gl={{ 
          alpha: true, 
          antialias: true,
          preserveDrawingBuffer: false,
          powerPreference: 'default',
          depth: true,
          stencil: false
        }}
        frameloop="demand"
        performance={{ min: 0.1 }}
      >
        <Scene skills={skillsWithPositions} />
      </Canvas>
    </div>
  );
});

SkillSphere.displayName = 'SkillSphere';
