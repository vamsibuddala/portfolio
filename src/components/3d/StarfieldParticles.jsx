import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarfieldParticles({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f2fe');
    const violet = new THREE.Color('#a855f7');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Spread in a spherical shell around the workspace
      const r = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random color mix between cyan, violet, and bright star white
      const rand = Math.random();
      const chosenColor = rand > 0.6 ? cyan : (rand > 0.3 ? violet : white);
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
