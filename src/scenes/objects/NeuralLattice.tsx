import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';

interface NeuralLatticeProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

interface LatticeNode {
  position: [number, number, number];
  scale: number;
}

export function NeuralLattice({ reducedMotion, scrollProgress }: NeuralLatticeProps) {
  const groupRef = useRef<Group>(null);
  const nodes = useMemo<LatticeNode[]>(() => {
    return Array.from({ length: 24 }, (_, index) => {
      const ring = index % 3;
      const angle = (index / 24) * Math.PI * 2 * 3.2;
      const radius = 2.4 + ring * 0.68;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(index * 1.73) * 0.75,
          Math.sin(angle) * radius * 0.34 - 1.2 + ring * 0.5,
        ],
        scale: 0.025 + (index % 5) * 0.006,
      };
    });
  }, []);

  const connections = useMemo(() => {
    const lines: Vector3[][] = [];

    for (let i = 0; i < nodes.length; i += 1) {
      const current = new Vector3(...nodes[i].position);
      const next = new Vector3(...nodes[(i + 3) % nodes.length].position);
      const skip = new Vector3(...nodes[(i + 8) % nodes.length].position);
      lines.push([current, next]);
      if (i % 4 === 0) {
        lines.push([current, skip]);
      }
    }

    return lines;
  }, [nodes]);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const motionScale = reducedMotion ? 0.12 : 1;
    groupRef.current.rotation.y += delta * 0.035 * motionScale;
    groupRef.current.rotation.z += delta * 0.01 * motionScale;
    groupRef.current.position.z = -1.8 + scrollProgress * 2.4;
    groupRef.current.scale.setScalar(0.82 + scrollProgress * 0.26);
  });

  return (
    <group ref={groupRef} position={[0, -0.04, -1.8]}>
      {connections.map((points, index) => (
        <Line
          key={`connection-${index}`}
          points={points}
          color={index % 5 === 0 ? '#f0c674' : '#7dd3fc'}
          transparent
          opacity={index % 5 === 0 ? 0.18 : 0.11}
          lineWidth={1}
        />
      ))}

      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node.position} scale={node.scale}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={index % 5 === 0 ? '#f0c674' : '#dbeafe'} transparent opacity={0.86} />
        </mesh>
      ))}
    </group>
  );
}
