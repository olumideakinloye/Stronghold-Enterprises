"use client";
import SceneShell from "./SceneShell";
import LogisticsVan from "./LogisticsVan";

export default function LogisticsScene() {
  return (
    <SceneShell cameraPosition={[4.2, 1.8, 5]} minDistance={3.2} maxDistance={8.5}>
      <LogisticsVan />
    </SceneShell>
  );
}
