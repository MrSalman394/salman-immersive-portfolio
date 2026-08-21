import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  Points,
  PointsMaterial,
  TorusGeometry,
  Vector3,
  LineSegments,
} from 'three';
import { damp } from '../../utils/math';
import { useWorldState } from '../../context/WorldStateContext';

interface SalmanCoreProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function SalmanCore({ reducedMotion, scrollProgress }: SalmanCoreProps) {
  const { worldState, atmosphereConfig, activeNeuralNode, selectedProject } = useWorldState();

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

  // Neural Synapse Network structure (AI_CORE)
  const neuralGroupRef = useRef<Group>(null);

  // Project Universe Artifacts (PROJECTS)
  const projectGroupRef = useRef<Group>(null);

  // Blueprint Wireframe Cage (BUILD_MODE)
  const blueprintGroupRef = useRef<Group>(null);

  const pointer = useThree((state) => state.pointer);

  // Generate 80 High-density constellation photons
  const constellationData = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.0 + Math.random() * 2.8;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Generate Neural Network Synapses geometry
  const neuralNetworkData = useMemo(() => {
    const layerCounts = [4, 6, 4, 2]; // Input -> Hidden1 -> Hidden2 -> Output
    const nodePositions: Vector3[] = [];
    const linePositions: number[] = [];

    const layerSpacing = 1.6;
    layerCounts.forEach((count, lIdx) => {
      const x = (lIdx - (layerCounts.length - 1) / 2) * layerSpacing;
      for (let nIdx = 0; nIdx < count; nIdx++) {
        const y = (nIdx - (count - 1) / 2) * 0.9;
        const z = (Math.random() - 0.5) * 0.6;
        nodePositions.push(new Vector3(x, y, z));
      }
    });

    // Connect layers with synaptic lines
    let prevLayerStart = 0;
    for (let l = 0; l < layerCounts.length - 1; l++) {
      const currentCount = layerCounts[l];
      const nextCount = layerCounts[l + 1];
      const nextLayerStart = prevLayerStart + currentCount;

      for (let i = 0; i < currentCount; i++) {
        const p1 = nodePositions[prevLayerStart + i];
        for (let j = 0; j < nextCount; j++) {
          const p2 = nodePositions[nextLayerStart + j];
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      }
      prevLayerStart = nextLayerStart;
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(new Float32Array(linePositions), 3));
    return { nodePositions, lineGeometry: geo };
  }, []);

  // 5 Project Universe Artifact Positions
  const projectArtifacts = useMemo(() => {
    return [
      { id: 'nexushireconnect', label: 'AI Hire Graph', color: '#38bdf8', angle: 0, radius: 2.8 },
      { id: 'electrasuite-voting', label: 'Cryptographic Shield', color: '#4ade80', angle: (Math.PI * 2) / 5, radius: 3.1 },
      { id: 'e-commerce-web', label: 'Cloud Commerce', color: '#fbbf24', angle: (Math.PI * 4) / 5, radius: 2.9 },
      { id: 'university-management-system', label: 'OOP Enterprise', color: '#c084fc', angle: (Math.PI * 6) / 5, radius: 3.0 },
      { id: 'course-management-system', label: 'Cloud Portal', color: '#38bdf8', angle: (Math.PI * 8) / 5, radius: 2.7 },
    ];
  }, []);

  useFrame((state, delta) => {
    const motionScale = reducedMotion ? 0.2 : 1;
    const time = state.clock.elapsedTime;
    const morphMode = atmosphereConfig.coreMorphMode;

    if (groupRef.current) {
      // Dynamic tilt following pointer
      groupRef.current.rotation.y = damp(groupRef.current.rotation.y, pointer.x * 0.35 + time * 0.08, 3, delta);
      groupRef.current.rotation.x = damp(groupRef.current.rotation.x, -pointer.y * 0.25, 3, delta);

      const targetScale = atmosphereConfig.coreScale + scrollProgress * 0.2;
      groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, targetScale, 2.5, delta));
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.12 - scrollProgress * 0.8;
    }

    // Morph Core depending on worldState
    if (coreRef.current) {
      const isSingularity = morphMode === 'singularity';
      const isBlueprint = morphMode === 'build-blueprint';
      const rotSpeed = isSingularity ? 1.8 : isBlueprint ? 0.2 : 0.45;
      coreRef.current.rotation.x += delta * rotSpeed * motionScale;
      coreRef.current.rotation.y += delta * (rotSpeed * 1.3) * motionScale;

      const targetCoreScale = morphMode === 'neural' ? 0.4 : isSingularity ? 0.75 : isBlueprint ? 1.4 : 1.2;
      coreRef.current.scale.setScalar(damp(coreRef.current.scale.x, targetCoreScale, 3, delta));
    }

    if (wireCoreRef.current) {
      wireCoreRef.current.rotation.x -= delta * 0.4 * motionScale;
      wireCoreRef.current.rotation.z += delta * 0.3 * motionScale;
      const pulse = (morphMode === 'neural' ? 1.8 : morphMode === 'build-blueprint' ? 1.5 : 1.35) + Math.sin(time * 3.0) * 0.08;
      wireCoreRef.current.scale.setScalar(damp(wireCoreRef.current.scale.x, pulse, 3, delta));
    }

    if (innerPlasmaRef.current) {
      innerPlasmaRef.current.rotation.y -= delta * 0.6 * motionScale;
      innerPlasmaRef.current.rotation.z += delta * 0.4 * motionScale;
      const pulse = 0.85 + Math.sin(time * 4.0) * 0.12;
      innerPlasmaRef.current.scale.setScalar(pulse);
    }

    // Gyroscopic rings speed & visibility
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6 * motionScale;
      ring1Ref.current.rotation.y += delta * 0.4 * motionScale;
      const ringScale = morphMode === 'project-orbits' ? 1.35 : morphMode === 'build-blueprint' ? 1.25 : 1.0;
      ring1Ref.current.scale.setScalar(damp(ring1Ref.current.scale.x, ringScale, 2.5, delta));
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
      const orbRadius = morphMode === 'project-orbits' ? 3.4 : 2.5;
      satellite1Ref.current.position.x = Math.cos(time * 1.8) * orbRadius;
      satellite1Ref.current.position.z = Math.sin(time * 1.8) * orbRadius;
      satellite1Ref.current.position.y = Math.sin(time * 3.0) * 0.6;
    }
    if (satellite2Ref.current) {
      const orbRadius = morphMode === 'project-orbits' ? 3.8 : 3.0;
      satellite2Ref.current.position.x = Math.sin(-time * 1.5) * orbRadius;
      satellite2Ref.current.position.y = Math.cos(-time * 1.5) * orbRadius;
      satellite2Ref.current.position.z = Math.cos(time * 2.0) * 0.8;
    }

