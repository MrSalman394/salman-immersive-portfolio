import { Float, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

import { damp } from '../../utils/math';

interface CyberRingsProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function CyberRings({ reducedMotion, scrollProgress }: CyberRingsProps) {
  const outerRingRef = useRef<Group>(null);
  const middleRingRef = useRef<Group>(null);
  const innerRingRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const motionScale = reducedMotion ? 0.15 : 1;
    const time = state.clock.elapsedTime;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.15 * motionScale;
      outerRingRef.current.rotation.x = Math.sin(time * 0.4) * 0.25;
    }

    if (middleRingRef.current) {
      middleRingRef.current.rotation.z = -time * 0.22 * motionScale;
      middleRingRef.current.rotation.y = Math.cos(time * 0.5) * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.3 * motionScale;
      const targetScale = 1 + Math.sin(time * 2) * 0.08 + scrollProgress * 0.2;
      innerRingRef.current.scale.setScalar(damp(innerRingRef.current.scale.x, targetScale, 3, delta));
    }
  });

  return (
    <Float speed={reducedMotion ? 0.2 : 1.5} rotationIntensity={0.2} floatIntensity={0.25}>
      <group position={[0, 0.2, 0]}>
        <group ref={outerRingRef}>
          <Ring args={[3.8, 3.82, 128]} rotation={[Math.PI / 2.2, 0, 0]}>
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} />
          </Ring>
        </group>

        <group ref={middleRingRef}>
          <Ring args={[4.4, 4.425, 128]} rotation={[-Math.PI / 3, 0.4, 0]}>
            <meshBasicMaterial color="#ec4899" transparent opacity={0.18} />
          </Ring>
        </group>

        <group ref={innerRingRef}>
          <Ring args={[5.0, 5.03, 128]} rotation={[Math.PI / 1.8, -0.5, 0.3]}>
            <meshBasicMaterial color="#10b981" transparent opacity={0.15} />
          </Ring>
        </group>
      </group>
    </Float>
  );
}
