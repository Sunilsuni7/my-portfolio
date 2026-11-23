import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ultra-refined Holographic GLSL Shader with Fresnel, Fine Scanlines & Shimmer
const hologramVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const hologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform float uScanFreq;
  uniform float uScanSpeed;
  uniform float uOpacity;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Smooth Fresnel Edge Rim Glow
    float NdotV = dot(normal, viewDir);
    float fresnel = pow(1.0 - abs(NdotV), 2.2);
    
    // Fine Horizontal Scanlines
    float scanline = sin((vWorldPosition.y + uTime * uScanSpeed) * uScanFreq);
    scanline = smoothstep(-0.2, 0.8, scanline);
    
    // Traveling highlight holographic beam
    float scanWave = sin(vWorldPosition.y * 1.6 - uTime * 2.4);
    scanWave = pow(clamp(scanWave, 0.0, 1.0), 6.0) * 0.7;
    
    // Subtle digital micro-shimmer
    float shimmer = fract(sin(dot(vWorldPosition.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.04;
    
    // Color composition
    vec3 col = mix(uBaseColor, uRimColor, fresnel * 0.75 + scanline * 0.3 + scanWave);
    col += uRimColor * (fresnel * 1.4 + scanWave * 0.85 + shimmer);
    
    float alpha = clamp(uOpacity * (0.38 + fresnel * 0.62 + scanline * 0.2 + scanWave * 0.25), 0.0, 0.98);
    
    gl_FragColor = vec4(col, alpha);
  }
`;

// Natural Face & Skin Shading with Holographic Projector Rim
const naturalFaceShader = `
  uniform float uTime;
  uniform vec3 uSkinColor;
  uniform vec3 uRimColor;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.8);
    float scanline = sin((vWorldPosition.y + uTime * 1.5) * 26.0) * 0.5 + 0.5;
    
    vec3 col = uSkinColor;
    // Ambient cyan rim highlight from platform projectors
    col += uRimColor * (fresnel * 0.75 + scanline * 0.08);
    
    gl_FragColor = vec4(col, 0.96);
  }
