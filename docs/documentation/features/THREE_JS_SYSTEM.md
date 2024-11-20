# Three.js Integration

## Overview

The portfolio uses Three.js for advanced 3D graphics and interactive elements, implemented through React Three Fiber and Drei.

## Core Components

### Scene Setup
```typescript
interface SceneProps {
  children: React.ReactNode;
  camera?: {
    position: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  renderer?: {
    antialias?: boolean;
    alpha?: boolean;
    pixelRatio?: number;
  };
}

export const Scene: React.FC<SceneProps> = ({
  children,
  camera,
  ...props
}) => {
  // Scene implementation
};
```

### Lighting
```typescript
interface LightingProps {
  ambient?: {
    intensity?: number;
    color?: string;
  };
  directional?: {
    position: [number, number, number];
    intensity?: number;
    castShadow?: boolean;
  };
}

export const SceneLighting: React.FC<LightingProps> = (props) => {
  // Lighting implementation
};
```

### Controls
```typescript
interface ControlsProps {
  enableZoom?: boolean;
  enableRotate?: boolean;
  dampingFactor?: number;
  minDistance?: number;
  maxDistance?: number;
}

export const CameraControls: React.FC<ControlsProps> = (props) => {
  // Controls implementation
};
```

## Performance Optimization

See [Performance Optimization Guide](../technical/PERFORMANCE_OPTIMIZATION.md#threejs-performance) for detailed Three.js performance guidelines.

### Key Considerations
- Use instancing for repeated geometries
- Implement proper level of detail (LOD)
- Optimize material and texture usage
- Monitor WebGL memory usage

## Integration with React

### Hooks
```typescript
function useThreeJsEffect(
  effect: (scene: Scene) => void,
  deps: any[]
) {
  // Custom hook for Three.js effects
}

function useAnimationFrame(
  callback: (deltaTime: number) => void,
  deps: any[]
) {
  // Animation frame hook
}
```

### Context
```typescript
interface ThreeJsContextValue {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
}

const ThreeJsContext = React.createContext<ThreeJsContextValue>(null);
```

## Asset Management

### Model Loading
```typescript
async function loadGLTFModel(url: string): Promise<GLTF> {
  // Load and optimize GLTF model
  return model;
}
```

### Texture Loading
```typescript
async function loadTexture(url: string): Promise<Texture> {
  // Load and optimize texture
  return texture;
}
```

## Best Practices

### Scene Management
- Use object pooling for frequently created/destroyed objects
- Implement proper cleanup in useEffect hooks
- Use frustum culling for off-screen objects
- Implement level of detail (LOD) for complex models

### Memory Management
- Dispose of geometries and materials when no longer needed
- Use texture compression where appropriate
- Implement proper cleanup for event listeners
- Monitor memory usage with stats.js

### Performance Tips
- Use BufferGeometry instead of Geometry
- Minimize draw calls through object instancing
- Use appropriate pixel ratio for device
- Implement proper raycasting optimization
