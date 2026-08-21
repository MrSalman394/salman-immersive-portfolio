import type { SkillCluster } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';
import { Neural3DModel } from './Neural3DModel';
import { useWorldState } from '../../context/WorldStateContext';
import { soundFx } from '../../utils/soundEffects';

interface NeuralInspector3DProps {
  selectedCluster: SkillCluster;
}

export function NeuralInspector3D({ selectedCluster }: NeuralInspector3DProps) {
  const { activeNeuralNode, setActiveNeuralNode } = useWorldState();

  const handleTechHover = (tech: string) => {
    setActiveNeuralNode(tech);
    soundFx.playHover();
  };

  const handleTechLeave = () => {
    setActiveNeuralNode(null);
  };

  return (
    <LiveCard3D
      effectType="cyber-grid"
      accentColor="signal"
      intensity={8}
      showHUDCorners={false}
      className="p-7 sm:p-9 flex flex-col justify-between h-full !bg-[#070c14] border-2 border-white/20 hover:border-signal/70 shadow-2xl rounded-3xl"
    >
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {/* Header HUD Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5 font-mono text-sm sm:text-base text-cyan-300 font-extrabold">
            <span className="h-3 w-3 rounded-full bg-signal animate-ping shadow-[0_0_10px_#38bdf8]" />
            <span className="tracking-wider">
              AI ARCHITECTURE // {selectedCluster.label.toUpperCase()}
            </span>
          </div>
          <span className="rounded-xl border border-amber-400/50 bg-amber-400/15 px-3 py-1 font-mono text-xs sm:text-sm font-extrabold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
            PROFICIENCY: {Math.round(selectedCluster.signal * 100)}%
          </span>
        </div>

        {/* 3D WebGL Neural Core Model */}
        <div className="mt-6" style={{ transform: 'translateZ(40px)' }}>
          <Neural3DModel
            clusterId={selectedCluster.id}
            clusterLabel={selectedCluster.label}
            intensity={selectedCluster.signal}
          />
        </div>

        {/* Interactive Neural Pipeline Flow Diagram */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="mt-6 rounded-2xl bg-[#03060a] p-4 border border-white/10 shadow-inner"
        >
          <div className="flex items-center justify-between font-mono text-[0.68rem] text-slate-300 uppercase tracking-wider mb-2 font-bold">
            <span className="text-cyan-300">INPUT: MULTI-MODAL DATA</span>
            <span className="text-amber-300">PROCESSING: HYBRID CNN</span>
            <span className="text-green-300">OUTPUT: INFERENCE & XAI</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
            <div className="h-full bg-cyan-400 w-1/3 animate-pulse" />
            <div className="h-full bg-amber-400 w-1/3 animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="h-full bg-green-400 w-1/3 animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </div>

        {/* Description */}
        <p
          style={{ transform: 'translateZ(25px)' }}
          className="mt-5 text-base sm:text-lg leading-relaxed text-slate-100 font-normal"
        >
          {selectedCluster.description}
        </p>

        {/* Factual Technical Architecture Grid */}
        <div
          style={{ transform: 'translateZ(35px)' }}
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <div className="rounded-xl border border-signal/30 bg-void/90 p-3 text-center shadow-inner">
            <span className="block font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">ENVIRONMENT</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-cyan-300">CUDA / GPU</span>
          </div>
          <div className="rounded-xl border border-signal/30 bg-void/90 p-3 text-center shadow-inner">
            <span className="block font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">LATENCY</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-amber-300">REAL-TIME</span>
          </div>
          <div className="rounded-xl border border-signal/30 bg-void/90 p-3 text-center shadow-inner">
            <span className="block font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">PARADIGM</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-cyan-300">TRANSFER ML</span>
          </div>
          <div className="rounded-xl border border-signal/30 bg-void/90 p-3 text-center shadow-inner">
            <span className="block font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">EXPLAINABILITY</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-white">GRAD-CAM / XAI</span>
          </div>
        </div>

        {/* Interactive Core Stack Badges */}
        <div className="mt-7" style={{ transform: 'translateZ(30px)' }}>
          <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-cyan-300 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal" />
            SYNAPTIC NODES & FRAMEWORKS
          </h4>
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            {selectedCluster.technologies.map((tech) => {
              const isActive = activeNeuralNode === tech;
              return (
                <button
                  key={tech}
                  onMouseEnter={() => handleTechHover(tech)}
                  onMouseLeave={handleTechLeave}
                  style={{ transform: 'translateZ(20px)' }}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-2 font-mono text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-amber-400 bg-amber-400/30 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-105'
                      : 'border-signal/40 bg-signal/15 text-white hover:scale-105 hover:border-signal hover:bg-signal/25 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isActive ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-signal shadow-[0_0_8px_#38bdf8]'
                    }`}
                  />
                  <span>{tech}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div
        style={{ transform: 'translateZ(20px)' }}
        className="mt-8 border-t border-white/15 pt-4 font-mono text-xs text-slate-400 flex justify-between items-center font-semibold"
      >
        <span className="flex items-center gap-2 text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
          STATUS: VERIFIED PRODUCTION GRADE
        </span>
        <span className="text-cyan-300">LATENCY: OPTIMAL</span>
      </div>
    </LiveCard3D>
  );
}