    // Neural Network Layer morphing (visible in AI_CORE)
    if (neuralGroupRef.current) {
      neuralGroupRef.current.scale.setScalar(damp(neuralGroupRef.current.scale.x, morphMode === 'neural' ? 1.0 : 0.01, 3, delta));
      neuralGroupRef.current.rotation.y = time * 0.15;
    }

    // Project Universe Artifacts (visible in PROJECTS / PROJECT_DETAIL)
    if (projectGroupRef.current) {
      const targetProjScale = morphMode === 'project-orbits' ? 1.0 : 0.01;
      projectGroupRef.current.scale.setScalar(damp(projectGroupRef.current.scale.x, targetProjScale, 3, delta));
      projectGroupRef.current.rotation.y = -time * 0.2;
    }

    // Blueprint Grid Wireframe (visible in BUILD_MODE)
    if (blueprintGroupRef.current) {
      const targetBlueprintScale = morphMode === 'build-blueprint' ? 1.0 : 0.01;
      blueprintGroupRef.current.scale.setScalar(damp(blueprintGroupRef.current.scale.x, targetBlueprintScale, 3, delta));
      blueprintGroupRef.current.rotation.y = time * 0.1;
      blueprintGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    if (constellationRef.current) {
      constellationRef.current.rotation.y += delta * 0.15 * motionScale;
      constellationRef.current.rotation.x = Math.sin(time * 0.6) * 0.15;
    }
  });

  return (
    <Float speed={reducedMotion ? 0.3 : 1.6} rotationIntensity={0.2} floatIntensity={0.3}>
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

        {/* Morph State 2: 3D Neural Synapse Lattice (AI_CORE) */}
        <group ref={neuralGroupRef} scale={0.01}>
          <lineSegments>
            <primitive object={neuralNetworkData.lineGeometry} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.55} blending={AdditiveBlending} />
          </lineSegments>
          {neuralNetworkData.nodePositions.map((pos, idx) => (
            <mesh key={idx} position={pos} scale={0.08}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshBasicMaterial
                color={activeNeuralNode ? '#fbbf24' : idx % 3 === 0 ? '#fbbf24' : '#38bdf8'}
              />
            </mesh>
          ))}
        </group>

        {/* Morph State 3: Project Universe Artifact Anchors (PROJECTS) */}
        <group ref={projectGroupRef} scale={0.01}>
          {projectArtifacts.map((art) => {
            const x = Math.cos(art.angle) * art.radius;
            const z = Math.sin(art.angle) * art.radius;
            const isSelected = selectedProject?.id === art.id;

            return (
              <group key={art.id} position={[x, (Math.random() - 0.5) * 0.4, z]}>
                <mesh scale={isSelected ? 0.35 : 0.22}>
                  <octahedronGeometry args={[1, 1]} />
                  <meshBasicMaterial color={art.color} wireframe />
                </mesh>
                <mesh scale={isSelected ? 0.18 : 0.1}>
                  <sphereGeometry args={[1, 16, 16]} />
                  <meshBasicMaterial color={art.color} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Morph State 4: Build Blueprint Wireframe Lattice (BUILD_MODE) */}
        <group ref={blueprintGroupRef} scale={0.01}>
          <mesh scale={2.6}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
          </mesh>
          <mesh scale={3.2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.4} />
          </mesh>
        </group>

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
