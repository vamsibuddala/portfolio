import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function WorkspaceEnvironment() {
  const techEmblemsRef = useRef();
  const screenRef = useRef();
  const hudRing1Ref = useRef();
  const hudRing2Ref = useRef();
  const consoleLaserRef = useRef();
  const floatingCrystalRef = useRef();

  // Premium High-Tech Materials
  const titaniumConsoleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0f1d',
    roughness: 0.25,
    metalness: 0.9,
  }), []);

  const glassDisplayMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#00f2fe',
    emissive: '#00f2fe',
    emissiveIntensity: 0.45,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.85,
    transparent: true,
    opacity: 0.9,
    ior: 1.45,
  }), []);

  const pedestalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#040711',
    roughness: 0.3,
    metalness: 0.85,
  }), []);

  const neonCyanMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f2fe',
    emissive: '#00f2fe',
    emissiveIntensity: 0.9,
    roughness: 0.1,
  }), []);

  const neonVioletMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#a855f7',
    emissive: '#a855f7',
    emissiveIntensity: 0.8,
    roughness: 0.1,
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Orbiting tech artifacts
    if (techEmblemsRef.current) {
      techEmblemsRef.current.rotation.y = t * 0.18;
    }

    // Concentric HUD calibration rings
    if (hudRing1Ref.current) {
      hudRing1Ref.current.rotation.z = -t * 0.12;
    }
    if (hudRing2Ref.current) {
      hudRing2Ref.current.rotation.z = t * 0.08;
    }

    // Curved display holographic flicker / pulse
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 2.5) * 0.12;
    }

    // Floating quantum crystal
    if (floatingCrystalRef.current) {
      floatingCrystalRef.current.rotation.x = t * 0.6;
      floatingCrystalRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group position={[0, -0.9, 0]}>
      {/* --- Architectural Mirrored Pedestal --- */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[2.0, 1.85, 0.28, 48]} />
        <primitive object={pedestalMat} />
      </mesh>

      {/* Laser Concentric Calibration HUD Ring 1 */}
      <mesh ref={hudRing1Ref} position={[0, -0.038, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.88, 1.95, 64]} />
        <primitive object={neonCyanMat} />
      </mesh>

      {/* Laser Concentric Calibration HUD Ring 2 (Dashed degree markings) */}
      <mesh ref={hudRing2Ref} position={[0, -0.036, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.54, 48]} />
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#a855f7" 
          emissiveIntensity={0.6} 
          wireframe 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Radial Grid Lines on Pedestal Floor */}
      <mesh position={[0, -0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} wireframe transparent opacity={0.6} />
      </mesh>

      {/* --- Minimalist Cantilevered Titanium Console --- */}
      <group position={[0, 0, 0.52]}>
        {/* Sleek Aerodynamic Console Slab */}
        <mesh position={[0, 0.52, 0]} material={titaniumConsoleMat}>
          <boxGeometry args={[1.5, 0.03, 0.55]} />
        </mesh>

        {/* Laser Trim Light Guide on Console Edge */}
        <mesh position={[0, 0.52, 0.276]} material={neonCyanMat}>
          <boxGeometry args={[1.48, 0.012, 0.008]} />
        </mesh>
        <mesh position={[0, 0.52, -0.276]} material={neonVioletMat}>
          <boxGeometry args={[1.48, 0.012, 0.008]} />
        </mesh>

        {/* Precision Cantilever Central Pillar */}
        <mesh position={[0, 0.25, -0.15]} material={titaniumConsoleMat}>
          <boxGeometry args={[0.2, 0.5, 0.15]} />
        </mesh>

        {/* --- Floating Frameless Curved Holographic Workstation Display --- */}
        <group position={[0, 0.56, -0.08]} rotation={[-0.18, 0, 0]}>
          {/* Curved Glass OLED Panel */}
          <mesh ref={screenRef} material={glassDisplayMat}>
            <boxGeometry args={[0.95, 0.42, 0.015]} />
          </mesh>

          {/* Animated Holographic Code & Data Stream Matrix on Screen */}
          <group position={[0, 0, 0.012]}>
            {/* Top Header Bar */}
            <mesh position={[-0.28, 0.16, 0]}>
              <planeGeometry args={[0.28, 0.025]} />
              <meshBasicMaterial color="#00f2fe" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0.28, 0.16, 0]}>
              <planeGeometry args={[0.15, 0.02]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
            </mesh>

            {/* Holographic Wireframe Graph Matrix */}
            <mesh position={[-0.2, -0.04, 0]}>
              <planeGeometry args={[0.42, 0.22]} />
              <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
            </mesh>

            {/* Code Line Blocks */}
            {[-0.08, -0.02, 0.04, 0.1].map((y, i) => (
              <mesh key={i} position={[0.2, y - 0.04, 0]}>
                <planeGeometry args={[0.35, 0.018]} />
                <meshBasicMaterial color={i % 2 === 0 ? "#00f2fe" : "#c084fc"} transparent opacity={0.7} />
              </mesh>
            ))}
          </group>
        </group>

        {/* --- Floating Quantum Data Core (Center-Right Console) --- */}
        <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
          <group position={[0.48, 0.68, 0.1]}>
            <mesh ref={floatingCrystalRef}>
              <octahedronGeometry args={[0.07, 0]} />
              <meshStandardMaterial 
                color="#00f2fe" 
                emissive="#00f2fe" 
                emissiveIntensity={0.8} 
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            {/* Orbiting Gyro Ring */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.11, 0.008, 12, 24]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
            </mesh>
          </group>
        </Float>
      </group>

      {/* --- Orbiting Luxury Tech Holographic Artifacts --- */}
      <group ref={techEmblemsRef} position={[0, 0.95, 0]}>
        
        {/* 1. React Quantum Polyhedron (Double Torus with Crystalline Core) */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <group position={[1.45, 0.35, 0]}>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.18, 0.015, 16, 32]} />
              <primitive object={neonCyanMat} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.18, 0.015, 16, 32]} />
              <primitive object={neonCyanMat} />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[0.06, 0]} />
              <primitive object={neonCyanMat} />
            </mesh>
          </group>
        </Float>

        {/* 2. Three.js / WebGL Faceted Specimen (Iridescent Wireframe) */}
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
          <group position={[-1.4, 0.5, 0.5]}>
            <mesh>
              <icosahedronGeometry args={[0.14, 0]} />
              <meshStandardMaterial 
                color="#ec4899" 
                emissive="#ec4899" 
                emissiveIntensity={0.7} 
                wireframe 
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
            </mesh>
          </group>
        </Float>

        {/* 3. Distributed Cloud / Systems Octahedron */}
        <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
          <group position={[0, 1.25, -1.35]}>
            <mesh>
              <octahedronGeometry args={[0.13, 0]} />
              <primitive object={neonVioletMat} />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <octahedronGeometry args={[0.16, 0]} />
              <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.6} />
            </mesh>
          </group>
        </Float>

        {/* 4. High-Performance Architecture Dodecahedron */}
        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.4}>
          <group position={[-1.2, -0.05, -0.95]}>
            <mesh>
              <dodecahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial 
                color="#38bdf8" 
                emissive="#38bdf8" 
                emissiveIntensity={0.7} 
                wireframe 
              />
            </mesh>
          </group>
        </Float>

      </group>
    </group>
  );
}
