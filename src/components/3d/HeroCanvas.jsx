import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import AvatarModel from './AvatarModel';
import WorkspaceEnvironment from './WorkspaceEnvironment';
import StarfieldParticles from './StarfieldParticles';
import CameraController from './CameraController';

export default function HeroCanvas({
  scrollProgress = 0,
  isSpeaking = false,
  audioAmplitudeRef = null,
  isHoveringProject = false,
  waveTrigger = 0,
  isCloseup = false,
}) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On desktop, offset avatar to right so hero text and avatar have dedicated, balanced stages
  const sceneOffsetX = isDesktop ? 1.05 : 0;

  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 45 }}
        dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
        className="w-full h-full"
      >
        {/* Ambient base illumination */}
        <ambientLight intensity={1.1} color="#334155" />

        {/* 1. Main Studio Key Spotlight (Front-Right) illuminating face & torso */}
        <spotLight
          position={[sceneOffsetX + 2.2, 3.2, 3.8]}
          intensity={2.8}
          color="#f8fafc"
          angle={0.65}
          penumbra={0.7}
        />

        {/* 2. Front Soft Fill Light ensuring no black silhouettes */}
        <pointLight
          position={[sceneOffsetX, 1.1, 2.6]}
          intensity={1.6}
          color="#bae6fd"
          distance={6}
        />

        {/* 3. Cyan Electric Rim Light (Back-Left) */}
        <directionalLight
          position={[sceneOffsetX - 3.2, 2.8, -1.8]}
          intensity={3.2}
          color="#00f2fe"
        />

        {/* 4. Magenta / Violet Kicker Light (Back-Right) */}
        <directionalLight
          position={[sceneOffsetX + 3.2, 2.2, -1.8]}
          intensity={2.4}
          color="#d946ef"
        />

        {/* 5. Underglow Pedestal Light */}
        <pointLight
          position={[sceneOffsetX, -0.8, 0.5]}
          intensity={1.2}
          color="#00f2fe"
          distance={3.5}
        />

        <Suspense fallback={null}>
          <CameraController
            scrollProgress={scrollProgress}
            isHoveringProject={isHoveringProject}
            isDesktop={isDesktop}
            isCloseup={isCloseup}
          />
          <StarfieldParticles count={260} />

          {/* Group containing Workspace and Avatar, positioned on right for desktop */}
          <group position={[sceneOffsetX, 0, 0]}>
            <WorkspaceEnvironment />
            <AvatarModel
              isSpeaking={isSpeaking}
              audioAmplitudeRef={audioAmplitudeRef}
              isHoveringProject={isHoveringProject}
              waveTrigger={waveTrigger}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
