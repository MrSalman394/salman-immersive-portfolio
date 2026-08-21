import { Float, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group, Mesh, Vector3 } from 'three';

import { damp } from '../../utils/math';

interface ProjectOrbitsProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

interface OrbitNode {
  position: Vector3;
  color: string;
  size: number;
}

export function ProjectOrbits({ reducedMotion, scrollProgress }: ProjectOrbitsProps) {
  const groupRef = useRef<Group>(null);
  const ring1Ref = useRef<Group>(null);
  const ring2Ref = useRef<Group>(null);

  const nodes = useMemo<OrbitNode[]>(() => {
    const colors = ['#7dd3fc', '#f0c674', '#dbeafe', '#38bdf8', '#fbbf24'];
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3.2 + (i % 3) * 0.75;
      return {
        position: new Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.45,
          Math.sin(angle) * radius * 0.5 - 1.0,
        ),
        color: colors[i % colors.length],
        size: 0.04 + (i % 3) * 0.02,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const motionScale = reducedMotion ? 0.15 : 1;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.12 * motionScale;
      ring1Ref.current.rotation.y += delta * 0.08 * motionScale;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.09 * motionScale;
      ring2Ref.current.rotation.x += delta * 0.14 * motionScale;
    }

    const visibleOpacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.28) * 4);
    groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, 0.8 + scrollProgress * 0.35, 3, delta));
  });

  return (
    <Float speed={reducedMotion ? 0.2 : 1.4} rotationIntensity={0.2} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.2, -0.5]}>
        <group ref={ring1Ref}>
          <Ring args={[3.15, 3.17, 96]} rotation={[Math.PI / 3, 0.2, 0]}>
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.28} />
          </Ring>
          {nodes.slice(0, 6).map((node, i) => (
            <mesh key={`orbit-node-1-${i}`} position={node.position}>
              <octahedronGeometry args={[node.size, 0]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.8} />
            </mesh>
          ))}
        </group>

        <group ref={ring2Ref}>
          <Ring args={[4.2, 4.22, 96]} rotation={[-Math.PI / 4, -0.3, 0.4]}>
            <meshBasicMaterial color="#f0c674" transparent opacity={0.22} />
          </Ring>
          {nodes.slice(6).map((node, i) => (
            <mesh key={`orbit-node-2-${i}`} position={node.position}>
              <icosahedronGeometry args={[node.size * 1.2, 0]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.85} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}
