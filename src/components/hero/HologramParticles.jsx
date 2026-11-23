import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HologramParticles({ count = 180, reducedMotion }) {
  const pointsRef = useRef();

  // Create initial particle coordinates and velocities
  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution around avatar and platform
      const radius = 0.5 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -1.9 + Math.random() * 4.8; // Y range from platform to above head
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.8;

      spd[i] = 0.006 + Math.random() * 0.012;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, spd, phs];
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Drift upward
      arr[idx + 1] += speeds[i];

      // Subtle horizontal float
      arr[idx] += Math.sin(t * 1.2 + phases[i]) * 0.003;
      arr[idx + 2] += Math.cos(t * 1.2 + phases[i]) * 0.003;

      // Wrap around top threshold back to near platform
      if (arr[idx + 1] > 3.2) {
        arr[idx + 1] = -1.85;
      }
    }
    posAttr.needsUpdate = true;
  });

  // Particle circle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(0, 240, 255, 1)');
    grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.8)');
    grad.addColorStop(0.7, 'rgba(37, 99, 235, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        map={particleTexture}
        transparent={true}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
