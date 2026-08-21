import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { ProjectSummary } from '../data/profile';
import {
  type WorldState,
  WORLD_CAMERA_CONFIGS,
  WORLD_ATMOSPHERE_CONFIGS,
  type CameraStateConfig,
  type AtmosphereConfig,
} from '../state/worldState';
import { soundFx } from '../utils/soundEffects';

interface WorldStateContextType {
  worldState: WorldState;
  setWorldState: (state: WorldState) => void;
  selectedProject: ProjectSummary | null;
  openProjectDetail: (project: ProjectSummary) => void;
  closeProjectDetail: () => void;
  isBuildMode: boolean;
  toggleBuildMode: () => void;
  activeNeuralNode: string | null;
  setActiveNeuralNode: (node: string | null) => void;
  warpPulse: number;
  triggerWarpPulse: () => void;
  cameraConfig: CameraStateConfig;
  atmosphereConfig: AtmosphereConfig;
}

const WorldStateContext = createContext<WorldStateContextType | null>(null);

interface WorldStateProviderProps {
  children: React.ReactNode;
  activeSectionId: string;
}

export function WorldStateProvider({ children, activeSectionId }: WorldStateProviderProps) {
  const [worldState, setWorldStateInternal] = useState<WorldState>('HERO');
  const [selectedProject, setSelectedProject] = useState<ProjectSummary | null>(null);
  const [isBuildMode, setIsBuildMode] = useState(false);
  const [activeNeuralNode, setActiveNeuralNode] = useState<string | null>(null);
  const [warpPulse, setWarpPulse] = useState(0);

  // Sync section ID to world state when not in detailed override modes
  useEffect(() => {
    if (isBuildMode) {
      setWorldStateInternal('BUILD_MODE');
      return;
    }

    if (selectedProject) {
      setWorldStateInternal('PROJECT_DETAIL');
      return;
    }

    switch (activeSectionId) {
      case 'hero':
        setWorldStateInternal('HERO');
        break;
      case 'projects':
        setWorldStateInternal('PROJECTS');
        break;
      case 'skills':
        setWorldStateInternal('AI_CORE');
        break;
      case 'research':
        setWorldStateInternal('RESEARCH');
        break;
      case 'experience':
        setWorldStateInternal('JOURNEY');
        break;
      case 'contact':
        setWorldStateInternal('CONTACT');
        break;
      default:
        setWorldStateInternal('HERO');
        break;
    }
  }, [activeSectionId, selectedProject, isBuildMode]);

  const setWorldState = useCallback((state: WorldState) => {
    setWorldStateInternal(state);
    if (state === 'BUILD_MODE') {
      setIsBuildMode(true);
      setSelectedProject(null);
    } else {
      setIsBuildMode(false);
      if (state !== 'PROJECT_DETAIL') {
        setSelectedProject(null);
      }
    }
  }, []);

  const openProjectDetail = useCallback((project: ProjectSummary) => {
    soundFx.playClick();
    setSelectedProject(project);
    setIsBuildMode(false);
    setWorldStateInternal('PROJECT_DETAIL');
  }, []);

  const closeProjectDetail = useCallback(() => {
    soundFx.playClick();
    setSelectedProject(null);
    setWorldStateInternal('PROJECTS');
  }, []);

  const toggleBuildMode = useCallback(() => {
    soundFx.playClick();
    setIsBuildMode((prev) => {
      const next = !prev;
      if (next) {
        setWorldStateInternal('BUILD_MODE');
      } else {
        setWorldStateInternal('HERO');
      }
      return next;
    });
  }, []);

  const triggerWarpPulse = useCallback(() => {
    soundFx.playPulse();
    setWarpPulse((p) => p + 1);
  }, []);

  const cameraConfig = useMemo(() => WORLD_CAMERA_CONFIGS[worldState] || WORLD_CAMERA_CONFIGS.HERO, [worldState]);
  const atmosphereConfig = useMemo(() => WORLD_ATMOSPHERE_CONFIGS[worldState] || WORLD_ATMOSPHERE_CONFIGS.HERO, [worldState]);

  const value = useMemo(
    () => ({
      worldState,
      setWorldState,
      selectedProject,
      openProjectDetail,
      closeProjectDetail,
      isBuildMode,
      toggleBuildMode,
      activeNeuralNode,
      setActiveNeuralNode,
      warpPulse,
      triggerWarpPulse,
      cameraConfig,
      atmosphereConfig,
    }),
    [
      worldState,
      setWorldState,
      selectedProject,
      openProjectDetail,
      closeProjectDetail,
      isBuildMode,
      toggleBuildMode,
      activeNeuralNode,
      warpPulse,
      triggerWarpPulse,
      cameraConfig,
      atmosphereConfig,
    ],
  );

  return <WorldStateContext.Provider value={value}>{children}</WorldStateContext.Provider>;
}

export function useWorldState(): WorldStateContextType {
  const context = useContext(WorldStateContext);
  if (!context) {
    throw new Error('useWorldState must be used within a WorldStateProvider');
  }
  return context;
}
