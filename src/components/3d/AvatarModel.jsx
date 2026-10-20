import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * HIGH-END STUDIO 3D CYBERNETIC AVATAR
 * Sleek, futuristic tech architect silhouette with live audio-driven visor waveform,
 * real-time cursor tracking, chest arc-reactor, and welcoming wave kinematics.
 */
function ProfessionalCyberAvatar({
  isSpeaking = false,
  audioAmplitudeRef = null,
  isHoveringProject = false,
  waveTrigger = 0
}) {
  const groupRef = useRef();
  const spineRef = useRef();
  const headRef = useRef();
  const rightArmRef = useRef();
  const rightForearmRef = useRef();
  const leftArmRef = useRef();
  const visorRef = useRef();
  const reactorCoreRef = useRef();
  const reactorRing1Ref = useRef();
  const reactorRing2Ref = useRef();
  const haloRef = useRef();
  const waveTimerRef = useRef(3.5); // Immediate welcoming wave on load
  const eqBarsRef = useRef([]);

  // Trigger welcoming wave on prop changes
  useEffect(() => {
    waveTimerRef.current = 3.2;
  }, [waveTrigger]);

  // Premium Materials with bright specular gloss and vivid neon accents
  const suitClothMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a2234',
    roughness: 0.32,
    metalness: 0.7,
  }), []);

  const titaniumArmorMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#334155',
    roughness: 0.18,
    metalness: 0.92,
  }), []);

  const chromeSilverMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f8fafc',
    roughness: 0.1,
    metalness: 0.98,
  }), []);

  const carbonFiberMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.28,
    metalness: 0.8,
  }), []);

  const neonCyanMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f2fe',
    emissive: '#00f2fe',
    emissiveIntensity: 1.6,
    roughness: 0.08,
  }), []);

  const neonVioletMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c084fc',
    emissive: '#a855f7',
    emissiveIntensity: 1.4,
    roughness: 0.08,
  }), []);

  const visorGlassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#00f2fe',
    emissive: '#00f2fe',
    emissiveIntensity: 0.7,
    transmission: 0.65,
    opacity: 0.95,
    transparent: true,
    roughness: 0.05,
    metalness: 0.25,
    ior: 1.5,
  }), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const amp = audioAmplitudeRef?.current || 0;

    // 1. Natural spine breathing & posture
    if (spineRef.current) {
      spineRef.current.position.y = 0.9 + Math.sin(t * 1.6) * 0.016;
      spineRef.current.rotation.x = Math.sin(t * 1.6) * 0.01;
      spineRef.current.rotation.y = THREE.MathUtils.lerp(
        spineRef.current.rotation.y,
        state.pointer.x * 0.18,
        0.05
      );
    }

    // 2. Head & Neck tracking cursor with smooth damping & speech nods
    if (headRef.current) {
      const targetRotY = state.pointer.x * 0.52;
      const targetRotX = -state.pointer.y * 0.3;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);

      // Conversational subtle head nod when speaking
      if (isSpeaking) {
        headRef.current.rotation.x += Math.sin(t * 8) * 0.022;
        headRef.current.rotation.z = Math.sin(t * 4) * 0.012;
      } else {
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.05);
      }
    }

    // 3. Audio-driven Visor & Equalizer Bars inside Visor
    if (visorRef.current) {
      const targetEmissive = isSpeaking ? (0.8 + amp * 1.4) : 0.45;
      visorRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        visorRef.current.material.emissiveIntensity,
        targetEmissive,
        0.18
      );
    }

    // Equalizer bars
    eqBarsRef.current.forEach((bar, index) => {
      if (bar) {
        if (isSpeaking) {
          const wave = Math.abs(Math.sin(t * 12 + index * 1.1) * 0.7 + amp * 0.85);
          bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, Math.max(0.2, wave * 1.6), 0.25);
        } else {
          bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, 0.2, 0.1);
        }
      }
    });

    // 4. Chest Arc-Reactor Quantum Core
    if (reactorCoreRef.current) {
      const scale = isSpeaking ? 1.0 + amp * 0.45 : 1.0 + Math.sin(t * 3) * 0.08;
      reactorCoreRef.current.scale.set(scale, scale, scale);
    }
    if (reactorRing1Ref.current) {
      reactorRing1Ref.current.rotation.z = t * 1.4;
    }
    if (reactorRing2Ref.current) {
      reactorRing2Ref.current.rotation.z = -t * 1.1;
    }

    // 5. Floating Halo Reticle above head
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.35;
      haloRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.12;
    }

    // 6. Arm Kinematics (Wave greeting vs Idle developer posture)
    if (waveTimerRef.current > 0) {
      waveTimerRef.current -= delta;
      if (rightArmRef.current) {
        // Raise arm in friendly welcoming wave
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 1.85, 0.14);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0.35 + Math.sin(t * 9) * 0.24, 0.14);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0.3, 0.1);

        if (rightForearmRef.current) {
          rightForearmRef.current.rotation.z = 0.55 + Math.sin(t * 10) * 0.35;
        }
      }
    } else {
      if (rightArmRef.current) {
        // Natural resting posture over console
        const targetZ = isHoveringProject ? 0.38 : 0.22;
        const targetX = 0.26 + Math.sin(t * 1.5) * 0.02;
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetZ, 0.08);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetX, 0.08);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0, 0.08);

        if (rightForearmRef.current) {
          rightForearmRef.current.rotation.z = THREE.MathUtils.lerp(rightForearmRef.current.rotation.z, 0.32, 0.08);
        }
      }
    }

    // Left arm natural poise
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -0.22;
      leftArmRef.current.rotation.x = 0.26 + Math.cos(t * 1.5) * 0.02;
    }

    // Project card focus reaction: smooth lean
    if (groupRef.current) {
      const targetZ = isHoveringProject ? 0.32 : 0;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      {/* Floating Holographic Cyber Halo Ring */}
      <group ref={haloRef} position={[0, 1.86, 0]}>
        <mesh>
          <torusGeometry args={[0.68, 0.012, 16, 64]} />
          <primitive object={neonCyanMat} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[0.55, 0.575, 4]} />
          <primitive object={neonVioletMat} />
        </mesh>
      </group>

      {/* --- Spine & Upper Torso --- */}
      <group ref={spineRef} position={[0, 0.9, 0]}>

        {/* Athletic Cyber Exoskeleton Jacket */}
        <mesh position={[0, 0.32, 0]} material={suitClothMat}>
          <cylinderGeometry args={[0.35, 0.26, 0.68, 16]} />
        </mesh>

        {/* Polished Titanium Chest Armor Plate */}
        <mesh position={[0, 0.42, 0.14]} material={titaniumArmorMat}>
          <boxGeometry args={[0.33, 0.27, 0.09]} />
        </mesh>

        {/* Front Cyber Lapels with Neon Cyan Light Guides */}
        <mesh position={[-0.14, 0.32, 0.186]} material={neonCyanMat}>
          <boxGeometry args={[0.018, 0.48, 0.01]} />
        </mesh>
        <mesh position={[0.14, 0.32, 0.186]} material={neonCyanMat}>
          <boxGeometry args={[0.018, 0.48, 0.01]} />
        </mesh>

        {/* Chrome Collar Trim */}
        <mesh position={[0, 0.62, 0.08]} material={chromeSilverMat}>
          <torusGeometry args={[0.15, 0.02, 8, 24]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>

        {/* --- Central Quantum Arc-Reactor Core --- */}
        <group position={[0, 0.42, 0.19]}>
          {/* Outer Rotating Ring */}
          <mesh ref={reactorRing1Ref}>
            <ringGeometry args={[0.065, 0.082, 24]} />
            <primitive object={neonCyanMat} />
          </mesh>
          {/* Inner Rotating Ring */}
          <mesh ref={reactorRing2Ref}>
            <ringGeometry args={[0.045, 0.058, 16]} />
            <primitive object={neonVioletMat} />
          </mesh>
          {/* Glowing Arc Core */}
          <mesh ref={reactorCoreRef} position={[0, 0, 0.005]}>
            <circleGeometry args={[0.04, 24]} />
            <meshStandardMaterial
              color="#00f2fe"
              emissive="#00f2fe"
              emissiveIntensity={isSpeaking ? 2.2 : 1.4}
            />
          </mesh>
          {/* Local Arc Light casting radiance on chest & chin */}
          <pointLight
            color="#00f2fe"
            intensity={isSpeaking ? 2.0 : 1.2}
            distance={1.8}
            decay={2}
          />
        </group>

        {/* Cyber Neon Power Conduits on Shoulders */}
        <mesh position={[-0.26, 0.58, 0]} material={neonCyanMat}>
          <boxGeometry args={[0.18, 0.02, 0.16]} />
        </mesh>
        <mesh position={[0.26, 0.58, 0]} material={neonCyanMat}>
          <boxGeometry args={[0.18, 0.02, 0.16]} />
        </mesh>

        {/* Back Spine Luminescent Circuit Track */}
        <mesh position={[0, 0.32, -0.14]} material={neonVioletMat}>
          <boxGeometry args={[0.035, 0.58, 0.02]} />
        </mesh>

        {/* --- Neck & Sculpted Cyber Head --- */}
        <group ref={headRef} position={[0, 0.82, 0]}>
          {/* Neck with Carbon Fiber weave and glowing throat choke ring */}
          <mesh position={[0, -0.06, 0]} material={carbonFiberMat}>
            <cylinderGeometry args={[0.11, 0.13, 0.16, 16]} />
          </mesh>
          <mesh position={[0, -0.06, 0.075]} material={neonCyanMat}>
            <boxGeometry args={[0.14, 0.015, 0.02]} />
          </mesh>

          {/* Sculpted Cybernetic Head */}
          <mesh position={[0, 0.1, 0]} material={titaniumArmorMat}>
            <sphereGeometry args={[0.22, 20, 20]} />
          </mesh>

          {/* Faceted Titanium Jawline & Cheekbones */}
          <mesh position={[0, 0.04, 0.075]} material={chromeSilverMat}>
            <boxGeometry args={[0.26, 0.18, 0.24]} />
          </mesh>

          {/* Aerodynamic Cyber Hairstyle / Crest with Chrome Finish */}
          <mesh position={[0, 0.24, -0.02]} material={chromeSilverMat}>
            <boxGeometry args={[0.22, 0.12, 0.28]} />
          </mesh>
          <mesh position={[0, 0.28, 0.02]} material={neonCyanMat}>
            <boxGeometry args={[0.045, 0.03, 0.26]} />
          </mesh>

          {/* High-Tech Neural Audio Comms Headset (Ears) */}
          <mesh position={[0.22, 0.1, 0]} material={chromeSilverMat}>
            <cylinderGeometry args={[0.065, 0.065, 0.04, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0.245, 0.1, 0]} material={neonCyanMat}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[-0.22, 0.1, 0]} material={chromeSilverMat}>
            <cylinderGeometry args={[0.065, 0.065, 0.04, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[-0.245, 0.1, 0]} material={neonVioletMat}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>

          {/* Comms Antenna with glowing tip */}
          <mesh position={[0.22, 0.2, 0.04]} material={titaniumArmorMat}>
            <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
          </mesh>
          <mesh position={[0.22, 0.27, 0.04]} material={neonCyanMat}>
            <sphereGeometry args={[0.015, 8, 8]} />
          </mesh>

          {/* Frameless Holographic Cyber Visor */}
          <mesh ref={visorRef} position={[0, 0.12, 0.16]} material={visorGlassMat}>
            <boxGeometry args={[0.34, 0.095, 0.12]} />
          </mesh>

          {/* Visor Frame Accent Line */}
          <mesh position={[0, 0.17, 0.218]} material={neonCyanMat}>
            <boxGeometry args={[0.33, 0.01, 0.01]} />
          </mesh>

          {/* --- Live Animated Audio Equalizer Bars Inside Visor --- */}
          <group position={[0, 0.12, 0.225]}>
            {[-0.10, -0.065, -0.03, 0, 0.03, 0.065, 0.10].map((posX, i) => (
              <mesh
                key={i}
                ref={el => { eqBarsRef.current[i] = el; }}
                position={[posX, 0, 0]}
              >
                <boxGeometry args={[0.018, 0.055, 0.005]} />
                <meshStandardMaterial
                  color={i === 3 ? '#ffffff' : (i % 2 === 0 ? '#00f2fe' : '#c084fc')}
                  emissive={i === 3 ? '#ffffff' : (i % 2 === 0 ? '#00f2fe' : '#a855f7')}
                  emissiveIntensity={1.8}
                />
              </mesh>
            ))}
          </group>
        </group>

        {/* --- Right Arm & Hand (Animated Waving / Gesture) --- */}
        <group ref={rightArmRef} position={[0.4, 0.56, 0]}>
          {/* Shoulder Pauldron with glowing insignia */}
          <mesh position={[0, 0, 0]} material={chromeSilverMat}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          <mesh position={[0.05, 0.04, 0]} material={neonCyanMat}>
            <boxGeometry args={[0.06, 0.015, 0.12]} />
          </mesh>

          {/* Upper Arm */}
          <mesh position={[0.04, -0.22, 0]} material={suitClothMat}>
            <cylinderGeometry args={[0.075, 0.065, 0.38, 12]} />
          </mesh>

          {/* Elbow Joint with Neon Conduit */}
          <mesh position={[0.05, -0.42, 0]} material={neonCyanMat}>
            <sphereGeometry args={[0.05, 12, 12]} />
          </mesh>

          {/* Forearm & Articulated Hand */}
          <group ref={rightForearmRef} position={[0.05, -0.44, 0]}>
            <mesh position={[0.02, -0.19, 0]} material={titaniumArmorMat}>
              <cylinderGeometry args={[0.065, 0.055, 0.36, 12]} />
            </mesh>
            {/* Wrist band */}
            <mesh position={[0.02, -0.36, 0]} material={neonCyanMat}>
              <cylinderGeometry args={[0.058, 0.058, 0.03, 16]} />
            </mesh>
            {/* Sculpted Hand Palm */}
            <mesh position={[0.025, -0.42, 0]} material={chromeSilverMat}>
              <boxGeometry args={[0.08, 0.1, 0.035]} />
            </mesh>
            {/* Cyber Fingers */}
            {[-0.025, -0.008, 0.008, 0.025].map((fx, fi) => (
              <mesh key={fi} position={[0.025 + fx, -0.49, 0]} material={carbonFiberMat}>
                <boxGeometry args={[0.014, 0.06, 0.02]} />
              </mesh>
            ))}
          </group>
        </group>

        {/* --- Left Arm & Hand --- */}
        <group ref={leftArmRef} position={[-0.4, 0.56, 0]}>
          {/* Shoulder Pauldron */}
          <mesh position={[0, 0, 0]} material={chromeSilverMat}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          <mesh position={[-0.05, 0.04, 0]} material={neonVioletMat}>
            <boxGeometry args={[0.06, 0.015, 0.12]} />
          </mesh>

          {/* Upper Arm */}
          <mesh position={[-0.04, -0.22, 0]} material={suitClothMat}>
            <cylinderGeometry args={[0.075, 0.065, 0.38, 12]} />
          </mesh>

          {/* Elbow Joint */}
          <mesh position={[-0.05, -0.42, 0]} material={neonVioletMat}>
            <sphereGeometry args={[0.05, 12, 12]} />
          </mesh>

          {/* Forearm & Hand */}
          <mesh position={[-0.07, -0.63, 0]} material={titaniumArmorMat}>
            <cylinderGeometry args={[0.065, 0.055, 0.36, 12]} />
          </mesh>
          <mesh position={[-0.07, -0.81, 0]} material={neonVioletMat}>
            <cylinderGeometry args={[0.058, 0.058, 0.03, 16]} />
          </mesh>
          <mesh position={[-0.08, -0.88, 0]} material={chromeSilverMat}>
            <boxGeometry args={[0.08, 0.1, 0.035]} />
          </mesh>
        </group>

      </group>

      {/* --- Lower Body & Modern Tailored Tech Trousers --- */}
      <group position={[0, 0.5, 0]}>
        {/* Belt & Utility Cyber Buckle */}
        <mesh position={[0, 0.36, 0]} material={carbonFiberMat}>
          <cylinderGeometry args={[0.26, 0.25, 0.09, 16]} />
        </mesh>
        <mesh position={[0, 0.36, 0.245]} material={chromeSilverMat}>
          <boxGeometry args={[0.1, 0.06, 0.03]} />
        </mesh>
        <mesh position={[0, 0.36, 0.262]} material={neonCyanMat}>
          <boxGeometry args={[0.05, 0.02, 0.01]} />
        </mesh>

        {/* Left Leg */}
        <mesh position={[-0.15, -0.24, 0]} material={suitClothMat}>
          <cylinderGeometry args={[0.095, 0.075, 0.85, 12]} />
        </mesh>
        {/* Right Leg */}
        <mesh position={[0.15, -0.24, 0]} material={suitClothMat}>
          <cylinderGeometry args={[0.095, 0.075, 0.85, 12]} />
        </mesh>

        {/* Polished Titanium Cyber Boots */}
        <mesh position={[-0.15, -0.72, 0.04]} material={titaniumArmorMat}>
          <boxGeometry args={[0.13, 0.14, 0.28]} />
        </mesh>
        <mesh position={[0.15, -0.72, 0.04]} material={titaniumArmorMat}>
          <boxGeometry args={[0.13, 0.14, 0.28]} />
        </mesh>

        {/* Glowing Sole Trim */}
        <mesh position={[-0.15, -0.79, 0.04]} material={neonCyanMat}>
          <boxGeometry args={[0.135, 0.015, 0.285]} />
        </mesh>
        <mesh position={[0.15, -0.79, 0.04]} material={neonCyanMat}>
          <boxGeometry args={[0.135, 0.015, 0.285]} />
        </mesh>
      </group>

    </group>
  );
}

