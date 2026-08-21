import { Float, MeshTransmissionMaterial, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group, Mesh, Vector3 } from 'three';

import { damp } from '../../utils/math';

interface DigitalCoreProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

interface Satellite {
  position: Vector3;
  color: string;
  size: number;
  speed: number;
}

export function DigitalCore({ reducedMotion, scrollProgress }: DigitalCoreProps) {
  const coreRef = useRef<Mesh>(null);
  const plasmaRef = useRef<Mesh>(null);
  const shellRef = useRef<Group>(null);
  const satellitesGroupRef = useRef<Group>(null);

  const satellites = useMemo<Satellite[]>(() => {
    const list: Satellite[] = [];
    const colors = ['#38bdf8', '#f59e0b', '#ec4899', '#10b981', '#a855f7'];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.85 + (i % 2) * 0.4;
      list.push({
        position: new Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.5) * 0.35, Math.sin(angle) * radius),
        color: colors[i % colors.length],
        size: 0.05 + (i % 3) * 0.02,
        speed: 0.2 + (i % 3) * 0.1,
      });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    const motionScale = reducedMotion ? 0.2 : 1;
    const time = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.28 * motionScale;
      coreRef.current.rotation.y += delta * 0.42 * motionScale;
      const scale = 1 + scrollProgress * 0.22 + Math.sin(time * 2.5) * 0.04;
      coreRef.current.scale.setScalar(damp(coreRef.current.scale.x, scale, 3, delta));
    }

    if (plasmaRef.current) {
      plasmaRef.current.rotation.y -= delta * 0.6 * motionScale;
      plasmaRef.current.rotation.z += delta * 0.3 * motionScale;
    }

    if (shellRef.current) {
      shellRef.current.rotation.z -= delta * 0.22 * motionScale;
      shellRef.current.rotation.y += delta * 0.16 * motionScale;
    }

    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y += delta * 0.5 * motionScale;
      satellitesGroupRef.current.rotation.x = Math.sin(time * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={reducedMotion ? 0.25 : 1.5} rotationIntensity={0.15} floatIntensity={0.22}>
      <group position={[0, 0.18, 0]}>
        {/* Inner Glowing Plasma Energy Sphere */}
        <mesh ref={plasmaRef} scale={0.65}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.6} />
        </mesh>

        {/* Transmission Crystal Core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.08, 5]} />
          <MeshTransmissionMaterial
            anisotropicBlur={0.12}
            backside
            chromaticAberration={0.08}
            clearcoat={0.95}
            color="#dbeafe"
            distortion={0.3}
            distortionScale={0.35}
            ior={1.45}
            metalness={0.05}
            opacity={0.92}
            resolution={256}
            roughness={0.14}
            thickness={0.8}
            transmission={0.65}
          />
        </mesh>

        {/* Orbiting Satellites */}
        <group ref={satellitesGroupRef}>
          {satellites.map((sat, i) => (
            <mesh key={`sat-${i}`} position={sat.position} scale={sat.size}>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color={sat.color} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>

        {/* Holographic Concentric Rings */}
        <group ref={shellRef}>
          <Ring args={[1.62, 1.645, 128]} rotation={[Math.PI / 2.7, 0.18, 0]}>
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.42} />
          </Ring>
          <Ring args={[2.1, 2.12, 128]} rotation={[Math.PI / 1.9, -0.55, 0.2]}>
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.32} />
          </Ring>
          <Ring args={[2.55, 2.57, 128]} rotation={[Math.PI / 2.2, 0.86, -0.25]}>
            <meshBasicMaterial color="#ec4899" transparent opacity={0.25} />
          </Ring>
        </group>
      </group>
    </Float>
  );
}
