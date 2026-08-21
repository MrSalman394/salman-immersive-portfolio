import { useState } from 'react';
import { soundFx } from '../../utils/soundEffects';

const AVAILABLE_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Python',
  'PyTorch',
  'Computer Vision',
  'REST APIs',
  'Tailwind CSS',
];

export function AIMatchingDemo() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
  ]);

  const toggleSkill = (skill: string) => {
    soundFx.playHover();
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  // Determine recommendation based on selected skills
  const hasFullStack = selectedSkills.some((s) => ['React', 'TypeScript', 'Node.js', 'PostgreSQL'].includes(s));
  const hasAI = selectedSkills.some((s) => ['Python', 'PyTorch', 'Computer Vision'].includes(s));

  let recommendedRole = 'Select skills above to calculate role recommendation';
  let matchScore = 0;

  if (hasFullStack && hasAI) {
    recommendedRole = 'Full Stack & AI Engineer';
    matchScore = Math.min(98, 75 + selectedSkills.length * 3);
  } else if (hasAI) {
    recommendedRole = 'AI & Computer Vision Developer';
    matchScore = Math.min(95, 70 + selectedSkills.length * 4);
  } else if (hasFullStack) {
    recommendedRole = 'Full Stack Software Engineer';
    matchScore = Math.min(96, 72 + selectedSkills.length * 4);
  }

  return (
    <div className="rounded-2xl border-2 border-cyan-400/30 bg-[#050912] p-5 sm:p-7 shadow-xl">
      {/* Header with clear Demo Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>AI CAREER MATCHING ENGINE</span>
        </div>
        <span className="rounded-xl border border-amber-400/50 bg-amber-400/20 px-3 py-1 font-mono text-[0.68rem] sm:text-xs font-extrabold uppercase tracking-widest text-amber-300">
          ● INTERACTIVE DEMO (SIMULATION)
        </span>
      </div>

      {/* Candidate Skill Selector */}
      <div className="mt-5">
        <span className="block font-mono text-xs uppercase tracking-widest text-slate-300 font-bold mb-2.5">
          1. CANDIDATE PROFILE SKILLS (CLICK TO TOGGLE):
        </span>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SKILLS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`rounded-xl border px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-400/25 text-cyan-200 shadow-[0_0_12px_rgba(56,189,248,0.4)] scale-105'
                    : 'border-white/15 bg-white/5 text-slate-400 hover:border-cyan-400/40 hover:text-white'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Flow Animation Arrow */}
      <div className="my-4 flex items-center justify-center font-mono text-xs text-cyan-400 font-bold tracking-widest">
        <span>↓ AI EMBEDDING & COSINE SIMILARITY ENGINE ↓</span>
      </div>

      {/* Output Recommended Role Box */}
      <div className="rounded-xl border border-green-400/40 bg-green-950/20 p-4 font-mono">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[0.68rem] text-slate-300 uppercase tracking-widest font-bold">
            2. MATCHED ROLE RECOMMENDATION
          </span>
          {matchScore > 0 && (
            <span className="text-xs font-extrabold text-green-300">
              SIMULATED COMPATIBILITY: {matchScore}%
            </span>
          )}
        </div>
        <span className="block text-sm sm:text-base font-extrabold text-white">
          {recommendedRole}
        </span>
      </div>
    </div>
  );
}
