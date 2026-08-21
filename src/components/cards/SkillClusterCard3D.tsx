import type { SkillCluster } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';

interface SkillClusterCard3DProps {
  cluster: SkillCluster;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function SkillClusterCard3D({ cluster, isSelected, onSelect, index }: SkillClusterCard3DProps) {
  return (
    <LiveCard3D
      onClick={onSelect}
      effectType={index % 2 === 0 ? 'neural-mesh' : 'wave-flux'}
      accentColor={isSelected ? 'signal' : index % 2 === 0 ? 'signal' : 'amber'}
      intensity={10}
      showHUDCorners={true}
      className={`p-6 transition-all duration-300 border-white/15 ${
        isSelected
          ? 'ring-2 ring-signal bg-signal/20 shadow-[0_0_40px_rgba(56,189,248,0.35)]'
          : 'hover:bg-white/10 hover:border-signal/50'
      }`}
    >
      <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                isSelected ? 'bg-cyan-300 animate-ping shadow-[0_0_10px_#38bdf8]' : 'bg-white/40'
              }`}
            />
            <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-white">
              {cluster.label}
            </span>
          </div>

          <span className="font-mono text-sm sm:text-base text-cyan-300 font-extrabold tracking-wider drop-shadow-[0_0_8px_#38bdf8]">
            {Math.round(cluster.signal * 100)}% SIGNAL
          </span>
        </div>

        {/* Live Animated Frequency Spectrum / Equalizer Bars */}
        <div className="mt-4 flex items-end gap-1.5 h-5">
          {[40, 70, 90, 60, 85, 100, 75, 50, 95, 65, 80, 45].map((heightPct, barIdx) => (
            <div
              key={barIdx}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-signal/50 to-cyan-300 transition-all duration-300 shadow-[0_0_6px_#38bdf8]"
              style={{
                height: isSelected ? `${heightPct}%` : `${heightPct * 0.5}%`,
                animation: isSelected ? `pulse ${0.8 + (barIdx % 4) * 0.2}s ease-in-out infinite alternate` : 'none',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-gradient-to-r from-signal via-amberline to-signal transition-all duration-500 shadow-[0_0_12px_#38bdf8]"
            style={{ width: `${cluster.signal * 100}%` }}
          />
        </div>
      </div>
    </LiveCard3D>
  );
}
