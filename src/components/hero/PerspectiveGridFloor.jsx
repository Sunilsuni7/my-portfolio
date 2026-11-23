import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const gridVertexShader = `
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const gridFragmentShader = `
  uniform float uTime;
  uniform vec3 uGridColor;
  uniform vec3 uDotColor;
  uniform vec3 uBgColor;
  
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  
  void main() {
    // Coordinate space for grid
    vec2 coord = vWorldPosition.xz * 1.2;
    
    // Grid lines calculation
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = min(grid.x, grid.y);
    float lineIntensity = 1.0 - min(line, 1.0);
    
    // Glowing dots at grid intersections
    vec2 cellCoord = fract(coord) - 0.5;
    float distToCenter = length(cellCoord);
    float dotGlow = smoothstep(0.14, 0.0, distToCenter);
    
    // Distance falloff from center / horizon fade
    float distFromOrigin = length(vWorldPosition.xz * vec2(0.35, 0.18));
    float fade = smoothstep(18.0, 1.5, distFromOrigin);
    
    // Radial fade near the pedestal so it doesn't clash
    float pedestalCutout = smoothstep(1.5, 3.2, length(vWorldPosition.xz));
    
    // Color composition
    vec3 col = uBgColor;
    col = mix(col, uGridColor, lineIntensity * 0.75 * fade);
    col += uDotColor * (dotGlow * 1.5 * fade);
    
    // Horizon glow band
    float horizonGlow = smoothstep(-22.0, -8.0, vWorldPosition.z) * smoothstep(2.0, -12.0, vWorldPosition.z) * 0.12;
    col += uGridColor * horizonGlow;
    
    float alpha = clamp((lineIntensity * 0.7 + dotGlow * 0.9) * fade * pedestalCutout + horizonGlow * 0.5, 0.0, 0.95);
    
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function PerspectiveGridFloor({ reducedMotion }) {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridColor: { value: new THREE.Color('#00F0FF') },
      uDotColor: { value: new THREE.Color('#38BDF8') },
      uBgColor: { value: new THREE.Color('#040817') }
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current && !reducedMotion) {
      uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group position={[0, -1.95, -5]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 45, 64, 64]} />
        <shaderMaterial
          vertexShader={gridVertexShader}
          fragmentShader={gridFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
