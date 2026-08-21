import { useEffect, useState } from 'react';
import { LiveCard3D } from '../cards/LiveCard3D';

interface MetricItem {
  id: string;
  targetNum: number;
  suffix: string;
  padZero: boolean;
  isYear?: boolean;
  label: string;
  sublabel: string;
  color: 'cyan' | 'amber';
}

const METRICS: MetricItem[] = [
  {
    id: 'systems',
    targetNum: 5,
    suffix: '+',
    padZero: true,
    label: 'ENGINEERED SYSTEMS',
    sublabel: 'Full Stack & AI Applications',
    color: 'cyan',
  },
  {
    id: 'research',
    targetNum: 2,
    suffix: '',
    padZero: true,
    label: 'RESEARCH WORKS',
    sublabel: 'IBCAST 2025 & ICCoR 2026',
    color: 'amber',
  },
  {
    id: 'technologies',
    targetNum: 6,
    suffix: '+',
    padZero: true,
    label: 'CORE TECHNOLOGIES',
    sublabel: 'Python, React, TS, Java & Cloud',
    color: 'cyan',
  },
  {
    id: 'graduation',
    targetNum: 2027,
    suffix: '',
    padZero: false,
    isYear: true,
    label: 'GRADUATION TARGET',
    sublabel: 'BS Software Engineering, UW',
    color: 'amber',
  },
];

export function HeroStatsStrip() {
  const [displayValues, setDisplayValues] = useState<{ [key: string]: string }>({
    systems: '00+',
    research: '00',
    technologies: '00+',
    graduation: '20--',
  });

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.05;
      if (progress >= 1) {
        setDisplayValues({
          systems: '05+',
          research: '02',
          technologies: '06+',
          graduation: '2027',
        });
        clearInterval(interval);
      } else {
        const ease = 1 - Math.pow(1 - progress, 3);
        const curSys = Math.min(5, Math.floor(5 * ease));
        const curRes = Math.min(2, Math.floor(2 * ease));
        const curTech = Math.min(6, Math.floor(6 * ease));

        // Rapid cinematic reveal for year: 20 -> 202 -> 2027
        let yearStr = '20--';
        if (progress > 0.65) {
          yearStr = '2027';
        } else if (progress > 0.35) {
          yearStr = '202-';
        } else {
          yearStr = '20--';
        }

        setDisplayValues({
          systems: `${String(curSys).padStart(2, '0')}+`,
          research: String(curRes).padStart(2, '0'),
          technologies: `${String(curTech).padStart(2, '0')}+`,
          graduation: yearStr,
        });
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-8">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {METRICS.map((metric, idx) => (
          <LiveCard3D
            key={metric.id}
            effectType={idx % 2 === 0 ? 'cyber-grid' : 'neural-mesh'}
            accentColor={metric.color === 'amber' ? 'amber' : 'signal'}
            intensity={6}
            showHUDCorners={false}
            showScanline={false}
            className="p-5 sm:p-6 text-center !bg-[#070c14] border-2 border-white/15 hover:border-signal/60 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    metric.color === 'amber'
                      ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                      : 'bg-cyan-300 shadow-[0_0_8px_#38bdf8]'
                  } animate-pulse`}
                />
                <span
                  className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
                    metric.color === 'amber'
                      ? 'text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                      : 'text-cyan-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  }`}
                >
                  {displayValues[metric.id]}
                </span>
              </div>

              <h4 className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white">
                {metric.label}
              </h4>
              <p className="mt-1 font-mono text-[0.68rem] text-slate-300 font-medium">
                {metric.sublabel}
              </p>
            </div>
          </LiveCard3D>
        ))}
      </div>
    </div>
  );
}
