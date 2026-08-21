import { experiences } from '../data/profile';
import { ExperienceCard3D } from '../components/cards/ExperienceCard3D';
import { TextScramble } from '../components/effects/TextScramble';

export function ExperienceSection() {
  return (
    <section
      data-section-id="experience"
      className="relative min-h-screen px-5 py-28 sm:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-1 w-10 bg-signal rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span>04 // CHRONOLOGICAL JOURNEY</span>
          </div>
          <div className="font-display text-balance text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.35)] cursor-pointer">
            <TextScramble text="CAREER & ACADEMIC TIMELINE" as="h2" hoverSound={true} />
          </div>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
            Chronological record of software engineering roles, research leadership, and academic milestones.
          </p>
        </div>

        {/* Timeline List with Glowing Laser Spine */}
        <div className="relative border-l-2 border-signal/50 pl-6 sm:pl-10 space-y-12 ml-3 sm:ml-6 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
          {experiences.map((exp, idx) => (
            <ExperienceCard3D key={exp.id} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
