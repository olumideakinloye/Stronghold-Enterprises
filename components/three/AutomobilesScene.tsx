"use client";
import SceneShell from "./SceneShell";
import SportsCar from "./SportsCar";

export default function AutomobilesScene() {
  return (
    <SceneShell cameraPosition={[4.5, 1.6, 5.2]} minDistance={3.2} maxDistance={8.5}>
      <SportsCar />
    </SceneShell>
  );
}
