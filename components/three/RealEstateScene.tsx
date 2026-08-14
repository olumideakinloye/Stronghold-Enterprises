"use client";
import SceneShell from "./SceneShell";
import PropertyBuilding from "./PropertyBuilding";

export default function RealEstateScene() {
  return (
    <SceneShell cameraPosition={[4.5, 2, 5.5]} minDistance={3.5} maxDistance={9}>
      <PropertyBuilding />
    </SceneShell>
  );
}
