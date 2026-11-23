import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import HolographicAvatar from './components/hero/HolographicAvatar';
import HolographicPlatform from './components/hero/HolographicPlatform';
import PerspectiveGridFloor from './components/hero/PerspectiveGridFloor';
import HologramParticles from './components/hero/HologramParticles';

function SceneCameraRig({ reducedMotion }) {
  useFrame((state) => {
    if (reducedMotion) return;
    const targetX = state.pointer.x * 0.4;
    const targetY = 0.35 + state.pointer.y * 0.25;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
}

export default function Hero3DScene() {
  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="holo-scene-container" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0.35, 6.2], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Futuristic Sci-Fi Lighting Setup */}
        <ambientLight intensity={0.9} color="#0a193b" />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#e0f2fe" />
        
        {/* Hologram Projector Uplight (Intense Cyan from Platform) */}
        <pointLight position={[0, -1.8, 0.2]} intensity={3.8} distance={5.5} color="#00F0FF" />
        
        {/* Electric Blue Backlight for Rim Highlight */}
        <pointLight position={[0, 1.8, -2.8]} intensity={2.5} distance={7} color="#2563EB" />
        
        {/* Left/Right Cyber Fill Lights */}
        <pointLight position={[-3, 0.5, 2]} intensity={1.2} distance={6} color="#38BDF8" />
        <pointLight position={[3, -0.5, 1]} intensity={0.9} distance={5} color="#0284c7" />

        {/* 1. Perspective Grid Floor with Glowing Intersections */}
        <PerspectiveGridFloor reducedMotion={reducedMotion} />

        {/* 2. Circular Holographic Platform with Rotating Light Rings & Light Beam */}
        <HolographicPlatform reducedMotion={reducedMotion} />

        {/* 3. Central 3D Developer Avatar (Sunil S.) */}
        <HolographicAvatar reducedMotion={reducedMotion} />

        {/* 4. Small Floating Cyan Hologram Particles */}
        <HologramParticles count={160} reducedMotion={reducedMotion} />

        {/* 5. Smooth Mouse Parallax */}
        <SceneCameraRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
