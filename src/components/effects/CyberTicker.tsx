export function CyberTicker() {
  const items = [
    '⚡ FULL STACK DEVELOPER',
    '🧠 AI & DEEP LEARNING RESEARCH',
    '🌐 REACT & TYPESCRIPT',
    '📊 CNN FUSION & COMPUTER VISION',
    '🚀 IBCAST 2025 // IEEE PROCEEDINGS',
    '🔬 ICCOR 2026 PREPRINT',
    '🔐 CNIC CRYPTOGRAPHIC SECURITY',
    '💼 OPEN FOR HIGH-IMPACT OPPORTUNITIES',
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-void/90 py-2.5 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="flex w-max animate-marquee gap-8">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
            <span className="drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
