import { useEffect, useState } from 'react';
import type { SectionId } from '../hooks/useActiveSection';
import { profile } from '../data/profile';
import { soundFx } from '../utils/soundEffects';
import { useWorldState } from '../context/WorldStateContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const { toggleBuildMode } = useWorldState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNav = (id: SectionId) => {
    soundFx.playClick();
    onClose();
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const COMMANDS = [
    { label: '🚀 Go to Hero // System Deck', category: 'Navigation', action: () => handleNav('hero') },
    { label: '📦 View Project Universe', category: 'Navigation', action: () => handleNav('projects') },
    { label: '🧠 View AI & Engineering Skills', category: 'Navigation', action: () => handleNav('skills') },
    { label: '🔬 View Research Observatory (IBCAST & ICCoR)', category: 'Navigation', action: () => handleNav('research') },
    { label: '⏱️ View Chronological Journey Timeline', category: 'Navigation', action: () => handleNav('experience') },
    { label: '⚡ Connect & Contact Terminal', category: 'Navigation', action: () => handleNav('contact') },
    {
      label: '🛠️ Toggle System Architecture Blueprint (Build Mode)',
      category: 'Engineering',
      action: () => {
        soundFx.playClick();
        toggleBuildMode();
        onClose();
      },
    },
    {
      label: '📄 Download CV (PDF)',
      category: 'Candidate Info',
      action: () => {
        soundFx.playClick();
        window.open('/salman-cv.pdf', '_blank');
        onClose();
      },
    },
    {
      label: `📋 Copy Contact Email (${profile.email})`,
      category: 'Contact',
      action: () => {
        soundFx.playClick();
        navigator.clipboard.writeText(profile.email);
        onClose();
      },
    },
    {
      label: `📞 Copy Phone Number (${profile.phone})`,
      category: 'Contact',
      action: () => {
        soundFx.playClick();
        navigator.clipboard.writeText(profile.phone);
        onClose();
      },
    },
    {
      label: '↗ Open GitHub Profile (github.com/MrSalman394)',
      category: 'Links',
      action: () => {
        soundFx.playClick();
        window.open(profile.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      label: '↗ Open LinkedIn Profile (linkedin.com/in/muhammad-salman)',
      category: 'Links',
      action: () => {
        soundFx.playClick();
        window.open(profile.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filtered = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-auto flex items-start justify-center pt-20 sm:pt-28 bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border-2 border-cyan-400/40 bg-[#060a12]/95 shadow-[0_0_50px_rgba(56,189,248,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-white/10 px-5 py-4">
          <span className="font-mono text-sm text-cyan-300 mr-3 font-bold">⌘K</span>
          <input
            type="text"
            autoFocus
            placeholder="Type a command (e.g. cv, github, projects, build, email)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="font-mono text-xs text-slate-400 hover:text-cyan-300 border border-white/10 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2.5 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-slate-400">No matching commands found</div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={i}
                onClick={cmd.action}
                className="w-full text-left px-4 py-3 rounded-xl font-mono text-xs sm:text-sm text-slate-200 hover:bg-cyan-400/15 hover:text-cyan-200 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[0.65rem] uppercase tracking-wider text-slate-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {cmd.category}
                  </span>
                  <span>{cmd.label}</span>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-cyan-300 font-bold">EXECUTE ↵</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
