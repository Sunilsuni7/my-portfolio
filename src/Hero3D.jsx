import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, useTexture, Text, Ring, Circle } from '@react-three/drei';
import * as THREE from 'three';
import profilePic from './assets/profile.jpg';

function ProfileMesh({ reducedMotion }) {
  const texture = useTexture(profilePic);
  const meshRef = useRef();
  
  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing/floating effect
    meshRef.current.position.y = Math.sin(t * 1.5) * 0.05;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={meshRef}>
      {/* Photo inside a circle */}
      <Circle args={[1.8, 64]}>
        <meshBasicMaterial map={texture} />
      </Circle>
      {/* Inner premium ring */}
      <Ring args={[1.85, 1.88, 64]} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="#8e72ff" transparent opacity={0.6} />
      </Ring>
      {/* Outer spinning dashed ring effect (using a torus with dashed material or basic) */}
      <Ring args={[2.1, 2.12, 64]} position={[0, 0, 0.02]}>
        <meshBasicMaterial color="#555566" transparent opacity={0.3} />
      </Ring>
    </group>
  );
}

function OrbitingRings({ reducedMotion }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (reducedMotion) return;
    groupRef.current.rotation.z -= 0.002;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    groupRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Dashed outer ring for a tech feel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#8e72ff" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.008, 16, 100]} />
        <meshBasicMaterial color="#a1a1aa" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function TechElement({ text, position, rotation, floatSpeed = 1, reducedMotion }) {
  return (
    <Float 
      speed={reducedMotion ? 0 : floatSpeed} 
      rotationIntensity={reducedMotion ? 0 : 0.5} 
      floatIntensity={reducedMotion ? 0 : 1} 
      position={position}
    >
      <group rotation={rotation}>
        <mesh>
          <planeGeometry args={[1.4, 0.4]} />
          <meshBasicMaterial color="#16161e" transparent opacity={0.8} depthWrite={false} />
        </mesh>
        {/* Subtle border */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.44, 0.44]} />
          <meshBasicMaterial color="#8e72ff" transparent opacity={0.3} depthWrite={false} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.2}
          color="#f8f8f8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

function TechCluster({ reducedMotion }) {
  return (
    <group>
      <TechElement text="Python" position={[-2.5, 1.5, 0]} rotation={[0, 0.2, -0.1]} floatSpeed={1.5} reducedMotion={reducedMotion} />
      <TechElement text="React" position={[2.8, 1.2, 0.5]} rotation={[0, -0.2, 0.1]} floatSpeed={1.2} reducedMotion={reducedMotion} />
      <TechElement text="JavaScript" position={[-3, -0.5, 0.2]} rotation={[0, 0.3, 0.05]} floatSpeed={1.8} reducedMotion={reducedMotion} />
      <TechElement text="FastAPI" position={[2.5, -1, -0.2]} rotation={[0, -0.3, -0.05]} floatSpeed={1.4} reducedMotion={reducedMotion} />
      <TechElement text="Git" position={[-1.5, -2, 0.8]} rotation={[0.1, 0.1, -0.1]} floatSpeed={2} reducedMotion={reducedMotion} />
      <TechElement text="AI" position={[1.8, -2.2, 0.5]} rotation={[-0.1, -0.2, 0.1]} floatSpeed={1.6} reducedMotion={reducedMotion} />
    </group>
  );
}

function SceneMouseParallax({ reducedMotion }) {
  useFrame((state) => {
    if (reducedMotion) return;
    const targetX = (state.pointer.x * 0.5);
    const targetY = (state.pointer.y * 0.5);
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3DScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]} // Performance optimization
      gl={{ antialias: false, powerPreference: "high-performance" }} // Better performance
    >
      <ambientLight intensity={0.5} />
      <ProfileMesh reducedMotion={reducedMotion} />
      <OrbitingRings reducedMotion={reducedMotion} />
      <TechCluster reducedMotion={reducedMotion} />
      <Stars 
        radius={10} 
        depth={50} 
        count={reducedMotion ? 100 : 500} 
        factor={4} 
        saturation={0} 
        fade 
        speed={reducedMotion ? 0 : 0.5} 
      />
      <SceneMouseParallax reducedMotion={reducedMotion} />
    </Canvas>
  );
}
