import { useState } from 'react';
import { motion } from 'framer-motion';
import { LiveCard3D } from './LiveCard3D';
import { soundFx } from '../../utils/soundEffects';

interface HeroAvatar3DProps {
  name: string;
  role?: string;
}

export function HeroAvatar3D({ name, role = 'Full Stack Developer & AI Researcher' }: HeroAvatar3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToContact = () => {
    soundFx.playClick();
    const el = document.querySelector('[data-section-id="contact"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-[340px] mx-auto lg:max-w-none">
      {/* Outer Holographic Energy Aura / Rotating Gradient Ring */}
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-signal via-amberline to-signal opacity-50 blur-xl animate-pulse" />

      <LiveCard3D
        effectType="neural-mesh"
        accentColor="signal"
        intensity={16}
        showHUDCorners={true}
        showScanline={true}
        className="p-4 bg-[#06090e]/95 border-signal/60 shadow-[0_0_50px_rgba(56,189,248,0.3)] overflow-hidden"
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          className="relative flex flex-col items-center"
        >
          {/* Top Live Status Beacon */}
          <div
            style={{ transform: 'translateZ(45px)' }}
            className="w-full flex items-center justify-between font-mono text-xs tracking-[0.2em] border-b border-white/15 pb-3 px-1"
          >
            <div className="flex items-center gap-2 text-cyan-300 font-extrabold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
              </span>
              <span>LIVE // SYS ACTIVE</span>
            </div>
            <span className="text-amber-300 font-extrabold drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]">
              NODE: ACTIVE
            </span>
          </div>

          {/* Picture Container with 3D Depth & Holographic Laser Scan */}
          <div
            style={{ transform: 'translateZ(35px)' }}
            className="relative mt-3.5 w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-signal/50 bg-void/80 shadow-2xl group/pic"
          >
            {/* The Photograph */}
            <img
              src="/images/salman.jpg"
              alt={name}
              className={`h-full w-full object-cover object-top transition-transform duration-700 ${
                isHovered ? 'scale-105 contrast-110 brightness-105' : 'scale-100'
              }`}
            />

            {/* Glowing Cyan Holographic Tint & Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040609] via-transparent to-signal/15 mix-blend-overlay" />

            {/* Continuous Vertical Laser Scanner Beam */}
            <div className="pointer-events-none absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#38bdf8] animate-scanline" />

            {/* Holographic HUD Grid Overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Sci-Fi Target Reticle Overlay */}
            <div className="pointer-events-none absolute inset-3 border border-signal/30 rounded-lg flex flex-col justify-between p-2">
              <div className="flex justify-between font-mono text-xs font-bold text-cyan-300 drop-shadow-[0_0_6px_#38bdf8]">
                <span>[ BANNU ]</span>
                <span>[ PAKISTAN ]</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-amber-300 font-extrabold drop-shadow-[0_0_6px_#fbbf24]">
                <span>ID: MS-CORE</span>
                <span>NODE: ACTIVE</span>
              </div>
            </div>

            {/* Glint Sheen on Hover */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover/pic:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(56,189,248,0.3) 50%, transparent 70%)',
              }}
            />
          </div>

          {/* Bottom Telemetry & Connect CTA */}
          <div
            style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
            className="w-full mt-4 pt-1"
          >
            <div className="text-center">
              <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                {name}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-cyan-300 font-bold tracking-[0.16em] mt-1">
                {role}
              </p>
            </div>

            {/* Quick Contact Button */}
            <button
              onClick={scrollToContact}
              className="mt-4 w-full rounded-xl border-2 border-signal/70 bg-signal/20 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-200 hover:bg-signal hover:text-black shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-200 hover:scale-[1.03]"
            >
              INITIALIZE COMM ↵
            </button>
          </div>
        </div>
      </LiveCard3D>
    </div>
  );
}
