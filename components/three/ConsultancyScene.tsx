"use client";
import SceneShell from "./SceneShell";
import ConsultancyOrbit from "./ConsultancyOrbit";

export default function ConsultancyScene() {
  return (
    <SceneShell cameraPosition={[3.5, 1.8, 4.5]} minDistance={2.8} maxDistance={8}>
      <ConsultancyOrbit />
    </SceneShell>
  );
}
