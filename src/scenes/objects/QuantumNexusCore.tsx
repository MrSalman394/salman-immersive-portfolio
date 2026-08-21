import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Group, Mesh, Points, PointsMaterial, TorusGeometry, Vector3 } from 'three';
import { damp } from '../../utils/math';

interface QuantumNexusCoreProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function QuantumNexusCore({ reducedMotion, scrollProgress }: QuantumNexusCoreProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const wireCoreRef = useRef<Mesh>(null);
  const innerPlasmaRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh<TorusGeometry>>(null);
  const ring2Ref = useRef<Mesh<TorusGeometry>>(null);
  const ring3Ref = useRef<Mesh<TorusGeometry>>(null);
  const satellite1Ref = useRef<Mesh>(null);
  const satellite2Ref = useRef<Mesh>(null);
  const constellationRef = useRef<Points<BufferGeometry, PointsMaterial>>(null);

  const pointer = useThree((state) => state.pointer);

  // 72 High-density constellation sparks
  const constellationData = useMemo(() => {
    const count = 72;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.0 + Math.random() * 2.5;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const motionScale = reducedMotion ? 0.2 : 1;
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Dynamic tilt following pointer
      groupRef.current.rotation.y = damp(groupRef.current.rotation.y, pointer.x * 0.4 + time * 0.1, 3, delta);
      groupRef.current.rotation.x = damp(groupRef.current.rotation.x, -pointer.y * 0.3, 3, delta);
      const targetScale = 1.1 + scrollProgress * 0.35;
      groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, targetScale, 2.5, delta));
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.15 - scrollProgress * 1.2;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.35 * motionScale;
      coreRef.current.rotation.y += delta * 0.5 * motionScale;
    }

    if (wireCoreRef.current) {
      wireCoreRef.current.rotation.x -= delta * 0.4 * motionScale;
      wireCoreRef.current.rotation.z += delta * 0.3 * motionScale;
      const pulse = 1.35 + Math.sin(time * 3.0) * 0.08;
      wireCoreRef.current.scale.setScalar(pulse);
    }

    if (innerPlasmaRef.current) {
      innerPlasmaRef.current.rotation.y -= delta * 0.6 * motionScale;
      innerPlasmaRef.current.rotation.z += delta * 0.4 * motionScale;
      const pulse = 0.85 + Math.sin(time * 4.0) * 0.12;
      innerPlasmaRef.current.scale.setScalar(pulse);
    }

    // High-speed gyroscopic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6 * motionScale;
      ring1Ref.current.rotation.y += delta * 0.4 * motionScale;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.7 * motionScale;
      ring2Ref.current.rotation.z += delta * 0.45 * motionScale;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.55 * motionScale;
      ring3Ref.current.rotation.x -= delta * 0.35 * motionScale;
    }

    // Orbiting satellites
    if (satellite1Ref.current) {
      satellite1Ref.current.position.x = Math.cos(time * 1.8) * 2.5;
      satellite1Ref.current.position.z = Math.sin(time * 1.8) * 2.5;
      satellite1Ref.current.position.y = Math.sin(time * 3.0) * 0.6;
    }
    if (satellite2Ref.current) {
      satellite2Ref.current.position.x = Math.sin(-time * 1.5) * 3.0;
      satellite2Ref.current.position.y = Math.cos(-time * 1.5) * 3.0;
      satellite2Ref.current.position.z = Math.cos(time * 2.0) * 0.8;
    }

    if (constellationRef.current) {
      constellationRef.current.rotation.y += delta * 0.15 * motionScale;
      constellationRef.current.rotation.x = Math.sin(time * 0.6) * 0.15;
    }
  });

  return (
    <Float speed={reducedMotion ? 0.3 : 1.8} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={groupRef} position={[0.2, 0, -1.0]}>
        {/* Central Pulsing Golden Plasma Orb */}
        <mesh ref={innerPlasmaRef} scale={0.85}>
          <octahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.65} />
        </mesh>

        {/* Outer Pulsing Cyan Wireframe Shell */}
        <mesh ref={wireCoreRef} scale={1.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} blending={AdditiveBlending} />
        </mesh>

        {/* Transmission Refraction Crystal Core */}
        <mesh ref={coreRef} scale={1.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            anisotropicBlur={0.25}
            backside
            chromaticAberration={0.22}
            clearcoat={1}
            color="#38bdf8"
            distortion={0.35}
            distortionScale={0.4}
            ior={1.6}
            metalness={0.15}
            opacity={0.92}
            resolution={256}
            roughness={0.08}
            thickness={1.2}
            transmission={0.85}
          />
        </mesh>

        {/* Concentric Gyroscopic Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} blending={AdditiveBlending} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.7, 0.016, 16, 64]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.65} blending={AdditiveBlending} />
        </mesh>

        <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[3.2, 0.012, 16, 64]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.55} blending={AdditiveBlending} />
        </mesh>

        {/* Orbiting Golden & Cyan Satellites */}
        <mesh ref={satellite1Ref} scale={0.09}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        <mesh ref={satellite2Ref} scale={0.07}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Surrounding Constellation Sparkles */}
        <points ref={constellationRef} geometry={constellationData}>
          <pointsMaterial
            color="#38bdf8"
            size={0.05}
            transparent
            opacity={0.85}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </Float>
  );
}
