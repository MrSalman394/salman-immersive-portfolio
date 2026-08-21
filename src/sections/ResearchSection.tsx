import { research } from '../data/profile';
import { ResearchCard3D } from '../components/cards/ResearchCard3D';
import { TextScramble } from '../components/effects/TextScramble';

export function ResearchSection() {
  return (
    <section
      data-section-id="research"
      className="relative min-h-screen px-5 py-28 sm:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-1 w-10 bg-signal rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span>03 // RESEARCH & PUBLICATIONS</span>
          </div>
          <div className="font-display text-balance text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.35)] cursor-pointer">
            <TextScramble text="PUBLICATIONS & RESEARCH" as="h2" hoverSound={true} />
          </div>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
            Peer-reviewed research presented at IBCAST 2025 and accepted at ICCoR 2026 covering transparent medical vision and smart agricultural disease diagnosis.
          </p>
        </div>

        {/* 3D Papers List */}
        <div className="space-y-8">
          {research.map((item, idx) => (
            <ResearchCard3D key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
