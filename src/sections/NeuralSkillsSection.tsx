import { useState } from 'react';
import { skillClusters, type SkillCluster } from '../data/profile';
import { SkillClusterCard3D } from '../components/cards/SkillClusterCard3D';
import { NeuralInspector3D } from '../components/cards/NeuralInspector3D';
import { TextScramble } from '../components/effects/TextScramble';
import { soundFx } from '../utils/soundEffects';

export function NeuralSkillsSection() {
  const [selectedCluster, setSelectedCluster] = useState<SkillCluster>(skillClusters[0]);

  const handleSelectCluster = (cluster: SkillCluster) => {
    soundFx.playClick();
    setSelectedCluster(cluster);
  };

  return (
    <section
      data-section-id="skills"
      className="relative min-h-screen px-5 py-28 sm:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-1 w-10 bg-signal rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span>02 // NEURAL CAPABILITIES</span>
          </div>
          <div className="font-display text-balance text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.35)] cursor-pointer">
            <TextScramble text="TECHNICAL MATRIX & SKILL LATTICE" as="h2" hoverSound={true} />
          </div>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
            Engineered competencies across full-stack web platforms, relational databases, deep transfer learning, and computer vision research.
          </p>
        </div>

        {/* 3D Interactive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Skill Selector List (Left 5 Cols) */}
          <div className="space-y-4 lg:col-span-5 flex flex-col justify-between">
            {skillClusters.map((cluster, idx) => (
              <SkillClusterCard3D
                key={cluster.id}
                cluster={cluster}
                isSelected={selectedCluster.id === cluster.id}
                onSelect={() => handleSelectCluster(cluster)}
                index={idx}
              />
            ))}
          </div>

          {/* Detailed Skill Inspector (Right 7 Cols) */}
          <div className="lg:col-span-7 h-full">
            <NeuralInspector3D selectedCluster={selectedCluster} />
          </div>
        </div>
      </div>
    </section>
  );
}
