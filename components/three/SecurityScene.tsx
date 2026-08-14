"use client";
import SceneShell from "./SceneShell";
import SecurityCamera from "./SecurityCamera";

export default function SecurityScene() {
  return (
    <SceneShell cameraPosition={[3.2, 1.4, 4.2]} minDistance={2.5} maxDistance={7}>
      <SecurityCamera />
    </SceneShell>
  );
}
