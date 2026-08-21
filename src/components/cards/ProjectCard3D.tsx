import { useState } from 'react';
import type { ProjectSummary } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';
import { ProjectSimulatorCanvas } from '../effects/ProjectSimulatorCanvas';

interface ProjectCard3DProps {
  project: ProjectSummary;
  onSelect: (project: ProjectSummary) => void;
  index: number;
}

export function ProjectCard3D({ project, onSelect, index }: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  const effectTypes: Array<'neural-mesh' | 'cyber-grid' | 'quantum-particles'> = [
    'neural-mesh',
    'cyber-grid',
    'quantum-particles',
  ];
  const effectType = effectTypes[index % effectTypes.length];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <LiveCard3D
        onClick={() => onSelect(project)}
        effectType={effectType}
        accentColor={index % 2 === 0 ? 'signal' : 'amber'}
        intensity={12}
        showHUDCorners={true}
        showScanline={true}
        className="p-7 flex flex-col justify-between min-h-[440px] transition-all duration-300 border-white/15 hover:border-signal/60"
      >
        {/* Top Header Layer */}
        <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
          <div className="flex items-center justify-between font-mono text-xs tracking-[0.2em]">
            <span className="flex items-center gap-2 text-cyan-300 font-extrabold uppercase drop-shadow-[0_0_6px_#38bdf8]">
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#38bdf8]" />
              {project.domain}
            </span>
            <span className="rounded-lg border border-amber-400/50 bg-amber-400/15 px-2.5 py-0.5 font-mono text-xs font-extrabold text-amber-300 uppercase shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              {project.status}
            </span>
          </div>

          {/* 3D Floating Title */}
          <h3
            style={{ transform: 'translateZ(35px)' }}
            className="mt-4 font-display text-2xl font-bold uppercase text-white tracking-wide transition-colors duration-200 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]"
          >
            {project.title}
          </h3>

          {/* Live Interactive Project Simulation Viewport */}
          <ProjectSimulatorCanvas projectId={project.id} isHovered={isHovered} />

          {/* Description */}
          <p
            style={{ transform: 'translateZ(20px)' }}
            className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200 line-clamp-2 font-normal"
          >
            {project.description}
          </p>
        </div>

        {/* Bottom Tech Stack & CTA Layer */}
        <div
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          className="mt-5 border-t border-white/15 pt-4"
        >
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-slate-100 transition duration-200 group-hover:border-signal/50 group-hover:bg-signal/20 group-hover:text-white"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-mono text-xs text-cyan-300 font-extrabold px-1.5 py-1">
                +{project.technologies.length - 4} MORE
              </span>
            )}
          </div>

          {/* CTA Button */}
          <div
            style={{ transform: 'translateZ(40px)' }}
            className="mt-4 flex items-center justify-between font-mono text-xs sm:text-sm font-extrabold text-cyan-300 transition-all duration-200 group-hover:text-amber-300"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal group-hover:bg-amber-400 animate-ping" />
              INSPECT CASE STUDY
            </span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2 text-lg">
              →
            </span>
          </div>
        </div>
      </LiveCard3D>
    </div>
  );
}
