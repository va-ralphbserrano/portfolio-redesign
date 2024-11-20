# Animation System Guide

## Table of Contents
- [Overview](#overview)
- [Three.js Animations](#threejs-animations)
- [CSS Animations](#css-animations)
- [React Spring Animations](#react-spring-animations)
- [Performance Considerations](#performance-considerations)

## Overview
The animation system combines Three.js animations, CSS animations, and React Spring for a comprehensive and performant animation solution.

## Three.js Animations

### Animation System Setup
```typescript
interface AnimationConfig {
  duration: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  loop?: boolean;
  delay?: number;
}

function useAnimation(config: AnimationConfig) {
  // Animation implementation
}
```

### Model Animations
```typescript
interface ModelAnimationProps {
  model: THREE.Group;
  animationName: string;
  config: AnimationConfig;
}

function useModelAnimation({
  model,
  animationName,
  config
}: ModelAnimationProps) {
  // Model animation implementation
}
```

### Camera Animations
```typescript
interface CameraAnimationProps {
  camera: THREE.Camera;
  target: THREE.Vector3;
  duration: number;
}

function useCameraAnimation(props: CameraAnimationProps) {
  // Camera animation implementation
}
```

## CSS Animations

### Keyframe Animations
```typescript
interface KeyframeConfig {
  name: string;
  frames: Record<string, CSSProperties>;
}

function createKeyframeAnimation(config: KeyframeConfig): string {
  // Create keyframe animation
  return cssString;
}
```

### Transition Components
```typescript
interface TransitionProps {
  in: boolean;
  timeout: number;
  children: React.ReactNode;
}

export const FadeTransition: React.FC<TransitionProps> = (props) => {
  // Fade transition implementation
};

export const SlideTransition: React.FC<TransitionProps> = (props) => {
  // Slide transition implementation
};
```

## React Spring Animations

### Spring Configuration
```typescript
interface SpringConfig {
  mass: number;
  tension: number;
  friction: number;
}

const presets = {
  gentle: { mass: 1, tension: 120, friction: 14 },
  wobbly: { mass: 1, tension: 180, friction: 12 },
  stiff: { mass: 1, tension: 210, friction: 20 }
};
```

### Animation Hooks
```typescript
function useSpringAnimation(config: SpringConfig) {
  // Spring animation implementation
}

function useChainAnimation(animations: SpringConfig[]) {
  // Chained animation implementation
}
```

## Performance Considerations

### Animation Optimization
```typescript
interface OptimizationConfig {
  useRAF: boolean;
  batchUpdates: boolean;
  throttle?: number;
}

function optimizeAnimation(config: OptimizationConfig) {
  // Animation optimization implementation
}
```

### GPU Acceleration
```typescript
const acceleratedProperties = {
  transform: true,
  opacity: true,
  filter: false
};

function useGPUAcceleration(element: HTMLElement) {
  // GPU acceleration implementation
}
```

## Best Practices

### Animation Guidelines
- Use appropriate animation type for the use case
- Keep animations under 300ms for UI feedback
- Implement proper cleanup for animations
- Use GPU-accelerated properties when possible

### Performance Tips
- Batch animation updates
- Use requestAnimationFrame
- Avoid layout thrashing
- Monitor frame rate
- Implement animation fallbacks

### Accessibility
- Respect reduced motion preferences
- Provide animation alternatives
- Avoid flashy animations
- Keep animations subtle and purposeful
