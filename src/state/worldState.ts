import type { ProjectSummary } from '../data/profile';

export type WorldState =
  | 'IDLE'
  | 'HERO'
  | 'AI_CORE'
  | 'PROJECTS'
  | 'PROJECT_DETAIL'
  | 'RESEARCH'
  | 'JOURNEY'
  | 'BUILD_MODE'
  | 'TERMINAL'
  | 'CONTACT';

export interface CameraStateConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  speed: number;
}

export interface AtmosphereConfig {
  ambientIntensity: number;
  primaryLightColor: string;
  primaryLightIntensity: number;
  secondaryLightColor: string;
  secondaryLightIntensity: number;
  bloomIntensity: number;
  vignetteDarkness: number;
  particleSpeed: number;
  particleDensity: number;
  coreScale: number;
  coreMorphMode: 'nexus' | 'neural' | 'project-orbits' | 'analytical' | 'build-blueprint' | 'singularity';
}

export const WORLD_CAMERA_CONFIGS: Record<WorldState, CameraStateConfig> = {
  IDLE: {
    position: [0, 0.6, 8.2],
    target: [0, 0.1, 0],
    fov: 45,
    speed: 2.5,
  },
  HERO: {
    position: [0, 0.6, 8.2],
    target: [0, 0.1, 0],
    fov: 45,
    speed: 2.5,
  },
  PROJECTS: {
    position: [1.6, -0.3, 6.6],
    target: [0.3, -0.15, 0],
    fov: 48,
    speed: 2.2,
  },
  PROJECT_DETAIL: {
    position: [0, 0, 3.8],
    target: [0, 0, 0],
    fov: 54,
    speed: 3.0,
  },
  AI_CORE: {
    position: [-1.4, 0.2, 5.8],
    target: [-0.3, 0.1, 0],
    fov: 50,
    speed: 2.4,
  },
  RESEARCH: {
    position: [0.2, -0.2, 6.2],
    target: [0, 0, 0],
    fov: 44,
    speed: 2.2,
  },
  JOURNEY: {
    position: [-0.8, -0.5, 6.8],
    target: [0, -0.25, 0],
    fov: 46,
    speed: 2.0,
  },
  BUILD_MODE: {
    position: [0, 0, 6.0],
    target: [0, 0, 0],
    fov: 45,
    speed: 2.8,
  },
  TERMINAL: {
    position: [0.8, 0, 5.4],
    target: [0.2, 0, 0],
    fov: 44,
    speed: 2.6,
  },
  CONTACT: {
    position: [0, -0.1, 5.2],
    target: [0, 0, 0],
    fov: 42,
    speed: 2.4,
  },
};

export const WORLD_ATMOSPHERE_CONFIGS: Record<WorldState, AtmosphereConfig> = {
  IDLE: {
    ambientIntensity: 0.6,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 22,
    secondaryLightColor: '#fbbf24',
    secondaryLightIntensity: 15,
    bloomIntensity: 0.65,
    vignetteDarkness: 0.8,
    particleSpeed: 1.0,
    particleDensity: 1.0,
    coreScale: 1.0,
    coreMorphMode: 'nexus',
  },
  HERO: {
    ambientIntensity: 0.6,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 24,
    secondaryLightColor: '#fbbf24',
    secondaryLightIntensity: 16,
    bloomIntensity: 0.65,
    vignetteDarkness: 0.8,
    particleSpeed: 1.0,
    particleDensity: 1.0,
    coreScale: 1.0,
    coreMorphMode: 'nexus',
  },
  PROJECTS: {
    ambientIntensity: 0.7,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 28,
    secondaryLightColor: '#fbbf24',
    secondaryLightIntensity: 20,
    bloomIntensity: 0.75,
    vignetteDarkness: 0.75,
    particleSpeed: 1.4,
    particleDensity: 1.2,
    coreScale: 1.25,
    coreMorphMode: 'project-orbits',
  },
  PROJECT_DETAIL: {
    ambientIntensity: 0.85,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 34,
    secondaryLightColor: '#fbbf24',
    secondaryLightIntensity: 25,
    bloomIntensity: 0.95,
    vignetteDarkness: 0.7,
    particleSpeed: 2.0,
    particleDensity: 1.5,
    coreScale: 1.6,
    coreMorphMode: 'project-orbits',
  },
  AI_CORE: {
    ambientIntensity: 0.75,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 30,
    secondaryLightColor: '#c084fc',
    secondaryLightIntensity: 22,
    bloomIntensity: 0.8,
    vignetteDarkness: 0.78,
    particleSpeed: 1.6,
    particleDensity: 1.3,
    coreScale: 1.2,
    coreMorphMode: 'neural',
  },
  RESEARCH: {
    ambientIntensity: 0.65,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 22,
    secondaryLightColor: '#fbbf24',
    secondaryLightIntensity: 18,
    bloomIntensity: 0.6,
    vignetteDarkness: 0.82,
    particleSpeed: 0.8,
    particleDensity: 0.9,
    coreScale: 1.1,
    coreMorphMode: 'analytical',
  },
  JOURNEY: {
    ambientIntensity: 0.6,
    primaryLightColor: '#38bdf8',
    primaryLightIntensity: 20,
    secondaryLightColor: '#fbbf24',
    secondaryLightIntensity: 16,
    bloomIntensity: 0.6,
    vignetteDarkness: 0.82,
    particleSpeed: 1.1,
    particleDensity: 1.0,
    coreScale: 1.05,
    coreMorphMode: 'nexus',
  },
  BUILD_MODE: {
    ambientIntensity: 0.9,
    primaryLightColor: '#22d3ee',
    primaryLightIntensity: 32,
    secondaryLightColor: '#4ade80',
    secondaryLightIntensity: 24,
    bloomIntensity: 0.85,
    vignetteDarkness: 0.65,
    particleSpeed: 0.7,
    particleDensity: 1.4,
    coreScale: 1.3,
    coreMorphMode: 'build-blueprint',
  },
  TERMINAL: {
    ambientIntensity: 0.8,
    primaryLightColor: '#4ade80',
    primaryLightIntensity: 28,
    secondaryLightColor: '#38bdf8',
    secondaryLightIntensity: 20,
    bloomIntensity: 0.85,
    vignetteDarkness: 0.8,
    particleSpeed: 1.8,
    particleDensity: 1.2,
    coreScale: 1.15,
    coreMorphMode: 'singularity',
  },
  CONTACT: {
    ambientIntensity: 0.7,
    primaryLightColor: '#fbbf24',
    primaryLightIntensity: 26,
    secondaryLightColor: '#38bdf8',
    secondaryLightIntensity: 22,
    bloomIntensity: 0.7,
    vignetteDarkness: 0.8,
    particleSpeed: 1.5,
    particleDensity: 1.1,
    coreScale: 1.1,
    coreMorphMode: 'singularity',
  },
};
