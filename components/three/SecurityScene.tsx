"use client";

import { useGLTF } from "@react-three/drei";
import SceneShell from "./SceneShell";

function SecurityModel() {
  const { scene } = useGLTF("/models/security_camera2.glb");

  return (
    <primitive
      object={scene}
      scale={7}
      position={[0, -1, -1]}
    />
  );
}

export default function SecurityScene() {
  return (
    <SceneShell
      cameraPosition={[4.5, 1.6, 5.2]}
      minDistance={3.2}
      maxDistance={8.5}
    >
      <SecurityModel />
    </SceneShell>
  );
}

useGLTF.preload("/models/security_camera2.glb");