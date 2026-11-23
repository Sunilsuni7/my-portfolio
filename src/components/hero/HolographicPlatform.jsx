import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const beamVertexShader = `
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    // Height fade from bottom (1.0) to top (0.0)
    float heightFade = smoothstep(1.0, 0.05, vUv.y);
    heightFade = pow(heightFade, 1.8);
    
    // Rotating vertical beam columns
    float angle = atan(vPosition.x, vPosition.z);
    float beams = sin(angle * 6.0 + uTime * 0.8) * 0.5 + 0.5;
    beams = pow(beams, 3.0);
    
    // Scan wave moving up the cylinder
    float scan = sin(vUv.y * 12.0 - uTime * 3.0) * 0.5 + 0.5;
    
    float alpha = (0.06 + beams * 0.12 + scan * 0.04) * heightFade;
    
    vec3 col = uColor + vec3(0.1, 0.2, 0.3) * beams;
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.5));
  }
`;

export default function HolographicPlatform({ reducedMotion }) {
  const innerRingRef = useRef();
  const middleRingRef = useRef();
  const outerRingRef = useRef();
  const beamRef = useRef();

  const beamUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00F0FF') }
    }),
    []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.4;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z = -t * 0.25;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.15;
    }
    if (beamRef.current) {
      beamUniforms.uTime.value = t;
    }
  });

  // 8 Emitter pods positions
  const emitterPositions = useMemo(() => {
    const list = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.25;
      list.push([Math.cos(angle) * r, 0.02, Math.sin(angle) * r]);
    }
    return list;
  }, []);

  return (
    <group position={[0, -1.9, 0]}>
      {/* Upper Pedestal Disc (Dark Obsidian Glass) */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[2.3, 2.35, 0.08, 64]} />
        <meshStandardMaterial
          color="#06122c"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Center glowing platform core */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.0, 64]} />
        <meshBasicMaterial
          color="#071b40"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Main Pedestal Glowing Cyan Rim */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.22, 2.26, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Lower Beveled Base */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[2.38, 2.5, 0.12, 64]} />
        <meshStandardMaterial
          color="#040b1c"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Animated Inner Ring (Clockwise) */}
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={innerRingRef}>
          <mesh>
            <ringGeometry args={[1.5, 1.54, 48]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Tic marks on inner ring */}
          {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.52, Math.sin(angle) * 1.52, 0.005]}
              rotation={[0, 0, angle]}
            >
              <planeGeometry args={[0.08, 0.03]} />
              <meshBasicMaterial color="#38BDF8" side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Animated Middle Ring (Counter-Clockwise) */}
      <group position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={middleRingRef}>
          <mesh>
            <ringGeometry args={[1.85, 1.88, 64]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>

      {/* Animated Outer Orbiting Ring */}
      <group position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={outerRingRef}>
          <mesh>
            <ringGeometry args={[2.6, 2.63, 64]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[2.72, 2.74, 48]} />
            <meshBasicMaterial
              color="#2563EB"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>

      {/* Emitter Nodes / Projector Pods */}
      {emitterPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.045, 0.04, 16]} />
            <meshStandardMaterial color="#0b1b3b" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.025, 0]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshBasicMaterial color="#00F0FF" />
          </mesh>
        </group>
      ))}

      {/* Vertical Hologram Projector Light Column / Cylinder */}
      <mesh ref={beamRef} position={[0, 2.2, 0]}>
        <cylinderGeometry args={[2.0, 2.25, 4.5, 48, 1, true]} />
        <shaderMaterial
          vertexShader={beamVertexShader}
          fragmentShader={beamFragmentShader}
          uniforms={beamUniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
