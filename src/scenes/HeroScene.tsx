import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  PerspectiveCamera,
  PointLight,
  Points,
  ShaderMaterial,
  Vector3,
} from 'three';

import { particleFragmentShader, particleVertexShader } from '../shaders/particleShaders';
import { damp, mapRange } from '../utils/math';
import { SalmanCore } from './objects/SalmanCore';
import { HolographicPortrait } from './objects/HolographicPortrait';
import { useWorldState } from '../context/WorldStateContext';

interface HeroSceneProps {
  reducedMotion: boolean;
  scrollProgress: number;
}

export function HeroScene({ reducedMotion, scrollProgress }: HeroSceneProps) {
  const { worldState, cameraConfig, atmosphereConfig, warpPulse } = useWorldState();

  const rigRef = useRef<Group>(null);
  const worldRef = useRef<Group>(null);
  const particlesRef = useRef<Points<BufferGeometry, ShaderMaterial>>(null);
  const pointLight1Ref = useRef<PointLight>(null);
  const pointLight2Ref = useRef<PointLight>(null);

  const pointer = useThree((state) => state.pointer);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const isCompact = size.width < 720;

  const currentLookAt = useRef(new Vector3(0, 0, 0));

  // 2,400 Dynamic Stardust Nebula Photons
  const particleGeometry = useMemo(() => {
    const count = 2400;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const radius = 1.5 + Math.random() * 16.0;
      const angle = Math.random() * Math.PI * 2;
      const depth = -35 + Math.random() * 55;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.75 + (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 2] = depth;
      scales[i] = 4.5 + Math.random() * 9.0;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new BufferAttribute(scales, 1));
    geometry.setAttribute('aPhase', new BufferAttribute(phases, 1));

    return geometry;
  }, []);

  const particleMaterial = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uPointer: { value: { x: 0, y: 0 } },
        },
      }),
    [],
  );

  useFrame((state, delta) => {
    const motionScale = reducedMotion ? 0.16 : 1;
    const time = state.clock.elapsedTime;

    // Dynamic Particle behavior based on World State
    if (particlesRef.current) {
      particlesRef.current.material.uniforms.uTime.value = time * motionScale * atmosphereConfig.particleSpeed;
      particlesRef.current.material.uniforms.uScroll.value = scrollProgress + warpPulse * 0.8;
      particlesRef.current.material.uniforms.uPointer.value.x = pointer.x;
      particlesRef.current.material.uniforms.uPointer.value.y = pointer.y;
      particlesRef.current.rotation.z = time * 0.015 * motionScale * atmosphereConfig.particleSpeed;
    }

    // Dynamic World Lighting based on World State
    if (pointLight1Ref.current) {
      pointLight1Ref.current.color.lerp(new Color(atmosphereConfig.primaryLightColor), delta * 3);
      pointLight1Ref.current.intensity = damp(
        pointLight1Ref.current.intensity,
        atmosphereConfig.primaryLightIntensity,
        3,
        delta,
      );
      pointLight1Ref.current.position.x = damp(pointLight1Ref.current.position.x, pointer.x * 4 - 1.5, 2.5, delta);
      pointLight1Ref.current.position.y = damp(pointLight1Ref.current.position.y, pointer.y * 3 + 1, 2.5, delta);
    }

    if (pointLight2Ref.current) {
      pointLight2Ref.current.color.lerp(new Color(atmosphereConfig.secondaryLightColor), delta * 3);
      pointLight2Ref.current.intensity = damp(
        pointLight2Ref.current.intensity,
        atmosphereConfig.secondaryLightIntensity,
        3,
        delta,
      );
      pointLight2Ref.current.position.x = damp(pointLight2Ref.current.position.x, -pointer.x * 4 + 2, 2.5, delta);
      pointLight2Ref.current.position.y = damp(pointLight2Ref.current.position.y, -pointer.y * 2.5 - 1, 2.5, delta);
    }

    // 3D Rig Rotation & Positioning
    if (rigRef.current) {
      rigRef.current.rotation.y = damp(rigRef.current.rotation.y, pointer.x * 0.12, 3.5, delta);
      rigRef.current.rotation.x = damp(rigRef.current.rotation.x, -pointer.y * 0.08, 3.5, delta);
    }

    // World Group spatial evolution
    if (worldRef.current) {
      const baseScale = isCompact ? 0.75 : 1.0;
      worldRef.current.scale.setScalar(damp(worldRef.current.scale.x, baseScale * atmosphereConfig.coreScale, 3, delta));
    }

    // Cinematic Camera Choreography
    const targetCamX = (isCompact ? 0 : cameraConfig.position[0]) + pointer.x * 0.35;
    const targetCamY = cameraConfig.position[1] + pointer.y * 0.25;
    const targetCamZ = cameraConfig.position[2];

    camera.position.x = damp(camera.position.x, targetCamX, cameraConfig.speed, delta);
    camera.position.y = damp(camera.position.y, targetCamY, cameraConfig.speed, delta);
    camera.position.z = damp(camera.position.z, targetCamZ, cameraConfig.speed, delta);

    // Smooth FOV interpolation
    if (camera.fov) {
      camera.fov = damp(camera.fov, cameraConfig.fov, 2.5, delta);
      camera.updateProjectionMatrix();
    }

    // Smooth LookAt target interpolation
    const targetLookX = cameraConfig.target[0];
    const targetLookY = cameraConfig.target[1];
    const targetLookZ = cameraConfig.target[2];

    currentLookAt.current.x = damp(currentLookAt.current.x, targetLookX, cameraConfig.speed, delta);
    currentLookAt.current.y = damp(currentLookAt.current.y, targetLookY, cameraConfig.speed, delta);
    currentLookAt.current.z = damp(currentLookAt.current.z, targetLookZ, cameraConfig.speed, delta);

    camera.lookAt(currentLookAt.current);
  });

  return (
    <>
      <ambientLight intensity={atmosphereConfig.ambientIntensity} />
      <directionalLight color={new Color('#dbeafe')} intensity={2.0} position={[3, 4, 6]} />
      <pointLight ref={pointLight1Ref} color={new Color('#38bdf8')} intensity={24} distance={16} position={[-2, 1.5, 2]} />
      <pointLight ref={pointLight2Ref} color={new Color('#fbbf24')} intensity={16} distance={14} position={[2.5, -1, 1.5]} />

      <group ref={rigRef}>
        <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} frustumCulled={false} />
        <group ref={worldRef}>
          <SalmanCore reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
        </group>
        <HolographicPortrait reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
      </group>

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={atmosphereConfig.bloomIntensity}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.85}
          height={300}
        />
        <Vignette eskil={false} offset={0.22} darkness={atmosphereConfig.vignetteDarkness} />
      </EffectComposer>
    </>
  );
}
