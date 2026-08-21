import { useState } from 'react';
import type { ProjectSummary } from '../data/profile';
import { LiveCardCanvas } from './cards/LiveCardCanvas';
import { soundFx } from '../utils/soundEffects';

interface ProjectModalProps {
  project: ProjectSummary | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      soundFx.playClick();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        style={{ perspective: 1200 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border-2 border-signal/60 bg-[#070a0f]/95 shadow-[0_0_80px_rgba(56,189,248,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Live Interactive Canvas */}
        <LiveCardCanvas effectType="neural-mesh" primaryColor="#38bdf8" secondaryColor="#fbbf24" opacity={0.4} />

        {/* Modal Scrollable Content Container */}
        <div className="relative z-10 p-7 sm:p-10 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-white/15 bg-void/90 text-mono text-base font-bold text-slate-300 hover:border-signal hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition"
          >
            ✕
          </button>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-signal/70 bg-signal/20 px-3.5 py-1 font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-cyan-300 font-extrabold rounded-xl shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              {project.domain}
            </span>
            <span className="rounded-xl border border-amber-400/60 bg-amber-400/20 px-3.5 py-1 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-300 font-extrabold shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              STATUS: {project.status}
            </span>
          </div>

          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
            {project.title}
          </h2>
          <p className="mt-2 font-mono text-sm sm:text-base text-cyan-300 font-bold">{project.tagline}</p>

          {/* Description */}
          <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-200 bg-void/70 p-5 rounded-2xl border border-white/10 backdrop-blur-md font-normal">
            <p>{project.description}</p>
          </div>

          {/* System Architecture */}
          <div className="mt-7 border-t border-white/15 pt-5">
            <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_6px_#38bdf8]" />
              // System Architecture
            </h3>
            <p className="mt-3 font-mono text-xs sm:text-sm text-slate-200 bg-void/90 p-4 rounded-xl border border-signal/30 shadow-inner leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Engineering Metrics */}
          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <div className="mt-7">
              <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                // Key Benchmarks & Impact
              </h3>
              <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {project.keyMetrics.map((metric, i) => (
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

          {/* Code Snippet Preview */}
          {project.codeSnippet && (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-signal" />
                  // Execution Snippet
                </h3>
                <button
                  onClick={handleCopyCode}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-bold text-cyan-300 hover:border-signal hover:bg-signal/20 transition"
                >
                  {copiedCode ? 'COPIED ✓' : 'COPY CODE'}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-black/80 p-5 font-mono text-xs sm:text-sm leading-6 text-cyan-200 border border-signal/30 shadow-inner">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Badges */}
          <div className="mt-7 flex flex-wrap gap-2.5 border-t border-white/15 pt-5">
            {project.technologies.map((tech) => (
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
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border-2 border-signal/60 bg-signal/20 px-6 py-3 font-mono text-xs sm:text-sm text-cyan-200 hover:bg-signal hover:text-black font-extrabold shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-200 hover:scale-105"
              >
                <span>VIEW SOURCE CODE ↗</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border-2 border-amber-400/60 bg-amber-400/20 px-6 py-3 font-mono text-xs sm:text-sm text-amber-200 hover:bg-amber-400 hover:text-black font-extrabold shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-200 hover:scale-105"
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
