import { useEffect, useRef } from 'react';

export type CanvasEffectType = 'neural-mesh' | 'cyber-grid' | 'quantum-particles' | 'matrix-flow' | 'wave-flux';

interface LiveCardCanvasProps {
  effectType?: CanvasEffectType;
  primaryColor?: string;
  secondaryColor?: string;
  isHovered?: boolean;
  mousePos?: { x: number; y: number }; // Normalized 0..1 relative to card
  opacity?: number;
}

export function LiveCardCanvas({
  effectType = 'neural-mesh',
  primaryColor = '#7dd3fc',
  secondaryColor = '#f0c674',
  isHovered = false,
  mousePos = { x: 0.5, y: 0.5 },
  opacity = 0.45,
}: LiveCardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Effect specific data structures
    const numParticles = effectType === 'quantum-particles' ? 24 : 18;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      pulseSpeed: number;
      color: string;
    }> = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (effectType === 'quantum-particles' ? 0.8 : 0.4),
        vy: (Math.random() - 0.5) * (effectType === 'quantum-particles' ? 0.8 : 0.4),
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.03,
        color: Math.random() > 0.3 ? primaryColor : secondaryColor,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const targetX = mousePos.x * width;
      const targetY = mousePos.y * height;

      if (effectType === 'neural-mesh') {
        // Draw connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * (isHovered ? 1.5 : 1);
          p.y += p.vy * (isHovered ? 1.5 : 1);

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // React slightly to mouse
          if (isHovered) {
            const dx = targetX - p.x;
            const dy = targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 1) {
              p.x += (dx / dist) * 0.6;
              p.y += (dy / dist) * 0.6;
            }
          }

          p.pulse += p.pulseSpeed;
          const currentSize = p.size + Math.sin(p.pulse) * 0.8;

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, currentSize), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = isHovered ? 8 : 4;
          ctx.fill();

          // Connect with other nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 90) {
              const alpha = (1 - dist / 90) * (isHovered ? 0.35 : 0.18);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        // Connecting lines to mouse cursor when hovered
        if (isHovered) {
          for (const p of particles) {
            const dx = targetX - p.x;
            const dy = targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              const alpha = (1 - dist / 100) * 0.45;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(targetX, targetY);
              ctx.strokeStyle = `rgba(240, 198, 116, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      } else if (effectType === 'cyber-grid') {
        // Perspective 3D cyber grid
        const horizonY = height * 0.35;
        const gridLines = 10;
        const speed = (time * 18) % 25;

        ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
        ctx.lineWidth = 1;

        // Horizontal lines moving forward
        for (let i = 0; i < gridLines; i++) {
          const yProgress = Math.pow((i * 25 + speed) / (gridLines * 25), 2.2);
          const y = horizonY + yProgress * (height - horizonY);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = `rgba(125, 211, 252, ${yProgress * (isHovered ? 0.3 : 0.15)})`;
          ctx.stroke();
        }

        // Perspective vertical lines converging to vanishing point
        const vpX = isHovered ? targetX : width * 0.5;
        const vpY = horizonY;
        const vCols = 12;

        for (let i = 0; i <= vCols; i++) {
          const bottomX = (width / vCols) * i;
          ctx.beginPath();
          ctx.moveTo(vpX, vpY);
          ctx.lineTo(bottomX, height);
          ctx.strokeStyle = isHovered ? 'rgba(125, 211, 252, 0.18)' : 'rgba(125, 211, 252, 0.08)';
          ctx.stroke();
        }
      } else if (effectType === 'quantum-particles') {
        // Glowing floating orbs with energetic movement
        for (const p of particles) {
          p.x += p.vx * (isHovered ? 1.8 : 1);
          p.y += p.vy * (isHovered ? 1.8 : 1);

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.pulse += p.pulseSpeed;
          const currentSize = p.size * (1 + Math.sin(p.pulse) * 0.5);

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 4);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.4, p.color === primaryColor ? 'rgba(125, 211, 252, 0.4)' : 'rgba(240, 198, 116, 0.4)');
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (effectType === 'wave-flux') {
        // Multi-frequency glowing sine wave streams
        const waves = 3;
        for (let w = 0; w < waves; w++) {
          ctx.beginPath();
          const baseOffset = (w * Math.PI) / 3;
          const waveColor = w % 2 === 0 ? primaryColor : secondaryColor;

          for (let x = 0; x <= width; x += 4) {
            const normalizedX = x / width;
            const mouseInfluence = isHovered ? Math.sin((normalizedX - mousePos.x) * Math.PI * 2) * 15 : 0;
            const y =
              height * 0.5 +
              Math.sin(normalizedX * 6 + time * 2 + baseOffset) * 18 +
              Math.cos(normalizedX * 3 - time * 1.5) * 10 +
              mouseInfluence;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.strokeStyle = waveColor;
          ctx.lineWidth = isHovered ? 1.5 : 1;
          ctx.shadowColor = waveColor;
          ctx.shadowBlur = isHovered ? 10 : 4;
          ctx.stroke();
        }
      } else if (effectType === 'matrix-flow') {
        // Subtle digital stream nodes
        const columns = 8;
        const colWidth = width / columns;
        for (let i = 0; i < columns; i++) {
          const colX = i * colWidth + colWidth * 0.5;
          const streamSpeed = (time * (20 + i * 5)) % height;
          const alpha = isHovered ? 0.35 : 0.15;

          const grad = ctx.createLinearGradient(colX, streamSpeed - 40, colX, streamSpeed);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(1, i % 2 === 0 ? `rgba(125, 211, 252, ${alpha})` : `rgba(240, 198, 116, ${alpha})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(colX, streamSpeed - 40);
          ctx.lineTo(colX, streamSpeed);
          ctx.stroke();

          // Head spark
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(colX, streamSpeed, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [effectType, primaryColor, secondaryColor, isHovered, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] transition-opacity duration-500"
      style={{ opacity }}
    />
  );
}