`;

export default function HolographicAvatar({ reducedMotion }) {
  const rootGroupRef = useRef();
  const torsoRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const dataOrbRef = useRef();

  // Holographic body shader uniforms
  const holoUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color('#0284c7') },
      uRimColor: { value: new THREE.Color('#00F0FF') },
      uScanFreq: { value: 24.0 },
      uScanSpeed: { value: 1.5 },
      uOpacity: { value: 0.82 }
    }),
    []
  );

  // Natural skin uniforms
  const faceUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSkinColor: { value: new THREE.Color('#caa078') },
      uRimColor: { value: new THREE.Color('#00F0FF') }
    }),
    []
  );

  // Natural dark stylized hair uniforms
  const hairUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSkinColor: { value: new THREE.Color('#161320') },
      uRimColor: { value: new THREE.Color('#38BDF8') }
    }),
    []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // Update uniform times
    holoUniforms.uTime.value = t;
    faceUniforms.uTime.value = t;
    hairUniforms.uTime.value = t;

    // Gentle floating levitation above platform
    if (rootGroupRef.current) {
      rootGroupRef.current.position.y = Math.sin(t * 1.5) * 0.04;
      rootGroupRef.current.rotation.y = Math.sin(t * 0.6) * 0.03;
    }

    // Breathing motion on torso
    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 2.2) * 0.012;
      torsoRef.current.scale.x = 1 + Math.sin(t * 2.2) * 0.008;
    }

    // Smooth head look-around with mouse tracking
    if (headRef.current) {
      const targetRotY = Math.sin(t * 0.7) * 0.03 + pointer.x * 0.18;
      const targetRotX = pointer.y * -0.12;
      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * 0.05;
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * 0.05;
    }

    // Subtle arm sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.12 + Math.sin(t * 1.4) * 0.02;
      leftArmRef.current.rotation.x = Math.sin(t * 1.1) * 0.02;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -0.32 + Math.sin(t * 1.6) * 0.025;
      rightArmRef.current.rotation.z = -0.16 + Math.cos(t * 1.3) * 0.02;
    }

    // Spinning 3D holographic data octahedron
    if (dataOrbRef.current) {
      dataOrbRef.current.rotation.y = t * 1.4;
      dataOrbRef.current.rotation.x = t * 0.9;
      dataOrbRef.current.position.y = 0.34 + Math.sin(t * 2.4) * 0.025;
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, -0.02, 0]}>
      {/* ========================================================
          1. HEAD & FACE (NATURAL STYLIZED FACE AND HAIR)
          ======================================================== */}
      <group ref={headRef} position={[0, 1.0, 0]}>
        {/* Stylized Head Oval */}
        <mesh position={[0, 0.02, 0]} scale={[0.31, 0.36, 0.32]}>
          <sphereGeometry args={[1, 32, 32]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={naturalFaceShader}
            uniforms={faceUniforms}
            transparent={true}
          />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.31, 0.02, -0.02]} scale={[0.06, 0.1, 0.07]}>
          <sphereGeometry args={[1, 16, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={naturalFaceShader}
            uniforms={faceUniforms}
            transparent={true}
          />
        </mesh>
        <mesh position={[0.31, 0.02, -0.02]} scale={[0.06, 0.1, 0.07]}>
          <sphereGeometry args={[1, 16, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={naturalFaceShader}
            uniforms={faceUniforms}
            transparent={true}
          />
        </mesh>

        {/* Stylized Facial Features */}
        <group position={[0, 0.04, 0.28]}>
          {/* Left Eye */}
          <group position={[-0.105, 0, 0]}>
            <mesh scale={[0.048, 0.058, 0.02]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.014]} scale={[0.03, 0.032, 0.01]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#1e1b4b" />
            </mesh>
            <mesh position={[0.01, 0.012, 0.022]} scale={[0.01, 0.01, 0.005]}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.105, 0, 0]}>
            <mesh scale={[0.048, 0.058, 0.02]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.014]} scale={[0.03, 0.032, 0.01]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#1e1b4b" />
            </mesh>
            <mesh position={[0.01, 0.012, 0.022]} scale={[0.01, 0.01, 0.005]}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>

          {/* Eyebrows */}
          <mesh position={[-0.105, 0.075, 0.01]} rotation={[0, 0, -0.06]}>
            <boxGeometry args={[0.08, 0.016, 0.01]} />
            <meshBasicMaterial color="#15121e" />
          </mesh>
          <mesh position={[0.105, 0.075, 0.01]} rotation={[0, 0, 0.06]}>
            <boxGeometry args={[0.08, 0.016, 0.01]} />
            <meshBasicMaterial color="#15121e" />
          </mesh>

          {/* Gentle Smile */}
          <mesh position={[0, -0.11, 0.02]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.055, 0.01, 8, 16, Math.PI * 0.8]} />
            <meshBasicMaterial color="#881337" />
          </mesh>

          {/* Sleek Soft-Rectangle Developer Cyber Glasses */}
          <group position={[0, 0.005, 0.03]}>
            {/* Left Frame */}
            <mesh position={[-0.11, 0, 0]}>
              <torusGeometry args={[0.068, 0.009, 12, 24]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
            {/* Right Frame */}
            <mesh position={[0.11, 0, 0]}>
              <torusGeometry args={[0.068, 0.009, 12, 24]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
            {/* Bridge */}
            <mesh position={[0, 0.015, 0]}>
              <boxGeometry args={[0.07, 0.009, 0.01]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
            {/* Temples */}
            <mesh position={[-0.18, 0.01, -0.14]} rotation={[0, 0.22, 0]}>
              <boxGeometry args={[0.009, 0.009, 0.28]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
            <mesh position={[0.18, 0.01, -0.14]} rotation={[0, -0.22, 0]}>
              <boxGeometry args={[0.009, 0.009, 0.28]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>
        </group>

        {/* ========================================================
            MODERN DEVELOPER TEXTURED HAIR (Dark Natural Volume)
            ======================================================== */}
        <group position={[0, 0.16, -0.01]}>
          {/* Main Top Crown */}
          <mesh scale={[0.33, 0.24, 0.34]}>
            <sphereGeometry args={[1, 24, 24]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={naturalFaceShader}
              uniforms={hairUniforms}
            />
          </mesh>
          {/* Front styled fringe / quiff */}
          <mesh position={[0, 0.14, 0.14]} rotation={[0.42, 0, 0]} scale={[0.26, 0.12, 0.16]}>
            <boxGeometry args={[1, 1, 1]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={naturalFaceShader}
              uniforms={hairUniforms}
            />
          </mesh>
          {/* Side fades */}
          <mesh position={[-0.16, 0.06, 0.06]} rotation={[0, 0, 0.25]} scale={[0.11, 0.13, 0.22]}>
            <boxGeometry args={[1, 1, 1]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={naturalFaceShader}
              uniforms={hairUniforms}
            />
          </mesh>
          <mesh position={[0.16, 0.06, 0.06]} rotation={[0, 0, -0.25]} scale={[0.11, 0.13, 0.22]}>
            <boxGeometry args={[1, 1, 1]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={naturalFaceShader}
              uniforms={hairUniforms}
            />
          </mesh>
          {/* Back nape */}
          <mesh position={[0, -0.06, -0.16]} scale={[0.28, 0.18, 0.12]}>
            <boxGeometry args={[1, 1, 1]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={naturalFaceShader}
              uniforms={hairUniforms}
            />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.18, 20]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={naturalFaceShader}
            uniforms={faceUniforms}
            transparent={true}
          />
        </mesh>
      </group>

      {/* ========================================================
          2. TORSO & CLOTHING (BLUE HOLOGRAPHIC BODY WITH SCANLINES)
          ======================================================== */}
      <group ref={torsoRef} position={[0, 0.4, 0]}>
        {/* Hoodie Cowl Collar */}
        <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[0.24, 0.075, 16, 32]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>

        {/* Main Hoodie Torso */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.39, 0.34, 0.7, 24]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>

        {/* Glowing Center Cyber Zipper Line */}
        <mesh position={[0, -0.04, 0.34]}>
          <planeGeometry args={[0.016, 0.62]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Hoodie Kangaroo Pocket */}
        <mesh position={[0, -0.16, 0.18]} scale={[0.34, 0.2, 0.09]}>
          <boxGeometry args={[1, 1, 1]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>

        {/* Chest Cyber Decal */}
        <mesh position={[0.14, 0.12, 0.28]}>
          <planeGeometry args={[0.08, 0.04]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
        </mesh>

        {/* Waistband */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.34, 0.35, 0.09, 24]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
      </group>

      {/* ========================================================
          3. LEFT ARM (NATURAL RELAXED IDLE)
          ======================================================== */}
      <group ref={leftArmRef} position={[-0.43, 0.58, 0]}>
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.13, 16, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[-0.07, -0.2, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.1, 0.09, 0.36, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Elbow */}
        <mesh position={[-0.12, -0.38, 0]}>
          <sphereGeometry args={[0.085, 12, 12]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.13, -0.58, 0.03]} rotation={[0.18, 0, 0.05]}>
          <cylinderGeometry args={[0.085, 0.075, 0.34, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Wrist Cuff */}
        <mesh position={[-0.14, -0.74, 0.05]}>
          <torusGeometry args={[0.075, 0.012, 8, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        {/* Left Hand */}
        <mesh position={[-0.14, -0.84, 0.06]} scale={[0.075, 0.11, 0.055]}>
          <sphereGeometry args={[1, 16, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={naturalFaceShader}
            uniforms={faceUniforms}
            transparent={true}
          />
        </mesh>
      </group>

      {/* ========================================================
          4. RIGHT ARM (INTERACTIVE DEVELOPER GESTURE)
          ======================================================== */}
      <group ref={rightArmRef} position={[0.43, 0.58, 0]}>
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.13, 16, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Upper Arm angled forward */}
        <mesh position={[0.07, -0.16, 0.08]} rotation={[-0.38, 0, -0.14]}>
          <cylinderGeometry args={[0.1, 0.09, 0.34, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Elbow */}
        <mesh position={[0.11, -0.3, 0.2]}>
          <sphereGeometry args={[0.085, 12, 12]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Forearm reaching forward and up */}
        <mesh position={[0.11, -0.36, 0.4]} rotation={[-1.05, 0, 0.08]}>
          <cylinderGeometry args={[0.085, 0.075, 0.32, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>
        {/* Wrist Cuff */}
        <mesh position={[0.11, -0.4, 0.54]} rotation={[-1.05, 0, 0]}>
          <torusGeometry args={[0.075, 0.012, 8, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        {/* Right Hand palm facing upward */}
        <mesh position={[0.11, -0.42, 0.62]} scale={[0.075, 0.055, 0.1]} rotation={[-0.25, 0, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={naturalFaceShader}
            uniforms={faceUniforms}
            transparent={true}
          />
        </mesh>

        {/* Floating Holographic 3D Data Octahedron Crystal */}
        <group ref={dataOrbRef} position={[0.11, -0.16, 0.62]}>
          <mesh>
            <octahedronGeometry args={[0.13, 0]} />
            <meshBasicMaterial color="#00F0FF" wireframe={true} />
          </mesh>
          <mesh scale={[0.65, 0.65, 0.65]}>
            <octahedronGeometry args={[0.13, 0]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} />
          </mesh>
          {/* Subtle cyan glow point light */}
          <pointLight color="#00F0FF" intensity={1.2} distance={1.4} />
        </group>
      </group>

      {/* ========================================================
          5. LEGS & SLIM JOGGERS
          ======================================================== */}
      <group position={[0, -0.16, 0]}>
        {/* Pelvis / Hips */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.34, 0.31, 0.2, 20]} />
          <shaderMaterial
            vertexShader={hologramVertexShader}
            fragmentShader={hologramFragmentShader}
            uniforms={holoUniforms}
            transparent={true}
          />
        </mesh>

        {/* Left Leg */}
        <group position={[-0.17, -0.18, 0]}>
          {/* Thigh */}
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.135, 0.11, 0.5, 16]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={hologramFragmentShader}
              uniforms={holoUniforms}
              transparent={true}
            />
          </mesh>
          {/* Knee */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={hologramFragmentShader}
              uniforms={holoUniforms}
              transparent={true}
            />
          </mesh>
          {/* Calf / Lower Leg */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.105, 0.085, 0.52, 16]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={hologramFragmentShader}
              uniforms={holoUniforms}
              transparent={true}
            />
          </mesh>
          {/* Pant Cuff */}
          <mesh position={[0, -1.08, 0]}>
            <torusGeometry args={[0.085, 0.015, 8, 16]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.7} />
          </mesh>

          {/* Left Futuristic Tech Sneaker */}
          <group position={[0, -1.22, 0.07]}>
            <mesh position={[0, 0.05, -0.03]} scale={[0.125, 0.1, 0.3]}>
              <boxGeometry args={[1, 1, 1]} />
              <shaderMaterial
                vertexShader={hologramVertexShader}
                fragmentShader={hologramFragmentShader}
                uniforms={holoUniforms}
                transparent={true}
              />
            </mesh>
            {/* Cyan Glowing Sole */}
            <mesh position={[0, -0.018, -0.03]} scale={[0.135, 0.032, 0.32]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>
        </group>

        {/* Right Leg */}
        <group position={[0.17, -0.18, 0]}>
          {/* Thigh */}
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.135, 0.11, 0.5, 16]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={hologramFragmentShader}
              uniforms={holoUniforms}
              transparent={true}
            />
          </mesh>
          {/* Knee */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={hologramFragmentShader}
              uniforms={holoUniforms}
              transparent={true}
            />
          </mesh>
          {/* Calf / Lower Leg */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.105, 0.085, 0.52, 16]} />
            <shaderMaterial
              vertexShader={hologramVertexShader}
              fragmentShader={hologramFragmentShader}
              uniforms={holoUniforms}
              transparent={true}
            />
          </mesh>
          {/* Pant Cuff */}
          <mesh position={[0, -1.08, 0]}>
            <torusGeometry args={[0.085, 0.015, 8, 16]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.7} />
          </mesh>

          {/* Right Futuristic Tech Sneaker */}
          <group position={[0, -1.22, 0.07]}>
            <mesh position={[0, 0.05, -0.03]} scale={[0.125, 0.1, 0.3]}>
              <boxGeometry args={[1, 1, 1]} />
              <shaderMaterial
                vertexShader={hologramVertexShader}
                fragmentShader={hologramFragmentShader}
                uniforms={holoUniforms}
                transparent={true}
              />
            </mesh>
            {/* Cyan Glowing Sole */}
            <mesh position={[0, -0.018, -0.03]} scale={[0.135, 0.032, 0.32]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
