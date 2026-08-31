"use client";
import SceneShell from "./SceneShell";
import { useGLTF } from "@react-three/drei";

function LogisticsModel() {
  const { scene } = useGLTF("/models/logistics.glb", true); // true = use Draco decoder

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, -1, 0]}
    />
  );
}

export default function LogisticsScene() {
  return (
    <SceneShell cameraPosition={[4.2, 1.8, 5]} minDistance={8.2} maxDistance={10.5}>
      <LogisticsModel />
    </SceneShell>
  );
}

useGLTF.preload("/models/logistics.glb");