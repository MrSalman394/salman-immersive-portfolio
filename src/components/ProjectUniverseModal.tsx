import { useState } from 'react';
import type { ProjectSummary } from '../data/profile';
import { LiveCardCanvas } from './cards/LiveCardCanvas';
import { soundFx } from '../utils/soundEffects';
import { useWorldState } from '../context/WorldStateContext';
import { AIMatchingDemo } from './effects/AIMatchingDemo';

export function ProjectUniverseModal() {
  const { selectedProject, closeProjectDetail } = useWorldState();
  const [copiedCode, setCopiedCode] = useState(false);

  if (!selectedProject) return null;

  const isNexusHire = selectedProject.id === 'nexushireconnect';

  const handleCopyCode = () => {
    if (selectedProject.codeSnippet) {
      navigator.clipboard.writeText(selectedProject.codeSnippet);
      setCopiedCode(true);
      soundFx.playClick();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl animate-fade-in"
      onClick={closeProjectDetail}
    >
      <div
        style={{ perspective: 1400 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border-2 border-signal/70 bg-[#05080e]/95 shadow-[0_0_90px_rgba(56,189,248,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Live Interactive Canvas */}
        <LiveCardCanvas effectType="neural-mesh" primaryColor="#38bdf8" secondaryColor="#fbbf24" opacity={0.35} />

        {/* Modal Scrollable Content Container */}
        <div className="relative z-10 p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              closeProjectDetail();
            }}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-white/20 bg-void/90 text-mono text-base font-bold text-slate-300 hover:border-signal hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition"
          >
            ✕
          </button>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-signal/80 bg-signal/20 px-3.5 py-1 font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-cyan-300 font-extrabold rounded-xl shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              {selectedProject.domain}
            </span>
            <span className="rounded-xl border border-amber-400/60 bg-amber-400/20 px-3.5 py-1 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-300 font-extrabold shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              STATUS: {selectedProject.status.toUpperCase()}
            </span>
          </div>

          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            {selectedProject.title}
          </h2>
          <p className="mt-2 font-mono text-sm sm:text-base text-cyan-300 font-bold">{selectedProject.tagline}</p>

          {/* Overview & Solution */}
          <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-100 bg-void/80 p-5 rounded-2xl border border-white/15 backdrop-blur-xl font-normal">
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 font-bold mb-2">
              // ARCHITECTURAL OVERVIEW & PROBLEM RESOLUTION
            </span>
            <p>{selectedProject.description}</p>
          </div>

          {/* System Architecture Data Flow */}
          <div className="mt-6 border-t border-white/15 pt-5">
            <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_6px_#38bdf8]" />
              // System Architecture & Data Pipeline
            </h3>
            
            {/* Visual Animated Pipeline Box */}
            <div className="mt-3.5 rounded-2xl bg-black/80 border border-signal/30 p-4 font-mono text-xs text-center grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-center">
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-cyan-300">
                <span className="font-bold">USER / CLIENT</span>
                <span className="text-[0.65rem] text-slate-300 block mt-0.5">React + TS</span>
              </div>
              <div className="text-cyan-400 font-extrabold">➔ REST API ➔</div>
              <div className="p-2.5 rounded-xl bg-green-950/40 border border-green-400/40 text-green-300">
                <span className="font-bold">NODE.JS SERVER</span>
                <span className="text-[0.65rem] text-slate-300 block mt-0.5">Auth + Controllers</span>
              </div>
              <div className="text-amber-400 font-extrabold">➔ QUERY / INFER ➔</div>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-400/40 text-purple-300">
                <span className="font-bold">POSTGRES & AI</span>
                <span className="text-[0.65rem] text-slate-300 block mt-0.5">Vector + Database</span>
              </div>
            </div>

            <p className="mt-3 font-mono text-xs sm:text-sm text-slate-200 bg-void/90 p-4 rounded-xl border border-signal/30 shadow-inner leading-relaxed">
              {selectedProject.architecture}
            </p>
          </div>

          {/* Interactive AI Matching Demo for NexusHireConnect */}
          {isNexusHire && (
            <div className="mt-7">
              <AIMatchingDemo />
            </div>
          )}

          {/* Key Metrics & Impact */}
          {selectedProject.keyMetrics && selectedProject.keyMetrics.length > 0 && (
            <div className="mt-6">
              <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                // Key Benchmarks & Engineering Highlights
              </h3>
              <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {selectedProject.keyMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-amber-400/40 bg-amber-400/15 p-4 text-center shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-200 hover:scale-105 hover:border-amber-400"
                  >
                    <span className="block font-mono text-xs sm:text-sm font-extrabold text-amber-300">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Execution Snippet */}
          {selectedProject.codeSnippet && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-signal" />
                  // Core Execution Logic
                </h3>
                <button
                  onClick={handleCopyCode}
                  className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs font-bold text-cyan-300 hover:border-signal hover:bg-signal/20 transition"
                >
                  {copiedCode ? 'COPIED ✓' : 'COPY CODE 📋'}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-black/90 p-5 font-mono text-xs sm:text-sm leading-6 text-cyan-200 border border-signal/30 shadow-inner">
                <code>{selectedProject.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Badges */}
          <div className="mt-6 flex flex-wrap gap-2.5 border-t border-white/15 pt-5">
            {selectedProject.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-xs sm:text-sm text-slate-100 font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-2xl border-2 border-signal/70 bg-signal/20 px-6 py-3 font-mono text-xs sm:text-sm text-cyan-200 hover:bg-signal hover:text-black font-extrabold shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-200 hover:scale-105"
              >
                <span>VIEW SOURCE CODE ↗</span>
              </a>
            )}
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-2xl border-2 border-amber-400/70 bg-amber-400/20 px-6 py-3 font-mono text-xs sm:text-sm text-amber-200 hover:bg-amber-400 hover:text-black font-extrabold shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-200 hover:scale-105"
              >
                <span>LAUNCH LIVE DEMO ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
