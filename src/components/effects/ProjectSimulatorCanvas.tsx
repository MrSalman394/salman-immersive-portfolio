import { useEffect, useRef } from 'react';

interface ProjectSimulatorCanvasProps {
  projectId: string;
  isHovered: boolean;
}

export function ProjectSimulatorCanvas({ projectId, isHovered }: ProjectSimulatorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    let frameId: number;
    let time = 0;

    // Simulation nodes
    const nodes = Array.from({ length: 8 }, (_, i) => ({
      x: (width / 9) * (i + 1),
      y: height * 0.5 + (Math.random() - 0.5) * (height * 0.4),
      vy: (Math.random() - 0.5) * 0.6,
      size: 3 + Math.random() * 3,
      color: i % 2 === 0 ? '#38bdf8' : '#fbbf24',
    }));

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      if (projectId === 'nexushireconnect') {
        // AI Neural Matching Pipeline Simulation
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;

        // Draw central neural hub
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        // Connecting lines to outer nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.y += Math.sin(time * 2 + i) * 0.4;

          const matchPulse = Math.sin(time * 3 + i) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = isHovered
            ? `rgba(56, 189, 248, ${0.2 + matchPulse * 0.6})`
            : `rgba(56, 189, 248, 0.25)`;
          ctx.lineWidth = isHovered ? 1.5 : 1;
          ctx.stroke();

          // Outer node
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = isHovered ? 10 : 4;
          ctx.fill();
        }

        // Central AI Match Core
        const corePulse = 10 + Math.sin(time * 4) * 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, corePulse, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#38bdf8' : '#fbbf24';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        ctx.fill();
      } else if (projectId === 'electrasuite-voting') {
        // Cryptographic Security & Biometric Shield Simulation
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        // Concentric Security Rings
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          const radius = r * 22 + Math.sin(time * 2 + r) * 3;
          ctx.arc(centerX, centerY, radius, time * (r % 2 === 0 ? 1 : -1), time * (r % 2 === 0 ? 1 : -1) + Math.PI * 1.5);
          ctx.strokeStyle = r === 1 ? '#38bdf8' : r === 2 ? '#fbbf24' : '#4ade80';
          ctx.lineWidth = 2;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = isHovered ? 12 : 6;
          ctx.stroke();
        }

        // Scanning vertical bar
        const scanY = centerY + Math.sin(time * 3) * 30;
        ctx.beginPath();
        ctx.moveTo(centerX - 40, scanY);
        ctx.lineTo(centerX + 40, scanY);
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 10;
        ctx.stroke();
      } else {
        // High-Speed Data Stream & Cloud Wave
        ctx.beginPath();
        for (let x = 0; x < width; x += 5) {
          const y = height * 0.5 + Math.sin(x * 0.05 + time * 3) * 18 + Math.cos(x * 0.02 - time) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isHovered ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = isHovered ? 12 : 4;
        ctx.stroke();

        // Data packets flowing along the wave
        for (let i = 0; i < 3; i++) {
          const packetX = ((time * 80 + i * 90) % width);
          const packetY = height * 0.5 + Math.sin(packetX * 0.05 + time * 3) * 18 + Math.cos(packetX * 0.02 - time) * 10;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : '#ffffff';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 10;
          ctx.fill();
        }
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [projectId, isHovered]);

  return (
    <div className="relative w-full h-24 overflow-hidden rounded-xl bg-black/60 border border-white/10 my-4 shadow-inner">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="pointer-events-none absolute bottom-1.5 right-2 font-mono text-[0.62rem] text-cyan-300 font-extrabold flex items-center gap-1.5 drop-shadow-[0_0_6px_#38bdf8]">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-ping" />
        <span>LIVE SIMULATOR</span>
      </div>
    </div>
  );
}
