import { TerminalCard3D } from '../components/cards/TerminalCard3D';
import { ContactChannelsCard3D } from '../components/cards/ContactChannelsCard3D';
import { TextScramble } from '../components/effects/TextScramble';

export function ContactSection() {
  return (
    <section
      data-section-id="contact"
      className="relative min-h-screen px-5 py-28 sm:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-1 w-10 bg-signal rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span>05 // CONTACT & PROFILE METADATA</span>
          </div>
          <div className="font-display text-balance text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.35)] cursor-pointer">
            <TextScramble text="GET IN TOUCH WITH SALMAN" as="h2" hoverSound={true} />
          </div>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
            Open for Full Stack Developer opportunities, AI development projects, research collaborations, and technical discussions.
          </p>
        </div>

        {/* 3D Interactive Terminal & Contact Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Interactive BASH CLI Terminal (Left 7 cols) */}
          <div className="lg:col-span-7 h-full">
            <TerminalCard3D />
          </div>

          {/* Contact Details & Resume Highlights Card (Right 5 cols) */}
          <div className="lg:col-span-5 h-full">
            <ContactChannelsCard3D />
          </div>
        </div>
      </div>
    </section>
  );
}
