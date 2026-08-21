import { useState } from 'react';
import { profile, projects, research } from '../data/profile';
import { soundFx } from '../utils/soundEffects';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    soundFx.playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    soundFx.playClick();
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border-2 border-amber-400/60 bg-[#060a12] p-6 sm:p-9 shadow-[0_0_80px_rgba(251,191,36,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
            </span>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                RECRUITER FAST-ACCESS VIEW // EXECUTIVE SUMMARY
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                {profile.name}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 font-mono text-sm text-slate-300 hover:border-amber-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="mt-6 max-h-[68vh] overflow-y-auto space-y-6 pr-2">
          {/* Quick Bio & Education Box */}
          <div className="rounded-2xl border border-white/10 bg-void/80 p-5 font-mono text-xs sm:text-sm text-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 font-bold">
              <span className="text-cyan-300">🎓 BS SOFTWARE ENGINEERING</span>
              <span className="text-amber-300">UNIVERSITY OF WAH (2023 — 2027)</span>
            </div>
            <p className="text-slate-300 leading-relaxed pt-1">
              Full Stack Developer & AI Researcher with hands-on experience building role-based web platforms, e-commerce applications, AI job recommendation engines, secure voting systems, and medical/agricultural deep learning vision models.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <span>📍</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/salman-cv.pdf"
              download="Muhammad_Salman_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-400/25 px-5 py-3 font-mono text-xs sm:text-sm font-extrabold uppercase text-amber-200 hover:bg-amber-400 hover:text-black transition-all duration-200 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            >
              <span>📄 DOWNLOAD CV (PDF)</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="rounded-xl border border-cyan-400/50 bg-cyan-400/15 px-3 py-3 font-mono text-xs font-bold text-cyan-200 hover:bg-cyan-400 hover:text-black transition"
              >
                {copiedEmail ? 'EMAIL COPIED ✓' : 'COPY EMAIL 📋'}
              </button>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 font-mono text-xs font-bold text-slate-200 hover:border-white/40 hover:text-white transition"
              >
                {copiedPhone ? 'PHONE COPIED ✓' : 'COPY PHONE 📞'}
              </button>
            </div>
          </div>

          {/* Verified Technical Stack */}
          <div className="rounded-2xl border border-white/10 bg-void/60 p-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              VERIFIED TECHNICAL SKILLS (FROM CV)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Languages:</span>
                <span className="text-white">Python, TypeScript, JavaScript, C, C++, Java, PHP, HTML, CSS</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Web & Backend:</span>
                <span className="text-white">React.js, Node.js, Express.js, Laravel, REST APIs, WordPress</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Databases:</span>
                <span className="text-white">PostgreSQL, MySQL</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">AI & Research:</span>
                <span className="text-white">Deep Transfer Learning, Hybrid CNN Fusion, Computer Vision</span>
              </div>
            </div>
          </div>

          {/* Top Systems & Research Links */}
          <div className="rounded-2xl border border-white/10 bg-void/60 p-5 font-mono text-xs space-y-3">
            <h3 className="font-bold uppercase tracking-[0.2em] text-amber-300 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              FEATURED PROJECTS & RESEARCH
            </h3>
            <div className="space-y-2">
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white font-bold">{p.title}</span>
                  <span className="text-slate-400">{p.technologies.slice(0, 3).join(', ')}</span>
                </div>
              ))}
              {research.map((r) => (
                <div key={r.id} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-cyan-300 font-bold">{r.title}</span>
                  <span className="text-amber-300">{r.venue.split(',')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* External Profile Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-mono text-xs">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:underline flex items-center gap-1.5"
            >
              <span>GitHub: github.com/MrSalman394 ↗</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 hover:underline flex items-center gap-1.5"
            >
              <span>LinkedIn: linkedin.com/in/muhammad-salman ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
