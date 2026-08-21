import { useEffect, useRef, useState } from 'react';

import { runBootSequence } from '../animations/bootSequence';
import { profile, skillClusters } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { CinematicCanvas } from '../scenes/CinematicCanvas';

import { CommandPalette } from './CommandPalette';
import { FooterHUD } from './FooterHUD';
import { HeaderHUD } from './HeaderHUD';
import { ProjectUniverseModal } from './ProjectUniverseModal';
import { RecruiterModal } from './RecruiterModal';
import { BuildModeOverlay } from './effects/BuildModeOverlay';
import { CursorGlow } from './effects/CursorGlow';
import { HeroStatsStrip } from './effects/HeroStatsStrip';
import { CyberTicker } from './effects/CyberTicker';
import { WorldStateProvider } from '../context/WorldStateContext';

import { ContactSection } from '../sections/ContactSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { HeroInterface } from '../sections/HeroInterface';
import { NeuralSkillsSection } from '../sections/NeuralSkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ResearchSection } from '../sections/ResearchSection';

export function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);

  useEffect(() => {
    if (!rootRef.current || reducedMotion) {
      return undefined;
    }

    return runBootSequence(rootRef.current);
  }, [reducedMotion]);

  const toggleAudio = () => {
    setAudioMuted(!audioMuted);
  };

  return (
    <WorldStateProvider activeSectionId={activeSection}>
      <main ref={rootRef} className="experience-shell">
        {/* State-Aware Soft Glowing Mouse Aura & Click Ripples */}
        <CursorGlow />

        {/* HUD Header with Recruiter and Build Mode Toggles */}
        <HeaderHUD
          activeSection={activeSection}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
          audioMuted={audioMuted}
          onToggleAudio={toggleAudio}
        />

        {/* 3D WebGL Canvas Living World */}
        <div className="canvas-stage" aria-hidden="true">
          <CinematicCanvas reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
        </div>

        {/* Interface Overlay Layers */}
        <div className="interface-layer">
          <div data-section-id="hero">
            <HeroInterface
              profile={profile}
              skillClusters={skillClusters}
              onOpenRecruiter={() => setIsRecruiterOpen(true)}
            />
          </div>

          {/* Live Cyber Ticker Marquee */}
          <CyberTicker />

          {/* 4-Metric Live Animated Hologram Stats Strip */}
          <HeroStatsStrip />

          <ProjectsSection />
          <NeuralSkillsSection />
          <ResearchSection />
          <ExperienceSection />
          <ContactSection />
        </div>

        {/* Footer HUD */}
        <FooterHUD />

        {/* 3D Project Universe Architecture Modal */}
        <ProjectUniverseModal />

        {/* Recruiter Fast-Access Summary & CV Modal */}
        <RecruiterModal isOpen={isRecruiterOpen} onClose={() => setIsRecruiterOpen(false)} />

        {/* Technical Architecture Blueprint Overlay (Build Mode) */}
        <BuildModeOverlay />

        {/* Global Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectProject={() => {
            setIsCommandPaletteOpen(false);
          }}
        />

        <div className="noise-overlay" aria-hidden="true" />
      </main>
    </WorldStateProvider>
  );
}
