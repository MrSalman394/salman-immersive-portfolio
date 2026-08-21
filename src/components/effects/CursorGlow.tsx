import { useEffect, useRef, useState } from 'react';
import { useWorldState } from '../../context/WorldStateContext';

export function CursorGlow() {
  const { worldState } = useWorldState();
  const glowRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const animate = () => {
      // Smooth interpolation for primary glow
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      // Trailing interpolation for the outer ring
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  // Clean up old ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 700);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isVisible) return null;

  // State-aware coloring
  const isGold = worldState === 'PROJECTS' || worldState === 'CONTACT';
  const isPurple = worldState === 'AI_CORE';

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* State-Aware Soft Ambient Radiant Aura Light */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full will-change-transform transition-all duration-700"
        style={{
          background: isGold
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, rgba(56, 189, 248, 0.02) 40%, transparent 65%)'
            : isPurple
              ? 'radial-gradient(circle, rgba(192, 132, 252, 0.09) 0%, rgba(56, 189, 248, 0.03) 40%, transparent 65%)'
              : 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(251, 191, 36, 0.02) 40%, transparent 65%)',
          filter: 'blur(28px)',
        }}
      />

      {/* State-Aware Outer Floating Subtle Energy Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none absolute h-10 w-10 rounded-full border will-change-transform opacity-45 transition-colors duration-500 ${
          isGold
            ? 'border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
            : isPurple
              ? 'border-purple-400/50 shadow-[0_0_12px_rgba(192,132,252,0.35)]'
              : 'border-signal/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
        }`}
      />

      {/* Click Shockwave Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className={`pointer-events-none absolute rounded-full border-2 animate-ping ${
            isGold ? 'border-amber-300' : isPurple ? 'border-purple-300' : 'border-cyan-300'
          }`}
          style={{
            left: r.x,
            top: r.y,
            width: '52px',
            height: '52px',
            transform: 'translate(-50%, -50%)',
            animationDuration: '600ms',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          }}
        />
      ))}
    </div>
  );
}
