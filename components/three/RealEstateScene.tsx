"use client";

import { useGLTF } from "@react-three/drei";
import SceneShell from "./SceneShell";

function RealEstateModel() {
  const { scene } = useGLTF("/models/appartement.glb", true); // true = use Draco decoder

  return (
    <primitive
      object={scene}
      scale={1}
      position={[3, -1, 0]}
    />
  );
}

export default function RealEstateScene() {
  return (
    <SceneShell
      cameraPosition={[5, 0, 10]}
      minDistance={10.2}
      maxDistance={15.5}
    >
      <RealEstateModel />
    </SceneShell>
  );
}

useGLTF.preload("/models/appartement.glb");
