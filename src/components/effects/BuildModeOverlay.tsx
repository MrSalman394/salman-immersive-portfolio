import { useWorldState } from '../../context/WorldStateContext';
import { soundFx } from '../../utils/soundEffects';

export function BuildModeOverlay() {
  const { isBuildMode, toggleBuildMode } = useWorldState();

  if (!isBuildMode) return null;

  const candidateStack = [
    {
      title: '// CORE LANGUAGES',
      color: '#38bdf8',
      items: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'Java', 'PHP', 'HTML5', 'CSS3'],
    },
    {
      title: '// FULL-STACK & WEB PLATFORMS',
      color: '#4ade80',
      items: ['React.js', 'Node.js', 'Express.js', 'Laravel (PHP)', 'RESTful APIs', 'WordPress'],
    },
    {
      title: '// RELATIONAL DATABASES',
      color: '#fbbf24',
      items: ['PostgreSQL', 'MySQL', 'Relational Schema Design', 'Query Optimization'],
    },
    {
      title: '// ARTIFICIAL INTELLIGENCE & RESEARCH',
      color: '#c084fc',
      items: ['PyTorch', 'Deep Transfer Learning', 'Hybrid CNN Fusion', 'Computer Vision', 'Grad-CAM XAI'],
    },
    {
      title: '// CORE TOOLS & METHODOLOGIES',
      color: '#94a3b8',
      items: ['Git & GitHub', 'VS Code', 'LaTeX (Overleaf)', 'XAMPP Server', 'Object-Oriented Programming (OOP)'],
    },
    {
      title: '// ACADEMIC & RESEARCH FOUNDATIONS',
      color: '#38bdf8',
      items: ['BS Software Engineering (Univ of Wah)', '22nd IBCAST 2025 (Published)', 'ICCoR 2026 (Accepted Preprint)'],
    },
  ];

  const portfolioEngineStack = [
    {
      title: '// 3D WEBGL GRAPHICS PIPELINE',
      items: ['Three.js (WebGL 2.0)', '@react-three/fiber', '@react-three/drei', 'Custom GLSL Fragment/Vertex Shaders', 'Postprocessing (Bloom, Vignette)'],
    },
    {
      title: '// APPLICATION & STATE RUNTIME',
      items: ['React 18', 'TypeScript', 'Vite 6', 'Framer Motion (Spring Physics)', 'WorldState Context Engine'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-[#03070d]/90 backdrop-blur-md overflow-y-auto p-5 sm:p-10 animate-fade-in">
      {/* Blueprint Grid Lines Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-cyan-400/40 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
              </span>
              <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-cyan-300">
                SYSTEM ARCHITECTURE BLUEPRINT // BUILD MODE
              </span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              ENGINEERING MATRIX & ARCHITECTURE
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              toggleBuildMode();
            }}
            className="flex items-center gap-2 rounded-2xl border-2 border-cyan-400 bg-cyan-400/20 px-6 py-3 font-mono text-xs sm:text-sm font-extrabold uppercase text-cyan-200 hover:bg-cyan-400 hover:text-black shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-200"
          >
            <span>✕ EXIT BUILD MODE</span>
          </button>
        </div>

        {/* Section 1: Candidate Technical Stack */}
        <div className="mt-8">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.24em] text-cyan-300 border-b border-white/10 pb-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span>1. MY CORE TECH STACK (VERIFIED FROM CV)</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {candidateStack.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border-2 border-cyan-400/30 bg-[#060b14]/90 p-5 shadow-xl backdrop-blur-xl transition hover:border-cyan-400/70"
              >
                <h3 className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300 border-b border-white/10 pb-2.5">
                  {cat.title}
                </h3>
                <div className="mt-3.5 space-y-2">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 font-mono text-xs text-slate-200 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: This Portfolio's 3D Engine Stack */}
        <div className="mt-10">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.24em] text-amber-300 border-b border-white/10 pb-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
            <span>2. THIS PORTFOLIO'S 3D ARCHITECTURE & ENGINE</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {portfolioEngineStack.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border-2 border-amber-400/30 bg-[#060a12]/90 p-5 shadow-xl backdrop-blur-xl transition hover:border-amber-400/70"
              >
                <h3 className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300 border-b border-white/10 pb-2.5">
                  {cat.title}
                </h3>
                <div className="mt-3.5 space-y-2">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 font-mono text-xs text-slate-200 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Data Flow Blueprint */}
        <div className="mt-10 rounded-2xl border-2 border-cyan-400/40 bg-[#050912]/95 p-6 sm:p-8">
          <h3 className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.24em] text-cyan-300 mb-4">
            // DATA FLOW ARCHITECTURE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs text-center">
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-cyan-300">
              <span className="block font-bold">1. CLIENT LAYER</span>
              <span className="text-[0.7rem] text-slate-300 mt-1 block">React + TS + Three.js</span>
            </div>
            <div className="p-4 rounded-xl bg-green-950/40 border border-green-400/40 text-green-300">
              <span className="block font-bold">2. STATE CONTROLLER</span>
              <span className="text-[0.7rem] text-slate-300 mt-1 block">WorldState Context</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-400/40 text-amber-300">
              <span className="block font-bold">3. 3D WEBGL CORE</span>
              <span className="text-[0.7rem] text-slate-300 mt-1 block">SalmanCore Morphing</span>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-400/40 text-purple-300">
              <span className="block font-bold">4. AI & DATA ENGINES</span>
              <span className="text-[0.7rem] text-slate-300 mt-1 block">PyTorch / Postgres</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