// Custom GLB Loader fallback
function CustomGlbAvatar({ glbPath, isSpeaking, audioAmplitudeRef }) {
  const { scene } = useGLTF(glbPath);
  const avatarRef = useRef();

  const morphTargets = useMemo(() => {
    const list = [];
    scene.traverse((child) => {
      if (child.isMesh && child.morphTargetInfluences) {
        list.push(child);
      }
    });
    return list;
  }, [scene]);

  useFrame((state) => {
    const amp = audioAmplitudeRef?.current || 0;
    if (morphTargets.length > 0) {
      morphTargets.forEach((mesh) => {
        const dict = mesh.morphTargetDictionary || {};
        const openIdx = dict['jawOpen'] ?? dict['viseme_aa'] ?? dict['mouthOpen'];
        if (openIdx !== undefined) {
          mesh.morphTargetInfluences[openIdx] = isSpeaking ? amp : 0;
        }
      });
    }

    if (avatarRef.current) {
      avatarRef.current.rotation.y = THREE.MathUtils.lerp(
        avatarRef.current.rotation.y,
        state.pointer.x * 0.45,
        0.08
      );
    }
  });

  return (
    <primitive
      ref={avatarRef}
      object={scene}
      position={[0, -0.9, 0]}
      scale={[1.1, 1.1, 1.1]}
    />
  );
}

export default function AvatarModel({
  isSpeaking = false,
  audioAmplitudeRef = null,
  isHoveringProject = false,
  waveTrigger = 0
}) {
  const [hasGlbFile, setHasGlbFile] = useState(false);

  useEffect(() => {
    fetch('/avatar.glb', { method: 'HEAD' })
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('model')) {
          setHasGlbFile(true);
        }
      })
      .catch(() => {
        setHasGlbFile(false);
      });
  }, []);

  return (
    <group>
      {hasGlbFile ? (
        <React.Suspense fallback={
          <ProfessionalCyberAvatar
            isSpeaking={isSpeaking}
            audioAmplitudeRef={audioAmplitudeRef}
            isHoveringProject={isHoveringProject}
            waveTrigger={waveTrigger}
          />
        }>
          <CustomGlbAvatar
            glbPath="/avatar.glb"
            isSpeaking={isSpeaking}
            audioAmplitudeRef={audioAmplitudeRef}
          />
        </React.Suspense>
      ) : (
        <ProfessionalCyberAvatar
          isSpeaking={isSpeaking}
          audioAmplitudeRef={audioAmplitudeRef}
          isHoveringProject={isHoveringProject}
          waveTrigger={waveTrigger}
        />
      )}
    </group>
  );
}
