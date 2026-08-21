import { Float, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';

import { damp } from '../../utils/math';

interface ResearchMatrixProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function ResearchMatrix({ reducedMotion, scrollProgress }: ResearchMatrixProps) {
  const groupRef = useRef<Group>(null);
  const coreMeshRef = useRef<Group>(null);

  const cubeFrame = useMemo(() => {
    const s = 1.6;
    const vertices = [
      new Vector3(-s, -s, -s),
      new Vector3(s, -s, -s),
      new Vector3(s, s, -s),
      new Vector3(-s, s, -s),
      new Vector3(-s, -s, -s),
      new Vector3(-s, -s, s),
      new Vector3(s, -s, s),
      new Vector3(s, s, s),
      new Vector3(-s, s, s),
      new Vector3(-s, -s, s),
    ];
    return vertices;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const motionScale = reducedMotion ? 0.15 : 1;

    groupRef.current.rotation.y += delta * 0.18 * motionScale;
    groupRef.current.rotation.x += delta * 0.1 * motionScale;

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y -= delta * 0.28 * motionScale;
      coreMeshRef.current.rotation.z += delta * 0.15 * motionScale;
    }
  });

  return (
    <Float speed={reducedMotion ? 0.2 : 1.3} rotationIntensity={0.25} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, -1.2]} scale={0.75}>
        <Line points={cubeFrame} color="#7dd3fc" transparent opacity={0.24} lineWidth={1} />
        <group ref={coreMeshRef}>
          <mesh>
            <octahedronGeometry args={[1.1, 0]} />
            <meshBasicMaterial color="#f0c674" wireframe transparent opacity={0.35} />
          </mesh>
          <mesh scale={0.65}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#dbeafe" wireframe transparent opacity={0.45} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
