import { useState } from 'react';
import type { ResearchItem } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';
import { soundFx } from '../../utils/soundEffects';

interface ResearchCard3DProps {
  item: ResearchItem;
  index: number;
}

export function ResearchCard3D({ item, index }: ResearchCard3DProps) {
  const [copied, setCopied] = useState(false);

  const copyBibtex = () => {
    navigator.clipboard.writeText(item.bibtex);
    setCopied(true);
    soundFx.playClick();
    setTimeout(() => setCopied(false), 2500);
  };

  const isIBCAST = item.venue.toLowerCase().includes('ibcast');

  return (
    <LiveCard3D
      effectType={index % 2 === 0 ? 'neural-mesh' : 'quantum-particles'}
      accentColor={isIBCAST ? 'signal' : 'amber'}
      intensity={8}
      showHUDCorners={false}
      showScanline={true}
      className="p-6 sm:p-9 !bg-[#070c14] border-2 border-white/20 hover:border-signal shadow-2xl rounded-3xl overflow-hidden"
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {/* Top Header Row: Conference Venue & Publication Seal */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 font-mono text-base font-extrabold ${
                isIBCAST
                  ? 'border-signal bg-signal/20 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                  : 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
              }`}
            >
              {isIBCAST ? '01' : '02'}
            </div>
            <div>
              <span
                className={`block font-mono text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] ${
                  isIBCAST ? 'text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]' : 'text-amber-300 drop-shadow-[0_0_8px_#fbbf24]'
                }`}
              >
                {item.venue}
              </span>
              <span className="block font-mono text-xs text-slate-400 font-semibold mt-0.5">
                {item.date} • {isIBCAST ? 'International Conference' : 'International Conference on Computing & Robotics'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-xl border-2 px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-[0.18em] shadow-md ${
                item.status === 'published'
                  ? 'border-green-400/70 bg-green-400/20 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.4)]'
                  : 'border-amber-400/70 bg-amber-400/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
              }`}
            >
              ● {item.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Paper Title with 3D Depth */}
        <h3
          style={{ transform: 'translateZ(30px)' }}
          className="mt-5 font-display text-2xl sm:text-3xl font-extrabold uppercase leading-snug tracking-tight text-white transition duration-200 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]"
        >
          {item.title}
        </h3>

        {/* High-Contrast Abstract Container */}
        <div
          style={{ transform: 'translateZ(15px)' }}
          className="mt-4 rounded-2xl bg-[#03060a] p-5 border border-white/10 border-l-4 border-l-cyan-400 shadow-inner"
        >
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 font-bold mb-2">
            // RESEARCH ABSTRACT
          </span>
          <p className="text-base sm:text-lg leading-relaxed text-slate-100 font-normal">
            {item.abstract}
          </p>
        </div>

        {/* Metadata Footer & BibTeX Action - Always neatly inside card */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs sm:text-sm text-slate-300">
            <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-cyan-300 font-bold">
              AUTHOR: <span className="text-white font-extrabold">Muhammad Salman</span>
            </span>
            <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-amber-300 font-bold">
              FOCUS: <span className="text-slate-100 font-medium">{item.focus}</span>
            </span>
          </div>

          <button
            onClick={copyBibtex}
            className={`flex items-center justify-center gap-2 rounded-xl border-2 px-5 py-2.5 font-mono text-xs sm:text-sm font-extrabold transition-all duration-200 w-full sm:w-auto flex-shrink-0 ${
              copied
                ? 'border-green-400 bg-green-400/30 text-green-200 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                : 'border-signal bg-signal/20 text-cyan-200 hover:bg-signal hover:text-black hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]'
            }`}
          >
            <span>{copied ? 'BIBTEX COPIED ✓' : 'COPY BIBTEX 📋'}</span>
          </button>
        </div>
      </div>
    </LiveCard3D>
  );
}
