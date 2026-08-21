import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';

import { damp } from '../../utils/math';

interface DataStreamHelicesProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

interface HelixNode {
  pos1: Vector3;
  pos2: Vector3;
  size: number;
}

export function DataStreamHelices({ reducedMotion, scrollProgress }: DataStreamHelicesProps) {
  const groupRef = useRef<Group>(null);
  const helixRef = useRef<Group>(null);

  const nodes = useMemo<HelixNode[]>(() => {
    const list: HelixNode[] = [];
    const total = 28;
    for (let i = 0; i < total; i++) {
      const t = (i / total) * Math.PI * 4;
      const radius = 2.8;
      const y = (i / total - 0.5) * 7.5;
      const x1 = Math.cos(t) * radius;
      const z1 = Math.sin(t) * radius;
      const x2 = Math.cos(t + Math.PI) * radius;
      const z2 = Math.sin(t + Math.PI) * radius;

      list.push({
        pos1: new Vector3(x1, y, z1),
        pos2: new Vector3(x2, y, z2),
        size: 0.035 + (i % 4) * 0.01,
      });
    }
    return list;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const motionScale = reducedMotion ? 0.15 : 1;

    if (helixRef.current) {
      helixRef.current.rotation.y += delta * 0.35 * motionScale;
      helixRef.current.rotation.x = Math.sin(_.clock.elapsedTime * 0.5) * 0.15;
    }

    const scale = 0.85 + scrollProgress * 0.3;
    groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, scale, 3, delta));
  });

  return (
    <Float speed={reducedMotion ? 0.2 : 1.6} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[-2.8, 0, -1.5]}>
        <group ref={helixRef}>
          {nodes.map((node, i) => (
            <group key={`helix-${i}`}>
              <mesh position={node.pos1} scale={node.size}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#38bdf8' : '#ec4899'} transparent opacity={0.85} />
              </mesh>

              <mesh position={node.pos2} scale={node.size}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#f59e0b' : '#10b981'} transparent opacity={0.85} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}
