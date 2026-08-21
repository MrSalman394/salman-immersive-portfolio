import { useState } from 'react';
import { profile } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';
import { soundFx } from '../../utils/soundEffects';

export function ContactChannelsCard3D() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    soundFx.playClick();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    soundFx.playClick();
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <LiveCard3D
      effectType="quantum-particles"
      accentColor="amber"
      intensity={8}
      showHUDCorners={true}
      className="p-7 sm:p-9 flex flex-col justify-between h-full bg-[#080705]/95 border-amber-400/40"
    >
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        <h3 className="font-mono text-sm sm:text-base font-extrabold uppercase tracking-[0.24em] text-amber-300 flex items-center gap-2.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          <span className="h-3 w-3 rounded-full bg-amber-400 animate-ping shadow-[0_0_8px_#fbbf24]" />
          // DIRECT CHANNELS & METRICS
        </h3>

        <div className="mt-6 space-y-4">
          {/* Email Pod with 3D Depth */}
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="group/email rounded-2xl border-2 border-amber-400/40 bg-amber-400/15 p-5 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]"
          >
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-amber-300 font-extrabold">
              PRIMARY COMM LINK
            </span>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 font-mono text-sm sm:text-base text-white font-extrabold">
              <span>{profile.email}</span>
              <button
                type="button"
                onClick={copyEmail}
                className={`rounded-xl border-2 px-4 py-1.5 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  copiedEmail
                    ? 'border-green-400 bg-green-400/25 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.5)]'
                    : 'border-amber-400/70 bg-amber-400/25 text-amber-200 hover:bg-amber-400 hover:text-black'
                }`}
              >
                {copiedEmail ? 'EMAIL COPIED ✓' : 'COPY EMAIL 📋'}
              </button>
            </div>
          </div>

          {/* Phone & Location Grid */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-white/15 bg-void/90 p-4 font-mono text-xs sm:text-sm transition duration-200 hover:border-signal/50 flex flex-col justify-between gap-2">
              <div>
                <span className="block text-xs uppercase tracking-[0.18em] text-slate-400 font-bold">PHONE</span>
                <span className="mt-1 block text-cyan-300 font-extrabold text-sm sm:text-base">{profile.phone}</span>
              </div>
              <button
                type="button"
                onClick={copyPhone}
                className={`rounded-lg border px-3 py-1 text-xs font-bold transition-all w-fit ${
                  copiedPhone
                    ? 'border-green-400 bg-green-400/20 text-green-300'
                    : 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400 hover:text-black'
                }`}
              >
                {copiedPhone ? 'PHONE COPIED ✓' : 'COPY PHONE 📞'}
              </button>
            </div>
            <div className="rounded-xl border border-white/15 bg-void/90 p-4 font-mono text-xs sm:text-sm transition duration-200 hover:border-amber-400/50">
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-400 font-bold">LOCATION</span>
              <span className="mt-1.5 block text-white font-bold text-sm sm:text-base">{profile.location}</span>
            </div>
          </div>

          {/* Spoken Languages */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="rounded-xl border border-white/15 bg-void/90 p-4 font-mono text-xs sm:text-sm"
          >
            <span className="block text-xs uppercase tracking-[0.18em] text-slate-400 font-bold mb-2">
              NATURAL LANGUAGES
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs sm:text-sm text-cyan-300 font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications Highlights */}
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="rounded-xl border border-white/15 bg-void/90 p-4 font-mono text-xs sm:text-sm"
          >
            <span className="block text-xs uppercase tracking-[0.18em] text-amber-300 font-extrabold mb-2">
              // VERIFIED CREDENTIALS
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {profile.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                  <span className="line-clamp-1 font-medium">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social Links Footer with 3D Depth */}
      <div
        style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
        className="mt-7 border-t border-white/15 pt-5 flex flex-wrap gap-4 font-mono text-xs sm:text-sm"
      >
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border-2 border-signal/60 bg-signal/15 px-4 py-2 text-cyan-200 font-extrabold transition-all duration-200 hover:scale-105 hover:bg-signal hover:text-black hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        >
          GITHUB ↗
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border-2 border-amber-400/60 bg-amber-400/15 px-4 py-2 text-amber-200 font-extrabold transition-all duration-200 hover:scale-105 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
        >
          LINKEDIN ↗
        </a>
      </div>
    </LiveCard3D>
  );
}
