import type { ExperienceItem } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';

interface ExperienceCard3DProps {
  exp: ExperienceItem;
  index: number;
}

export function ExperienceCard3D({ exp, index }: ExperienceCard3DProps) {
  return (
    <div className="relative group">
      {/* Timeline 3D Node Icon */}
      <div className="absolute -left-[35px] sm:-left-[43px] top-6 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-signal bg-[#070c14] shadow-[0_0_20px_rgba(56,189,248,0.9)] transition-transform duration-300 group-hover:scale-125">
        <span className="h-3 w-3 rounded-full bg-signal animate-ping shadow-[0_0_8px_#38bdf8]" />
      </div>

      <LiveCard3D
        effectType={index % 2 === 0 ? 'cyber-grid' : 'neural-mesh'}
        accentColor={index % 2 === 0 ? 'signal' : 'amber'}
        intensity={8}
        showHUDCorners={false}
        showScanline={true}
        className="p-8 sm:p-10 !bg-[#070c14] border-2 border-white/20 hover:border-signal/70 shadow-2xl rounded-3xl"
      >
        <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
          {/* Header Role & Company */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h3
                style={{ transform: 'translateZ(35px)' }}
                className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white transition-colors group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              >
                {exp.role}
              </h3>
              <p
                style={{ transform: 'translateZ(25px)' }}
                className="mt-1 font-mono text-sm sm:text-base font-bold text-cyan-300 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_6px_#38bdf8]" />
                {exp.organization}
              </p>
            </div>

            <div
              style={{ transform: 'translateZ(30px)' }}
              className="text-right font-mono text-xs sm:text-sm text-amber-300"
            >
              <div className="rounded-xl border border-amber-400/40 bg-amber-400/20 px-3.5 py-1 font-extrabold shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                {exp.period}
              </div>
              <div className="mt-1 text-xs text-slate-300 font-medium">{exp.location}</div>
            </div>
          </div>

          {/* Highlights Container */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="mt-5 rounded-2xl bg-[#03060a] p-5 sm:p-6 border border-white/10 shadow-inner"
          >
            <ul className="space-y-3 text-base sm:text-lg text-slate-200">
              {exp.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badges */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="mt-6 flex flex-wrap gap-2.5 border-t border-white/15 pt-5"
          >
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-mono text-xs sm:text-sm font-semibold text-slate-100 transition-all duration-200 hover:scale-105 hover:border-signal/60 hover:bg-signal/20 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </LiveCard3D>
    </div>
  );
}
