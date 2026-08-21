import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { SkillCluster } from '../data/profile';
import { HeroMicroCard3D } from '../components/cards/HeroMicroCard3D';
import { HeroAvatar3D } from '../components/cards/HeroAvatar3D';
import { TextScramble } from '../components/effects/TextScramble';
import { soundFx } from '../utils/soundEffects';

interface HeroInterfaceProps {
  profile: {
    name: string;
    roles: string[];
    highlights: string[];
    statement: string;
    availability: string;
    location: string;
  };
  skillClusters: SkillCluster[];
  onOpenRecruiter?: () => void;
}

export function HeroInterface({ profile, skillClusters, onOpenRecruiter }: HeroInterfaceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Spring Physics Mouse Tilt for the entire Left Hero Deck
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const scrollToSection = (id: string) => {
    soundFx.playClick();
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1400 }}
      className="relative flex min-h-screen items-end px-5 pb-12 pt-28 sm:px-8 lg:items-center lg:px-12 lg:pb-0"
    >
      <div className="pointer-events-auto grid w-full grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
        {/* Left Column: 3D Holographic Interactive Cockpit Deck */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          className="relative max-w-5xl rounded-3xl p-4 sm:p-8 transition-shadow duration-500"
        >
          {/* Ambient Holographic HUD Brackets */}
          <div
            style={{ transform: 'translateZ(15px)' }}
            className="pointer-events-none absolute -inset-2 rounded-3xl border border-signal/20 bg-signal/[0.02] backdrop-blur-[2px] transition-all duration-300 group-hover:border-signal/40"
          >
            <span className="absolute top-2 left-3 font-mono text-[0.65rem] text-cyan-300/60 font-bold">
              SYS.IDENTITY // SALMAN DIGITAL CORE
            </span>
            <span className="absolute top-2 right-3 font-mono text-[0.65rem] text-amber-300/60 font-bold">
              SYSTEM STATUS: ONLINE // READY
            </span>
          </div>

          {/* Floating Real-Time Telemetry Badges */}
          <div
            style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 font-mono text-[0.65rem] font-extrabold uppercase tracking-widest text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.35)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              ⚡ FULL STACK DEVELOPER
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 font-mono text-[0.65rem] font-extrabold uppercase tracking-widest text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              ● AI RESEARCH WORK
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-green-400/50 bg-green-400/10 px-3 py-1 font-mono text-[0.65rem] font-extrabold uppercase tracking-widest text-green-300 shadow-[0_0_12px_rgba(74,222,128,0.35)]">
              🛡️ BS SOFTWARE ENG '27
            </span>
          </div>

          {/* Glowing Top Boot Line */}
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="mb-5 flex w-60 origin-left gap-2.5"
            aria-hidden="true"
          >
            <span
              data-boot-line
              className="h-1.5 flex-1 origin-left rounded-full bg-signal shadow-[0_0_15px_#38bdf8] animate-pulse"
            />
            <span
              data-boot-line
              className="h-1.5 flex-[0.5] origin-left rounded-full bg-amber-400 shadow-[0_0_15px_#fbbf24] animate-pulse"
            />
          </div>

          {/* Kicker & Location Pod */}
          <div
            style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            className="flex flex-wrap items-center gap-3.5 mb-4"
          >
            <div
              data-hero-kicker
              className="max-w-fit rounded-xl border-l-4 border-signal bg-signal/15 px-4 py-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] cursor-pointer"
            >
              <TextScramble text="Full Stack Developer & AI Researcher" hoverSound={true} />
            </div>
            <span className="font-mono text-xs font-bold text-amber-300 border border-amber-400/50 bg-amber-400/20 px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              📍 {profile.location}
            </span>
          </div>

          {/* 3D Liquid Chrome Shimmering Holographic Headline */}
          <div
            style={{ transform: 'translateZ(55px)', transformStyle: 'preserve-3d' }}
            data-hero-title
            className="max-w-4xl font-display text-balance text-[clamp(3.4rem,7.8vw,7.6rem)] font-extrabold uppercase leading-[0.9] tracking-tight cursor-pointer"
          >
            <div className="bg-gradient-to-r from-white via-cyan-300 via-amber-200 via-purple-300 to-white bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
              <TextScramble
                text={profile.name}
                as="h1"
                triggerOnMount={true}
                hoverSound={true}
              />
            </div>
          </div>

          {/* 3D Bio & Core Engineering Highlights */}
          <div
            style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            data-hero-copy
            className="mt-7 grid max-w-4xl gap-6 text-pretty sm:grid-cols-[1.1fr_0.9fr]"
          >
            <p className="text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
              {profile.statement}
            </p>
            <div className="font-mono text-xs sm:text-sm leading-6 text-cyan-200 font-medium bg-void/85 p-4 rounded-2xl border border-white/15 backdrop-blur-xl shadow-lg space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-cyan-300 font-extrabold">
                  // CORE CAPABILITIES
                </span>
                {/* Micro Animated Audio Frequency Bars */}
                <div className="flex items-end gap-1 h-3">
                  <span className="w-1 bg-cyan-400 rounded-full animate-pulse h-full" />
                  <span className="w-1 bg-amber-400 rounded-full animate-ping h-2/3" />
                  <span className="w-1 bg-cyan-300 rounded-full animate-pulse h-3/4" />
                </div>
              </div>
              {profile.highlights.map((line) => (
                <div key={line} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal shadow-[0_0_8px_#38bdf8]" />
                  <span className="leading-snug">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Glowing 3D Action Buttons Strip */}
          <div
            style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-2.5 rounded-2xl border-2 border-signal bg-signal/25 px-6 py-3.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-200 transition-all duration-300 hover:scale-105 hover:bg-signal hover:text-black hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-ping shadow-[0_0_8px_#38bdf8]" />
              <span>EXPLORE PROJECTS ↓</span>
            </button>

            <a
              href="/salman-cv.pdf"
              download="Muhammad_Salman_CV.pdf"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-2 rounded-2xl border-2 border-amber-400/80 bg-amber-400/25 px-6 py-3.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-200 transition-all duration-300 hover:scale-105 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_35px_rgba(251,191,36,0.7)]"
            >
              <span>📄 DOWNLOAD CV</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 px-5 py-3.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-200 transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
            >
              <span>⚡ INITIALIZE COMM</span>
            </button>
          </div>

          {/* 3D Floating Skill Micro-Cards */}
          <div
            style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
            data-hero-meta
            className="mt-8 hidden flex-wrap gap-3.5 sm:flex"
          >
            {skillClusters.map((cluster, idx) => (
              <HeroMicroCard3D key={cluster.id} cluster={cluster} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* Right Column: 3D Holographic Avatar Card */}
        <div className="hidden lg:flex justify-center items-center">
          <HeroAvatar3D
            name={profile.name}
            role="Full Stack Developer & AI Researcher"
          />
        </div>
      </div>
    </section>
  );
}
