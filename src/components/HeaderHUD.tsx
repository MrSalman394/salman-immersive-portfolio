import type { SectionId } from '../hooks/useActiveSection';
import { soundFx } from '../utils/soundEffects';
import { useWorldState } from '../context/WorldStateContext';

interface HeaderHUDProps {
  activeSection: SectionId;
  onOpenCommandPalette: () => void;
  onOpenRecruiter: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: '// SYSTEM' },
  { id: 'projects', label: '// PROJECTS' },
  { id: 'skills', label: '// AI & SKILLS' },
  { id: 'research', label: '// RESEARCH' },
  { id: 'experience', label: '// JOURNEY' },
  { id: 'contact', label: '// CONNECT' },
];

export function HeaderHUD({
  activeSection,
  onOpenCommandPalette,
  onOpenRecruiter,
  audioMuted,
  onToggleAudio,
}: HeaderHUDProps) {
  const { isBuildMode, toggleBuildMode } = useWorldState();

  const scrollToSection = (id: SectionId) => {
    soundFx.playClick();
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAudioToggle = () => {
    onToggleAudio();
    soundFx.setMuted(!audioMuted);
    if (audioMuted) {
      setTimeout(() => soundFx.playPulse(), 50);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-3.5 backdrop-blur-xl bg-void/80 border-b border-white/10 transition-all duration-300">
      {/* Brand / Logo */}
      <button
        onClick={() => scrollToSection('hero')}
        onMouseEnter={() => soundFx.playHover()}
        className="group flex items-center gap-3 text-left focus:outline-none"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-400/80 bg-[#05080e] font-mono text-sm font-extrabold text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.6)]">
          <span>MS</span>
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping shadow-[0_0_6px_#fbbf24]" />
        </div>
        <div className="hidden sm:block">
          <span className="block font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-white">
            Muhammad Salman
          </span>
          <span className="block font-mono text-xs font-semibold tracking-[0.18em] text-amber-300/90">
            SYSTEM ONLINE // ACTIVE
          </span>
        </div>
      </button>

      {/* 3D Live Animated Sleek Golden Outer Capsule Navigation Ring */}
      <div className="hidden lg:block relative p-[1.5px] rounded-full overflow-hidden animate-gold-glow shadow-[0_0_18px_rgba(251,191,36,0.35)] group">
        {/* Continuous Rotating Golden Laser Aura */}
        <div
          className="absolute -inset-[100%] animate-gold-spin opacity-85"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, #fbbf24 60deg, #fef08a 120deg, #f59e0b 180deg, #d97706 240deg, #fef08a 300deg, transparent 360deg)',
          }}
        />

        {/* Outer 3D Glass Pill Container */}
        <nav className="relative z-10 flex items-center gap-1.5 rounded-full bg-[#05080e]/95 px-3.5 py-1 backdrop-blur-2xl border border-amber-400/40">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id && !isBuildMode;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`relative px-3.5 py-1 font-mono text-xs font-extrabold tracking-[0.16em] transition-all duration-300 rounded-full ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400/25 to-amber-500/15 text-amber-300 border border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.4)] scale-105'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-amber-400/10'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shadow-[0_0_4px_#fbbf24]" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Recruiter View Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenRecruiter();
          }}
          onMouseEnter={() => soundFx.playHover()}
          title="Open Recruiter Fast-Access Executive Summary"
          className="flex h-9 items-center gap-1.5 rounded-xl border border-amber-400/70 bg-amber-400/20 px-2.5 sm:px-3 font-mono text-xs font-extrabold tracking-wider text-amber-300 hover:bg-amber-400 hover:text-black transition duration-200 shadow-sm"
        >
          <span>👔</span>
          <span className="hidden md:inline">RECRUITER VIEW</span>
        </button>

        {/* Build Mode Toggle */}
        <button
          onClick={toggleBuildMode}
          onMouseEnter={() => soundFx.playHover()}
          title="Toggle System Architecture Blueprint"
          className={`flex h-9 items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 font-mono text-xs font-extrabold tracking-wider transition-all duration-200 ${
            isBuildMode
              ? 'border-cyan-400 bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.7)]'
              : 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300 hover:bg-cyan-400/25 hover:border-cyan-400 shadow-sm'
          }`}
        >
          <span>🛠️</span>
          <span className="hidden md:inline">BUILD MODE</span>
        </button>

        <button
          onClick={handleAudioToggle}
          onMouseEnter={() => soundFx.playHover()}
          title={audioMuted ? 'Unmute UI Sound' : 'Mute UI Sound'}
          className="flex h-9 items-center gap-1.5 rounded-xl border border-white/15 bg-[#05080e]/90 px-2.5 sm:px-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-200 transition hover:border-amber-400/60 hover:text-amber-300 shadow-sm"
        >
          <span className={`h-2 w-2 rounded-full ${audioMuted ? 'bg-red-400' : 'bg-amber-400 animate-pulse shadow-[0_0_6px_#fbbf24]'}`} />
          <span className="hidden lg:inline">{audioMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onOpenCommandPalette();
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="flex h-9 items-center gap-1.5 rounded-xl border border-amber-400/60 bg-amber-400/15 px-3 font-mono text-xs font-extrabold tracking-[0.16em] text-amber-300 transition duration-300 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
          <span>⌘K</span>
          <span className="hidden sm:inline">CMD</span>
        </button>
      </div>
    </header>
  );
}
