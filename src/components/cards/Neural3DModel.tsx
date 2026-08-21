import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Neural3DModelProps {
  clusterId?: string;
  clusterLabel?: string;
  intensity?: number;
}

export function Neural3DModel({
  clusterLabel = 'NEURAL CORE',
  intensity = 0.94,
}: Neural3DModelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all rotating 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Icosahedron Wireframe
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeo, wireframeMat);
    mainGroup.add(icosahedron);

    // 2. Inner Glowing Octahedron
    const octaGeo = new THREE.OctahedronGeometry(0.85, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xf0c674,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    mainGroup.add(octa);

    // 3. Central Energy Core
    const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // 4. Point Cloud Nodes at Vertices
    const vertexCount = icosahedronGeo.attributes.position.count;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(vertexCount * 3);
    const posAttr = icosahedronGeo.attributes.position;

    for (let i = 0; i < vertexCount; i++) {
      nodePositions[i * 3] = posAttr.getX(i);
      nodePositions[i * 3 + 1] = posAttr.getY(i);
      nodePositions[i * 3 + 2] = posAttr.getZ(i);
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);
    mainGroup.add(points);

    // 5. Orbital Ring
    const ringGeo = new THREE.TorusGeometry(1.7, 0.015, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    mainGroup.add(ring);

    // Mouse tracking for parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = mouseX * 1.5;
      targetRotX = mouseY * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = 0;

    const animate = () => {
      clock += 0.015;

      // Smooth rotation with mouse influence
      mainGroup.rotation.y += 0.008;
      mainGroup.rotation.x += 0.004;

      mainGroup.rotation.y += (targetRotY - (mainGroup.rotation.y % (Math.PI * 2))) * 0.05;
      mainGroup.rotation.x += (targetRotX - (mainGroup.rotation.x % (Math.PI * 2))) * 0.05;

      // Inner counter-rotation
      octa.rotation.y -= 0.015;
      octa.rotation.z += 0.01;

      // Core pulsing
      const pulse = 1 + Math.sin(clock * 3) * 0.15 * intensity;
      core.scale.set(pulse, pulse, pulse);

      ring.rotation.z += 0.005;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      icosahedronGeo.dispose();
      wireframeMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [clusterLabel, intensity]);

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border border-signal/20 bg-void/60 backdrop-blur-md">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute bottom-2 left-3 flex items-center gap-2 font-mono text-[0.6rem] text-signal/80">
        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
        <span>3D LATTICE // {clusterLabel.toUpperCase()}</span>
      </div>
      <div className="pointer-events-none absolute top-2 right-3 font-mono text-[0.58rem] text-amberline">
        SYNAPSE: {(intensity * 100).toFixed(1)}%
      </div>
    </div>
  );
}
