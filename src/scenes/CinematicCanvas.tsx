import React, { Component, Suspense } from 'react';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { HeroScene } from './HeroScene';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Rendering Notice:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface CinematicCanvasProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function CinematicCanvas({ reducedMotion, scrollProgress }: CinematicCanvasProps) {
  const staticFallback = (
    <div className="absolute inset-0 bg-[#040609] flex items-center justify-center pointer-events-none">
      <div className="h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
    </div>
  );

  return (
    <WebGLErrorBoundary fallback={staticFallback}>
      <Canvas
        camera={{ position: [0, 0.8, 8.5], fov: 42, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#050608']} />
        <fog attach="fog" args={['#050608', 10, 31]} />
        <Suspense fallback={null}>
          <HeroScene reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </WebGLErrorBoundary>
  );
}
