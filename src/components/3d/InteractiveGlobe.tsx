import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const InteractiveGlobe: React.FC<{ className?: string }> = ({ className = "w-full h-[400px]" }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<{ title: string; location: string; details: string } | null>({
    title: "Primary Engineering Hub",
    location: "Solapur, Maharashtra (Walchand Institute of Technology)",
    details: "B.Tech AI & Full Stack Research & Development Core"
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Wireframe Holographic Sphere
    const globeGeo = new THREE.SphereGeometry(4, 36, 36);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Outer Atmosphere Glow Ring
    const atmoGeo = new THREE.SphereGeometry(4.25, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x8000ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmoMesh);

    // Global Project Node Pins (lat, lon coordinates converted to 3D sphere vectors)
    const locations = [
      { lat: 17.6599, lon: 75.9064, title: "Primary R&D Hub", location: "Walchand Institute of Technology", details: "Core B.Tech Engineering & System Architecture" },
      { lat: 37.7749, lon: -122.4194, title: "Cloud Deployment Cluster", location: "US West (San Francisco)", details: "Global Server Instance & Gemini API Proxy" },
      { lat: 51.5074, lon: -0.1278, title: "Edge Analytics Gateway", location: "Europe (London)", details: "Multi-Tenant SaaS Support Node" },
      { lat: 35.6762, lon: 139.6503, title: "Computer Vision Cluster", location: "Asia Pacific (Tokyo)", details: "YOLO Edge Vision Ingestion Pipeline" },
      { lat: -33.8688, lon: 151.2093, title: "AI Warehouse Optimization", location: "Australia (Sydney)", details: "PostgreSQL & Scikit-Learn Predictive Model" }
    ];

    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const nodeMarkers: THREE.Mesh[] = [];

    locations.forEach((loc) => {
      const pos = latLonToVector3(loc.lat, loc.lon, 4.05);

      // Node pin geometry
      const pinGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: loc.lat === 17.6599 ? 0x00f0ff : 0x00ff88,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = loc;
      globeGroup.add(pinMesh);
      nodeMarkers.push(pinMesh);

      // Connecting arc lines from Solapur Hub to other locations
      if (loc.lat !== 17.6599) {
        const hubPos = latLonToVector3(17.6599, 75.9064, 4.05);
        const midPos = hubPos.clone().add(pos).multiplyScalar(0.5).normalize().multiplyScalar(5.5);

        const curve = new THREE.QuadraticBezierCurve3(hubPos, midPos, pos);
        const points = curve.getPoints(30);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x00f0ff,
          transparent: true,
          opacity: 0.45,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        globeGroup.add(arcLine);
      }
    });

    // Mouse rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      globeGroup.rotation.y += deltaMove.x * 0.008;
      globeGroup.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (!isDragging) {
        globeGroup.rotation.y += 0.003;
      }

      nodeMarkers.forEach((m, idx) => {
        const scale = 1 + Math.sin(elapsed * 4 + idx) * 0.25;
        m.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      globeGeo.dispose();
      globeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}>
      <div ref={mountRef} className="w-full md:w-2/3 h-[380px] cursor-grab active:cursor-grabbing" />
      
      {/* Node Info Box */}
      <div className="w-full md:w-1/3 bg-black/60 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md text-left shadow-xl shadow-cyan-950/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Global System Deployment
        </div>
        {activeNode && (
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{activeNode.title}</h4>
            <p className="text-xs font-semibold text-purple-400 mb-3">{activeNode.location}</p>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeNode.details}</p>
            <div className="mt-4 pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span>Status: ACTIVE</span>
              <span className="text-emerald-400 font-bold">● 100% HEALTH</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
