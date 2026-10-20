import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function QuantumSkillNode({ position, name, level, color = '#00f2fe', onHover, onUnhover }) {
  const meshRef = useRef();
  const wireRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.6;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.3;
      wireRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group 
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover && onHover(name, level);
        }}
        onPointerOut={() => {
          setHovered(false);
          onUnhover && onUnhover();
        }}
      >
        {/* Core Luminous Crystal */}
        <mesh ref={meshRef} scale={hovered ? [1.35, 1.35, 1.35] : [1, 1, 1]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.15} 
            metalness={0.85} 
            emissive={color} 
            emissiveIntensity={hovered ? 1.5 : 0.8} 
          />
        </mesh>

        {/* Outer Geometric Wireframe Cage */}
        <mesh ref={wireRef} scale={hovered ? [1.5, 1.5, 1.5] : [1.2, 1.2, 1.2]}>
          <icosahedronGeometry args={[0.36, 0]} />
          <meshBasicMaterial 
            color={hovered ? "#ffffff" : color} 
            wireframe 
            transparent 
            opacity={hovered ? 0.95 : 0.5} 
          />
        </mesh>

        {/* Orbiting Laser Gyro Ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.44, 0.01, 12, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>

        {/* Technical HUD Label without external remote font to prevent suspense hangs */}
        <Text
          position={[0, -0.46, 0]}
          fontSize={0.11}
          color={hovered ? "#00f2fe" : "#f1f5f9"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#05070e"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

// Synaptic Laser Constellation Lines Connecting Nodes
function ConstellationLines({ orbPositions }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < orbPositions.length; i++) {
      const p1 = orbPositions[i];
      const p2 = orbPositions[(i + 1) % orbPositions.length];
      
      points.push(new THREE.Vector3(p1.x, p1.y, p1.z));
      points.push(new THREE.Vector3(p2.x, p2.y, p2.z));

      // Connect to central core
      points.push(new THREE.Vector3(p1.x, p1.y, p1.z));
      points.push(new THREE.Vector3(0, 0, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [orbPositions]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#00f2fe" transparent opacity={0.3} />
    </lineSegments>
  );
}

function GalaxyScene({ skills = [], onHover, onUnhover }) {
  const groupRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.y = -t * 0.4;
    }
  });

  const orbPositions = useMemo(() => {
    return skills.map((skill, index) => {
      const radius = 2.4;
      const angle = (index / skills.length) * Math.PI * 2;
      const yOffset = Math.sin(index * 1.6) * 0.7;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return { ...skill, x, y: yOffset, z };
    });
  }, [skills]);

  return (
    <group ref={groupRef}>
      {/* Central Singularity Reactor */}
      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[0.44, 0]} />
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#a855f7" 
            emissiveIntensity={1.2} 
            wireframe 
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial 
            color="#00f2fe" 
            emissive="#00f2fe" 
            emissiveIntensity={1.4} 
          />
        </mesh>
      </group>

      {/* Constellation Laser Network */}
      <ConstellationLines orbPositions={orbPositions} />

      {/* Quantum Skill Nodes */}
      {orbPositions.map((item, idx) => (
        <QuantumSkillNode
          key={item.name}
          position={[item.x, item.y, item.z]}
          name={item.name}
          level={item.level}
          color={idx % 2 === 0 ? "#00f2fe" : "#ec4899"}
          onHover={onHover}
          onUnhover={onUnhover}
        />
      ))}
    </group>
  );
}

export default function SkillGalaxyCanvas({ skills = [], onHoverSkill }) {
  return (
    <div className="w-full h-[380px] sm:h-[460px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 48 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[6, 6, 6]} intensity={2.0} color="#00f2fe" />
        <pointLight position={[-6, -6, -6]} intensity={1.8} color="#a855f7" />
        <Suspense fallback={null}>
          <GalaxyScene 
            skills={skills} 
            onHover={(name, level) => onHoverSkill && onHoverSkill({ name, level })}
            onUnhover={() => onHoverSkill && onHoverSkill(null)}
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            rotateSpeed={0.6}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-3 right-3 pointer-events-none text-[10px] font-mono text-cyan-400/70 bg-black/40 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur">
        Drag to rotate 3D galaxy
      </div>
    </div>
  );
}
