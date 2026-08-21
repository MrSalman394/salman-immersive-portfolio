import { Line, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
} from 'three';

import { damp } from '../../utils/math';

const PHOTO_ASPECT = 1792 / 2390;

interface HolographicPortraitProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function HolographicPortrait({ reducedMotion, scrollProgress }: HolographicPortraitProps) {
  const groupRef = useRef<Group>(null);
  const imageRef = useRef<Mesh<BufferGeometry, MeshBasicMaterial>>(null);
  const sweepRef = useRef<Mesh<BufferGeometry, MeshBasicMaterial>>(null);
  const particlesRef = useRef<Points<BufferGeometry, PointsMaterial>>(null);
  const ring1Ref = useRef<Mesh<TorusGeometry, MeshBasicMaterial>>(null);
  const ring2Ref = useRef<Mesh<TorusGeometry, MeshBasicMaterial>>(null);

  const texture = useTexture('/images/salman.jpg');
  const pointer = useThree((state) => state.pointer);
  const size = useThree((state) => state.size);
  const isCompact = size.width < 720;

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  const framePoints = useMemo(
    () => [
      new Vector3(-PHOTO_ASPECT * 1.02, -1.04, 0),
      new Vector3(PHOTO_ASPECT * 1.02, -1.04, 0),
      new Vector3(PHOTO_ASPECT * 1.02, 1.04, 0),
      new Vector3(-PHOTO_ASPECT * 1.02, 1.04, 0),
      new Vector3(-PHOTO_ASPECT * 1.02, -1.04, 0),
    ],
    [],
  );

  const outerFramePoints = useMemo(
    () => [
      new Vector3(-PHOTO_ASPECT * 1.1, -1.12, 0),
      new Vector3(PHOTO_ASPECT * 1.1, -1.12, 0),
      new Vector3(PHOTO_ASPECT * 1.1, 1.12, 0),
      new Vector3(-PHOTO_ASPECT * 1.1, 1.12, 0),
      new Vector3(-PHOTO_ASPECT * 1.1, -1.12, 0),
    ],
    [],
  );

  // 320+ Swirling Vortex particles orbiting the portrait
  const portraitParticles = useMemo(() => {
    const count = 320;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.75 + Math.random() * 0.95;
      positions[i * 3] = Math.cos(angle) * radius * PHOTO_ASPECT * 1.6;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 1.35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.65;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    const motionScale = reducedMotion ? 0.16 : 1;
    const reveal = reducedMotion ? 1 : Math.min(state.clock.elapsedTime / 2.5, 1);
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      const targetScale = (isCompact ? 0.58 : 0.82) * (0.94 + reveal * 0.06);
      groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, targetScale, 3.8, delta));

      // Dynamic floating levitation
      const floatY = Math.sin(time * 1.8) * 0.06;
      const targetX = isCompact ? 0.95 : 3.25;
      const targetY = (isCompact ? -0.15 : 0.45) + floatY;
      const targetZ = isCompact ? -0.7 : -0.35;

      groupRef.current.position.x = damp(groupRef.current.position.x, targetX, 3.2, delta);
      groupRef.current.position.y = damp(groupRef.current.position.y, targetY, 3.2, delta);
      groupRef.current.position.z = damp(groupRef.current.position.z, targetZ, 3.2, delta);

      // Responsive 3D mouse tilt
      groupRef.current.rotation.y = damp(groupRef.current.rotation.y, -0.1 + pointer.x * 0.22, 3.5, delta);
      groupRef.current.rotation.x = damp(groupRef.current.rotation.x, pointer.y * 0.14, 3.5, delta);
    }

    if (imageRef.current) {
      imageRef.current.material.opacity = damp(imageRef.current.material.opacity, 0.95 + scrollProgress * 0.05, 2.6, delta);
    }

    // Laser Scanner sweep
    if (sweepRef.current) {
      const sweepProgress = (time * 0.35 * motionScale) % 1;
      sweepRef.current.position.y = 1.1 - sweepProgress * 2.2;
      sweepRef.current.material.opacity = 0.25 + Math.sin(time * 2.5) * 0.1;
    }

    // Swirling vortex particles
    if (particlesRef.current) {
      particlesRef.current.rotation.z += delta * 0.22 * motionScale;
      particlesRef.current.rotation.y = Math.sin(time * 0.8) * 0.15;
      particlesRef.current.material.opacity = damp(particlesRef.current.material.opacity, isCompact ? 0.55 : 0.75, 3, delta);
    }

    // Gyroscopic counter-rotating cyber rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.6 * motionScale;
      ring1Ref.current.rotation.x = Math.PI / 4 + Math.sin(time) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.45 * motionScale;
      ring2Ref.current.rotation.y = Math.PI / 3 + Math.cos(time) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[3.25, 0.45, -0.35]} scale={0.05}>
      {/* Dark Backdrop Plate */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[PHOTO_ASPECT * 2.2, 2.4]} />
        <meshBasicMaterial color="#04080d" transparent opacity={0.85} />
      </mesh>

      {/* Portrait Image Mesh */}
      <mesh ref={imageRef}>
        <planeGeometry args={[PHOTO_ASPECT * 2, 2]} />
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0} />
      </mesh>

      {/* Horizontal Laser Scanning Beam */}
      <mesh ref={sweepRef} position={[0, 0, 0.02]}>
        <planeGeometry args={[PHOTO_ASPECT * 2.1, 0.06]} />
        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.3}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Glowing Frame */}
      <Line
        points={framePoints}
        color="#7dd3fc"
        transparent
        opacity={0.85}
        lineWidth={1.5}
        position={[0, 0, 0.03]}
      />

      {/* Outer Amber Frame */}
      <Line
        points={outerFramePoints}
        color="#f0c674"
        transparent
        opacity={0.45}
        lineWidth={1.2}
        position={[0, 0, 0.02]}
      />

      {/* Gyroscopic Cyber Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0.05]}>
        <torusGeometry args={[1.55, 0.012, 16, 64]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.5} blending={AdditiveBlending} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0.04]}>
        <torusGeometry args={[1.68, 0.01, 16, 64]} />
        <meshBasicMaterial color="#f0c674" transparent opacity={0.35} blending={AdditiveBlending} />
      </mesh>

      {/* Swirling Vortex Particle Field */}
      <points ref={particlesRef} geometry={portraitParticles} position={[0, 0, 0.08]}>
        <pointsMaterial
          color="#7dd3fc"
          size={0.022}
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
