import React, { useState, useRef, useEffect } from 'react';
import { profile } from '../../data/profile';
import { LiveCard3D } from './LiveCard3D';
import { soundFx } from '../../utils/soundEffects';
import { useWorldState } from '../../context/WorldStateContext';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export function TerminalCard3D() {
  const { setWorldState, triggerWarpPulse, toggleBuildMode } = useWorldState();
  const [terminalInput, setTerminalInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'SALMAN // DIGITAL CORE TERMINAL v5.2.0', type: 'system' },
    { text: 'Type "help" to inspect system commands or try "build", "whoami", "ai", "projects".', type: 'output' },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playClick();
    const newLines: TerminalLine[] = [...lines, { text: `salman@node:~$ ${cmd}`, type: 'input' }];

    switch (cmd) {
      case 'help':
        newLines.push(
          { text: 'AVAILABLE 3D CINEMATIC COMMANDS:', type: 'system' },
          { text: '  whoami         - Identity anchor & current academic status', type: 'output' },
          { text: '  about          - Engineering bio & focus areas', type: 'output' },
          { text: '  build          - Toggle Technical System Blueprint (Build Mode)', type: 'success' },
          { text: '  projects       - Travel to Physical 3D Project Universe', type: 'output' },
          { text: '  ai / skills    - Activate 3D Neural Synapse Lattice', type: 'output' },
          { text: '  research       - Travel to Research Observatory (IBCAST / ICCoR)', type: 'output' },
          { text: '  journey        - Travel to Chronological Timeline (2023 - 2027)', type: 'output' },
          { text: '  stack          - List verified technologies & frameworks', type: 'output' },
          { text: '  github         - View verified GitHub repository profile', type: 'output' },
          { text: '  contact        - Focus on Quantum Singularity Portal & Channels', type: 'output' },
          { text: '  warp / matrix  - Trigger 3D Hyperspace Particle Surge', type: 'success' },
          { text: '  clear          - Clear terminal output history', type: 'output' },
        );
        break;
      case 'whoami':
        newLines.push(
          { text: 'MUHAMMAD SALMAN', type: 'success' },
          { text: 'Role: Full Stack Developer & AI Researcher', type: 'output' },
          { text: 'Education: BS Software Engineering, University of Wah (Expected 2027)', type: 'output' },
          { text: 'Location: Bannu, Khyber Pakhtunkhwa, Pakistan', type: 'output' },
        );
        break;
      case 'about':
        newLines.push(
          { text: profile.statement, type: 'output' },
        );
        break;
      case 'build':
      case 'buildmode':
      case 'blueprint':
        toggleBuildMode();
        newLines.push({ text: 'TOGGLING SYSTEM ARCHITECTURE BLUEPRINT (BUILD MODE)...', type: 'success' });
        break;
      case 'hero':
      case 'system':
        setWorldState('HERO');
        scrollTo('hero');
        newLines.push({ text: 'NAVIGATING CAMERA TO 3D HERO COCKPIT...', type: 'system' });
        break;
      case 'projects':
        setWorldState('PROJECTS');
        scrollTo('projects');
        newLines.push(
          { text: 'TRAVELING TO 3D PROJECT UNIVERSE...', type: 'system' },
          { text: '★ NexusHireConnect (AI Career Matching Engine - Full Stack)', type: 'success' },
          { text: '★ ElectraSuite Voting System (CNIC Verified Cryptographic Ballot)', type: 'success' },
          { text: '★ E-Commerce Web (Cloud Full-Stack Portal)', type: 'success' },
        );
        break;
      case 'ai':
      case 'skills':
      case 'neural':
        setWorldState('AI_CORE');
        scrollTo('skills');
        newLines.push(
          { text: 'ACTIVATING 3D NEURAL SYNAPSE ARCHITECTURE...', type: 'system' },
          { text: '• Deep Transfer Learning, CNN Fusion, PyTorch, Computer Vision', type: 'output' },
          { text: '• Full Stack: React, TypeScript, Node.js, Laravel, PostgreSQL', type: 'output' },
        );
        break;
      case 'research':
      case 'publications':
        setWorldState('RESEARCH');
        scrollTo('research');
        newLines.push(
          { text: 'MORPHING WORLD TO RESEARCH OBSERVATORY...', type: 'system' },
          { text: '1. Towards Transparent Bone Fracture Detection (22nd IBCAST 2025, Murree)', type: 'success' },
          { text: '2. Deep Transfer Learning with Hybrid CNN Fusion for Tomato Leaf Disease (ICCoR 2026)', type: 'success' },
        );
        break;
      case 'journey':
      case 'experience':
        setWorldState('JOURNEY');
        scrollTo('experience');
        newLines.push({ text: 'TRAVELING ALONG CHRONOLOGICAL TIMELINE (2023 - 2027)...', type: 'system' });
        break;
      case 'stack':
        newLines.push(
          { text: '• Languages: Python, JavaScript, TypeScript, C, C++, Java, PHP, HTML, CSS', type: 'output' },
          { text: '• Frameworks: React.js, Node.js, Express.js, Laravel, Tailwind CSS', type: 'output' },
          { text: '• AI & Data: PyTorch, TensorFlow, Computer Vision, PostgreSQL, MySQL', type: 'output' },
          { text: '• Tools: Git, GitHub, VS Code, LaTeX, XAMPP', type: 'output' },
        );
        break;
      case 'github':
        newLines.push(
          { text: `GITHUB: ${profile.github}`, type: 'success' },
        );
        break;
      case 'warp':
      case 'matrix':
        triggerWarpPulse();
        newLines.push(
          { text: 'INITIALIZING 3D HYPERSPACE WARP PULSE...', type: 'system' },
          { text: '3D HYPERSPACE ACCELERATION ACTIVE // FLUX STABLE', type: 'success' },
        );
        break;
      case 'contact':
      case 'email':
        setWorldState('CONTACT');
        scrollTo('contact');
        navigator.clipboard.writeText(profile.email);
        newLines.push(
          { text: `EMAIL: ${profile.email} (COPIED TO CLIPBOARD)`, type: 'success' },
          { text: `PHONE: ${profile.phone}`, type: 'output' },
          { text: `LOCATION: ${profile.location}`, type: 'output' },
          { text: `GITHUB: ${profile.github}`, type: 'output' },
          { text: `LINKEDIN: ${profile.linkedin}`, type: 'output' },
        );
        break;
      case 'clear':
        setLines([]);
        setTerminalInput('');
        return;
      default:
        newLines.push({
          text: `Command not recognized: "${cmd}". Type "help" for options.`,
          type: 'error',
        });
        break;
    }

    setLines(newLines);
    setTerminalInput('');
  };

  return (
    <LiveCard3D
      effectType="matrix-flow"
      accentColor="signal"
      intensity={8}
      showHUDCorners={false}
      className="p-6 sm:p-8 flex flex-col justify-between h-full !bg-[#070c14] border-2 border-white/20 hover:border-signal/70 shadow-2xl rounded-3xl"
    >
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-sm text-slate-300">
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full bg-red-500 inline-block shadow-[0_0_10px_#ef4444]" />
            <span className="h-3.5 w-3.5 rounded-full bg-yellow-500 inline-block animate-pulse shadow-[0_0_10px_#eab308]" />
            <span className="h-3.5 w-3.5 rounded-full bg-green-500 inline-block shadow-[0_0_10px_#22c55e]" />
            <span className="ml-2 font-extrabold text-cyan-300">salman@node:~</span>
          </div>
          <span className="text-xs text-cyan-300 font-extrabold tracking-widest">
            3D BASH 5.2 // LIVE
          </span>
        </div>

        {/* Scrollable Terminal Screen */}
        <div
          ref={scrollRef}
          style={{ transform: 'translateZ(20px)' }}
          className="mt-5 min-h-[280px] max-h-[360px] overflow-y-auto font-mono text-sm leading-relaxed space-y-2.5 p-4 bg-black/80 rounded-2xl border border-white/10 shadow-inner"
        >
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.type === 'error'
                  ? 'text-red-400 font-semibold'
                  : line.type === 'success'
                    ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                    : line.type === 'input'
                      ? 'text-cyan-300 font-extrabold'
                      : line.type === 'system'
                        ? 'text-cyan-200 font-bold'
                        : 'text-slate-200 font-medium'
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Interactive CLI Input */}
        <form
          onSubmit={handleCommand}
          style={{ transform: 'translateZ(25px)' }}
          className="mt-5 border-t border-white/15 pt-4 flex items-center gap-3"
        >
          <span className="font-mono text-xs sm:text-sm text-cyan-300 font-extrabold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
            salman@node:~$
          </span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="type help, whoami, build, stack, ai..."
            className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            type="submit"
            className="rounded-xl border-2 border-signal/60 bg-signal/20 px-4 py-1.5 font-mono text-xs sm:text-sm font-extrabold text-cyan-200 hover:bg-signal hover:text-black transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            RUN ↵
          </button>
        </form>
      </div>
    </LiveCard3D>
  );
}
