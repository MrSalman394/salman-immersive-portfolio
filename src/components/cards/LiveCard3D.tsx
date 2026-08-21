import React, { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LiveCardCanvas, type CanvasEffectType } from './LiveCardCanvas';
import { soundFx } from '../../utils/soundEffects';

interface LiveCard3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  effectType?: CanvasEffectType;
  accentColor?: 'signal' | 'amber' | 'cyan' | 'purple';
  intensity?: number; // Tilt strength: default 8
  showHUDCorners?: boolean;
  showScanline?: boolean;
  showSpotlight?: boolean;
  badge?: string;
  disableCanvas?: boolean;
}

export function LiveCard3D({
  children,
  className = '',
  onClick,
  effectType = 'neural-mesh',
  accentColor = 'signal',
  intensity = 8,
  showHUDCorners = true,
  showScanline = true,
  showSpotlight = true,
  badge,
  disableCanvas = false,
}: LiveCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;

    x.set(normalizedX - 0.5);
    y.set(normalizedY - 0.5);
    setMousePos({ x: normalizedX, y: normalizedY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  const handleClick = () => {
    soundFx.playClick();
    if (onClick) {
      onClick();
    }
  };

  const getAccentBorder = () => {
    switch (accentColor) {
      case 'amber':
        return isHovered
          ? 'border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.3)]'
          : 'border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.08)]';
      case 'purple':
        return isHovered
          ? 'border-purple-400/80 shadow-[0_0_35px_rgba(192,132,252,0.3)]'
          : 'border-purple-400/30 shadow-[0_0_15px_rgba(192,132,252,0.08)]';
      default:
        return isHovered
          ? 'border-signal/80 shadow-[0_0_35px_rgba(56,189,248,0.3)]'
          : 'border-white/15 shadow-[0_0_15px_rgba(56,189,248,0.06)]';
    }
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
        className={`group relative rounded-2xl border bg-[#06090e]/95 transition-colors duration-300 ${getAccentBorder()} ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* Background Layer (Canvas & Spotlight) - Separated from text layer to ensure razor-sharp text */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          {/* Live Interactive Background Canvas */}
          {!disableCanvas && (
            <LiveCardCanvas
              effectType={effectType}
              primaryColor={accentColor === 'amber' ? '#fbbf24' : '#38bdf8'}
              secondaryColor={accentColor === 'amber' ? '#38bdf8' : '#fbbf24'}
              isHovered={isHovered}
              mousePos={mousePos}
              opacity={isHovered ? 0.35 : 0.18}
            />
          )}

          {/* Dynamic Cursor Spotlight */}
          {showSpotlight && isHovered && (
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(350px circle at ${mousePos.x * 100}% ${
                  mousePos.y * 100
                }%, ${
                  accentColor === 'amber' ? 'rgba(251,191,36,0.12)' : 'rgba(56,189,248,0.12)'
                }, transparent 75%)`,
              }}
            />
          )}

          {/* Laser Scanline sweep on hover */}
          {showScanline && isHovered && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-signal/15 to-transparent animate-scanline" />
            </div>
          )}
        </div>

        {/* HUD Sci-Fi Corner Markers */}
        {showHUDCorners && (
          <div className="pointer-events-none absolute inset-0 z-20">
            <span className="absolute top-2 left-2 font-mono text-xs text-signal/50 group-hover:text-cyan-300 transition-colors font-bold">
              ┌
            </span>
            <span className="absolute top-2 right-2 font-mono text-xs text-signal/50 group-hover:text-cyan-300 transition-colors font-bold">
              ┐
            </span>
            <span className="absolute bottom-2 left-2 font-mono text-xs text-signal/50 group-hover:text-cyan-300 transition-colors font-bold">
              └
            </span>
            <span className="absolute bottom-2 right-2 font-mono text-xs text-signal/50 group-hover:text-cyan-300 transition-colors font-bold">
              ┘
            </span>
          </div>
        )}

        {/* Optional Holographic Badge */}
        {badge && (
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="absolute -top-3 right-4 z-30 rounded-full border border-signal/80 bg-void px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
          >
            {badge}
          </div>
        )}

        {/* Crisp Text & Foreground Content Container */}
        <div
          style={{
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
          className="relative z-10 h-full text-rendering-optimize"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
