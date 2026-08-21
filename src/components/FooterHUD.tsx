import { useEffect, useState } from 'react';

export function FooterHUD() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pointer-events-auto border-t border-white/10 bg-void/90 px-6 py-6 font-mono text-xs text-slate-300 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
          <span className="flex items-center gap-2 text-cyan-300 font-bold">
            <span className="h-2 w-2 rounded-full bg-signal animate-ping shadow-[0_0_8px_#38bdf8]" />
            NODE: PKT-ISB
          </span>
          <span className="text-amber-300 font-bold">TIME: {time || '19:24:00'} PKT</span>
          <span className="hidden md:inline text-slate-300 font-semibold">LOCATION: BANNU, PAKISTAN</span>
        </div>

        <div className="flex items-center gap-6 font-bold">
          <span className="text-white">© {new Date().getFullYear()} MUHAMMAD SALMAN</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-cyan-300 hover:text-white hover:underline focus:outline-none transition font-extrabold"
          >
            [ TOP ▲ ]
          </button>
        </div>
      </div>
    </footer>
  );
}
