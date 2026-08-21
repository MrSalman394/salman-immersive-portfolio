import type { SkillCluster } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';

interface HeroMicroCard3DProps {
  cluster: SkillCluster;
  index: number;
}

export function HeroMicroCard3D({ cluster, index }: HeroMicroCard3DProps) {
  return (
    <LiveCard3D
      effectType="quantum-particles"
      accentColor={index % 2 === 0 ? 'signal' : 'amber'}
      intensity={15}
      showHUDCorners={false}
      showScanline={true}
      className="p-4 backdrop-blur-md min-w-[155px] transition-all duration-300 border-white/15 hover:border-signal/60"
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-signal transition-colors">
            {cluster.label}
          </span>
          <span className="font-mono text-xs sm:text-sm font-extrabold text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]">
            {Math.round(cluster.signal * 100)}%
          </span>
        </div>

        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-gradient-to-r from-signal via-amberline to-signal transition-all duration-500 shadow-[0_0_10px_#38bdf8]"
            style={{ width: `${cluster.signal * 100}%` }}
          />
        </div>
      </div>
    </LiveCard3D>
  );
}
