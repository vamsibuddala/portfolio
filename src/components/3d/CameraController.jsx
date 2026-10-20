import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({
  scrollProgress = 0,
  isHoveringProject = false,
  isDesktop = true,
  isCloseup = false
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0.4, 4.2));
  const lookTarget = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame((state) => {
    // Mouse parallax offset
    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.2;

    const desktopOffsetX = isDesktop ? 0.38 : 0;
    const avatarCenterX = isDesktop ? 1.05 : 0;

    let targetX = desktopOffsetX + mouseX;
    let targetY = 0.36 + mouseY;
    let targetZ = 4.0;
    let lookX = desktopOffsetX;
    let lookY = 0.22;

    if (scrollProgress < 0.2) {
      if (isCloseup) {
        // Dramatic close-up on avatar head & chest
        targetX = avatarCenterX + mouseX * 0.15;
        targetY = 0.52 + mouseY * 0.1;
        targetZ = 2.4;
        lookX = avatarCenterX;
        lookY = 0.5;
      } else {
        // Hero section framing
        targetX = desktopOffsetX + mouseX;
        targetY = 0.36 + mouseY;
        targetZ = isHoveringProject ? 3.6 : (isDesktop ? 4.0 : 4.6);
        lookX = desktopOffsetX;
        lookY = 0.22;
      }
    } else if (scrollProgress < 0.45) {
      // About section: Elevated angled perspective
      targetX = 1.2 + mouseX * 0.4;
      targetY = 0.75 + mouseY * 0.4;
      targetZ = 4.2;
      lookX = 0;
      lookY = 0.2;
    } else if (scrollProgress < 0.7) {
      // Skills & Experience: Left isometric view
      targetX = -1.3 + mouseX * 0.4;
      targetY = 0.5 + mouseY * 0.4;
      targetZ = 3.9;
      lookX = 0.2;
      lookY = 0.2;
    } else {
      // Projects & Contact: Wide cinematic framing
      targetX = mouseX * 0.5;
      targetY = 0.25 + mouseY * 0.4;
      targetZ = 4.5;
      lookX = 0;
      lookY = 0.15;
    }

    // Smooth lerping
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.06);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.06);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.06);

    camera.position.copy(currentPos.current);

    lookTarget.current.x = THREE.MathUtils.lerp(lookTarget.current.x, lookX, 0.06);
    lookTarget.current.y = THREE.MathUtils.lerp(lookTarget.current.y, lookY, 0.06);
    lookTarget.current.z = THREE.MathUtils.lerp(lookTarget.current.z, 0, 0.06);

    camera.lookAt(lookTarget.current);
  });

  return null;
}
