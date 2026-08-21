import { useState } from 'react';
import { projects, type ProjectCategory, type ProjectSummary } from '../data/profile';
import { ProjectCard3D } from '../components/cards/ProjectCard3D';
import { TextScramble } from '../components/effects/TextScramble';
import { soundFx } from '../utils/soundEffects';
import { useWorldState } from '../context/WorldStateContext';

interface ProjectsSectionProps {
  onSelectProject?: (project: ProjectSummary) => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'ALL SYSTEMS' },
  { id: 'ai-ml', label: 'AI & ML' },
  { id: 'webgl', label: 'WEBGL / GRAPHICS' },
  { id: 'systems', label: 'BACKEND & SYSTEMS' },
  { id: 'fullstack', label: 'FULL-STACK' },
];

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { openProjectDetail } = useWorldState();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory,
  );

  const handleCategoryChange = (id: ProjectCategory) => {
    soundFx.playClick();
    setActiveCategory(id);
  };

  const handleSelect = (project: ProjectSummary) => {
    openProjectDetail(project);
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <section
      data-section-id="projects"
      className="relative min-h-screen px-5 py-28 sm:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-7xl">
        {/* Section Title */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-1 w-10 bg-signal rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span>01 // FEATURED ARTIFACTS</span>
          </div>
          <div className="font-display text-balance text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.35)] cursor-pointer">
            <TextScramble text="ENGINEERED SYSTEMS & ARTIFACTS" as="h2" hoverSound={true} />
          </div>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
            Selected full-stack platforms, secure voting systems, AI recommendation pipelines, and OOP software applications.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold tracking-[0.16em] transition-all duration-300 border rounded-xl ${
                  activeCategory === cat.id
                    ? 'border-signal bg-signal/25 text-cyan-200 font-extrabold shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
                    : 'border-white/15 bg-void/60 text-slate-300 hover:border-signal/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              onSelect={handleSelect}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
