import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Brain3D: React.FC<{ className?: string }> = ({ className = "w-full h-[400px]" }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for brain structure
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // Generate Brain shape points (2 hemispheres)
    const nodeCount = 180;
    const nodes: THREE.Vector3[] = [];
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < nodeCount; i++) {
      const isLeft = Math.random() > 0.5;
      const xOffset = isLeft ? -0.8 : 0.8;
      
      const u = Math.random() * Math.PI;
      const v = Math.random() * Math.PI * 2;
      const radius = 3.2 + (Math.random() - 0.5) * 1.2;

      const x = radius * Math.sin(u) * Math.cos(v) + xOffset;
      const y = radius * Math.cos(u) * 0.85;
      const z = radius * Math.sin(u) * Math.sin(v) * 0.8;

      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Node Points Mesh
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);

    const color1 = new THREE.Color(0x00f0ff); // Electric cyan
    const color2 = new THREE.Color(0x8000ff); // Purple

    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(geometry, pMaterial);
    brainGroup.add(pointCloud);

    // Neural Synapse Lines (connecting close nodes)
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.9) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);

          const c = i % 2 === 0 ? color1 : color2;
          lineColors.push(c.r, c.g, c.b);
          lineColors.push(c.r, c.g, c.b);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    brainGroup.add(lines);

    // Outer Holographic Energy Ring
    const ringGeo = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    brainGroup.add(ring);

    // Outer Orbiting Satellites / Tech Spheres
    const orbiterGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.SphereGeometry(0.18, 12, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0x8000ff,
        wireframe: true,
      });
      const orbiter = new THREE.Mesh(geo, mat);
      const angle = (i / 8) * Math.PI * 2;
      orbiter.position.set(Math.cos(angle) * 5.8, Math.sin(angle) * 2.2, Math.sin(angle) * 4.5);
      orbiterGroup.add(orbiter);
    }
    brainGroup.add(orbiterGroup);

    // Mouse interactive rotation
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = y * 0.4;
      targetY = x * 0.6;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth brain rotation
      brainGroup.rotation.y += 0.006;
      brainGroup.rotation.x += (targetX - brainGroup.rotation.x) * 0.05;
      brainGroup.rotation.z += (targetY * 0.3 - brainGroup.rotation.z) * 0.05;

      ring.rotation.z = elapsedTime * 0.3;
      orbiterGroup.rotation.y = -elapsedTime * 0.5;

      // Pulsing material opacity
      lineMaterial.opacity = 0.2 + Math.sin(elapsedTime * 3) * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      lineGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-cyan-400/60 uppercase pointer-events-none flex items-center gap-1.5 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        Interactive 3D Neural Cortex Engine
      </div>
    </div>
  );
};
