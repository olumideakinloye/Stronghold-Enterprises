"use client";

import { useGLTF } from "@react-three/drei";
import SceneShell from "./SceneShell";

function AutomobileModel() {
  const { scene } = useGLTF("/models/automobile.glb", true); // true = use Draco decoder

  return (
    <primitive
      object={scene}
      scale={100}
      position={[0, -1, 0]}
    />
  );
}

export default function AutomobilesScene() {
  return (
    <SceneShell
      cameraPosition={[4.5, 1.6, 5.2]}
      minDistance={3.2}
      maxDistance={8.5}
    >
      <AutomobileModel />
    </SceneShell>
  );
}

useGLTF.preload("/models/automobile.glb");